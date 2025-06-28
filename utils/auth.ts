// Import Supabase client for authentication operations
import { supabase } from '@/lib/supabase';
// Import TypeScript interfaces for type safety
import { LoginCredentials, User, AuthSession } from '@/types';

/**
 * Result interface for authentication operations
 * Uses optional properties (?) to handle different success/error states
 */
export interface AuthResult {
  success: boolean;        // Indicates if the operation was successful
  user?: User;            // User data (only present on success)
  session?: AuthSession;  // Session data with tokens (only present on success)
  error?: string;         // Human-readable error message (only present on failure)
  details?: string;       // Additional error details for debugging (optional)
}

/**
 * Credentials interface for user registration
 * Email is required, username is optional (can use email as username)
 */
export interface SignupCredentials {
  email: string;
  password: string;
  username?: string;      // Optional: if not provided, email will be used as username
}

/**
 * Result interface for signup operations
 * Similar to AuthResult but includes needsConfirmation for email verification flow
 */
export interface SignupResult {
  success: boolean;
  user?: User;
  error?: string;
  details?: string;
  needsConfirmation?: boolean;  // True if user needs to confirm email before login
}

/**
 * Authenticate user with email and password using Supabase
 * This function handles the login process and returns standardized results
 * 
 * @param credentials - Object containing email and password
 * @returns Promise<AuthResult> - Standardized result with user data or error info
 */
export async function authenticateUser(credentials: { email: string; password: string }): Promise<AuthResult> {
  try {
    // Input validation: Check if required fields are provided
    // Early return prevents unnecessary API calls with invalid data
    if (!credentials.email || !credentials.password) {
      return {
        success: false,
        error: 'Email and password are required'
      };
    }

    // Call Supabase Auth API to sign in with email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    // Handle Supabase authentication errors
    if (error) {
      console.error('Supabase auth error:', error);
      
      // Provide user-friendly error messages for common scenarios
      if (error.message.includes('Invalid login credentials')) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }
      
      // Generic fallback for other authentication errors
      return {
        success: false,
        error: 'Authentication failed',
        details: error.message  // Include technical details for debugging
      };
    }

    // Success case: Transform Supabase data into our app's format
    if (data.user && data.session) {
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.email || '', // Using email as username for consistency
        },
        session: {
          access_token: data.session.access_token,    // JWT token for API requests
          refresh_token: data.session.refresh_token,  // Token to refresh expired access tokens
          expires_at: data.session.expires_at,        // Token expiration timestamp
        }
      };
    } else {
      // Edge case: Supabase didn't return expected data structure
      return {
        success: false,
        error: 'Authentication failed - no user data returned'
      };
    }

  } catch (error) {
    // Handle unexpected errors (network issues, etc.)
    console.error('Authentication error:', error);
    return {
      success: false,
      error: 'Authentication service error'
    };
  }
}

/**
 * Sign out user from Supabase
 * Clears the user's session and invalidates their tokens
 * 
 * @param accessToken - Optional: Current user's access token for verification
 * @returns Promise with success status and optional error message
 */
export async function signOutUser(accessToken?: string): Promise<{ success: boolean; error?: string }> {
  try {
    // If we have an access token, set it in the Supabase client
    // This ensures we're signing out the correct user session
    if (accessToken) {
      // Set the session token for this request
      // Note: We only need access_token for logout, refresh_token can be empty
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: '', // We don't need refresh token for logout
      });
    }

    // Call Supabase to sign out the user
    // This invalidates the session and clears tokens
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Supabase logout error:', error);
      return {
        success: false,
        error: 'Logout failed'
      };
    }

    return {
      success: true
    };

  } catch (error) {
    // Handle unexpected errors during logout
    console.error('Logout error:', error);
    return {
      success: false,
      error: 'Logout service error'
    };
  }
}

/**
 * Validate JWT token and get user info
 * This function verifies if a token is still valid and extracts user data
 * Useful for protecting routes and maintaining user sessions
 * 
 * @param token - JWT access token to validate
 * @returns Promise with validation result and user data if valid
 */
export async function validateToken(token: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Call Supabase to get user info using the provided token
    // This validates the token and returns user data if valid
    const { data, error } = await supabase.auth.getUser(token);

    // Check if token validation failed or no user was returned
    if (error || !data.user) {
      return {
        success: false,
        error: 'Invalid or expired token'
      };
    }

    // Token is valid - return user information
    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || '',
        // Try to get username from user metadata, fallback to email
        username: data.user.user_metadata?.username || data.user.email || '',
      }
    };

  } catch (error) {
    // Handle unexpected errors during token validation
    console.error('Token validation error:', error);
    return {
      success: false,
      error: 'Token validation failed'
    };
  }
}
