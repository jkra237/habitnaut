// Safe error messages for user display
// Maps internal errors to user-friendly messages without exposing system details

export type ErrorCategory = 'auth' | 'sync' | 'data' | 'network' | 'unknown';

interface SafeError {
  message: string;
  category: ErrorCategory;
}

// Map known error patterns to safe messages
const errorPatterns: Array<{ pattern: RegExp; message: string; category: ErrorCategory }> = [
  // Auth errors
  { pattern: /invalid.*password/i, message: 'Invalid email or password. Please try again.', category: 'auth' },
  { pattern: /user.*not.*found/i, message: 'Invalid email or password. Please try again.', category: 'auth' },
  { pattern: /email.*already.*registered/i, message: 'This email is already registered. Please sign in instead.', category: 'auth' },
  { pattern: /invalid.*email/i, message: 'Please enter a valid email address.', category: 'auth' },
  { pattern: /password.*weak/i, message: 'Password is too weak. Please choose a stronger password.', category: 'auth' },
  { pattern: /email.*not.*confirmed/i, message: 'Please confirm your email address before signing in.', category: 'auth' },
  { pattern: /rate.*limit/i, message: 'Too many attempts. Please wait a moment and try again.', category: 'auth' },
  
  // Network errors
  { pattern: /network/i, message: 'Unable to connect. Please check your internet connection.', category: 'network' },
  { pattern: /timeout/i, message: 'Request timed out. Please try again.', category: 'network' },
  { pattern: /fetch/i, message: 'Unable to connect. Please check your internet connection.', category: 'network' },
  
  // Data/sync errors
  { pattern: /duplicate.*key/i, message: 'This item already exists.', category: 'data' },
  { pattern: /row.*level.*security/i, message: 'Unable to save. Please try again.', category: 'sync' },
  { pattern: /permission/i, message: 'Unable to save. Please try again.', category: 'sync' },
];

/**
 * Convert an error to a safe, user-friendly message
 * Never exposes internal system details
 */
export function toSafeError(error: unknown): SafeError {
  const errorMessage = error instanceof Error 
    ? error.message 
    : typeof error === 'string' 
      ? error 
      : '';

  // Check against known patterns
  for (const { pattern, message, category } of errorPatterns) {
    if (pattern.test(errorMessage)) {
      return { message, category };
    }
  }

  // Default safe messages by common prefixes
  if (errorMessage.toLowerCase().includes('sign')) {
    return { message: 'Unable to sign in. Please check your credentials.', category: 'auth' };
  }
  
  if (errorMessage.toLowerCase().includes('sync')) {
    return { message: 'Unable to sync data. Please try again.', category: 'sync' };
  }

  // Generic fallback - never expose the actual error
  return { message: 'An error occurred. Please try again.', category: 'unknown' };
}

/**
 * Get a safe error message string
 */
export function getSafeErrorMessage(error: unknown): string {
  return toSafeError(error).message;
}

/**
 * Log error safely in development only
 * In production, errors should be sent to a logging service
 */
export function logError(context: string, error: unknown): void {
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, error);
  }
  // In production, you would send to a logging service here
}
