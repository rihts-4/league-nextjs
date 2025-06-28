import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: string;
}

/**
 * Create a successful API response
 */
export function createSuccessResponse<T>(
  data?: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      ...(message && { message }),
      ...(data && { data })
    },
    { status }
  );
}

/**
 * Create an error API response
 */
export function createErrorResponse(
  error: string,
  status: number = 400,
  details?: string
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(details && { details })
    },
    { status }
  );
}

/**
 * Create a validation error response
 */
export function createValidationErrorResponse(
  message: string = 'Validation failed'
): NextResponse<ApiResponse> {
  return createErrorResponse(message, 400);
}

/**
 * Create an unauthorized error response
 */
export function createUnauthorizedResponse(
  message: string = 'Unauthorized'
): NextResponse<ApiResponse> {
  return createErrorResponse(message, 401);
}

/**
 * Create a not found error response
 */
export function createNotFoundResponse(
  message: string = 'Resource not found'
): NextResponse<ApiResponse> {
  return createErrorResponse(message, 404);
}

/**
 * Create a method not allowed response
 */
export function createMethodNotAllowedResponse(
  allowedMethods: string[] = ['POST']
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: `Method not allowed. Allowed methods: ${allowedMethods.join(', ')}`
    },
    { 
      status: 405,
      headers: {
        'Allow': allowedMethods.join(', ')
      }
    }
  );
}

/**
 * Create an internal server error response
 */
export function createServerErrorResponse(
  message: string = 'Internal server error'
): NextResponse<ApiResponse> {
  return createErrorResponse(message, 500);
}
