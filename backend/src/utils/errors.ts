export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public fields?: Record<string, string>,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errors = {
  badRequest: (message: string, code = 'BAD_REQUEST') => new AppError(400, code, message),
  unauthorized: (message = 'Authentication required', code = 'UNAUTHORIZED') =>
    new AppError(401, code, message),
  forbidden: (message = 'You do not have permission to perform this action', code = 'FORBIDDEN') =>
    new AppError(403, code, message),
  notFound: (message = 'Resource not found', code = 'NOT_FOUND') => new AppError(404, code, message),
  conflict: (message: string, code = 'CONFLICT') => new AppError(409, code, message),
  validation: (message: string, fields?: Record<string, string>) =>
    new AppError(422, 'VALIDATION_ERROR', message, fields),
  rateLimited: (message = 'Too many requests') => new AppError(429, 'RATE_LIMITED', message),
  internal: (message = 'Internal server error') => new AppError(500, 'INTERNAL_ERROR', message),
};
