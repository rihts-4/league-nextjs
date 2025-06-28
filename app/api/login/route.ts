import { NextRequest, NextResponse } from 'next/server';
import { LoginCredentials } from '@/types';
import { authenticateUser } from '@/utils/auth';
import { createSuccessResponse, createErrorResponse, createMethodNotAllowedResponse } from '@/utils/response';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const body: LoginCredentials = await request.json();
    
    // Use authentication utility
    const result = await authenticateUser(body);

    if (result.success) {
      // Successful login
      return createSuccessResponse(
        {
          user: result.user,
          session: result.session
        },
        'Login successful'
      );
    } else {
      // Authentication failed
      const statusCode = result.error?.includes('required') ? 400 : 401;
      
      return createErrorResponse(
        result.error || 'Authentication failed',
        statusCode,
        result.details
      );
    }

  } catch (error) {
    // Handle JSON parsing errors or other exceptions
    console.error('Login error:', error);
    
    return createErrorResponse(
      'Invalid request format. Please provide valid JSON.',
      400
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return createMethodNotAllowedResponse(['POST']);
}