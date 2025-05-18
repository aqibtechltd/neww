import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error(`${err.status} - ${err.message}`);
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Handle multer file size error
  if (err.name === 'MulterError' && err.message.includes('File too large')) {
    logger.error('File size exceeded limit');
    return res.status(400).json({
      status: 'fail',
      message: 'File size exceeded the limit',
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    logger.error(`Validation Error: ${err.message}`);
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid input data',
      errors: err.message,
    });
  }

  // Log unknown errors
  logger.error('Unhandled Error:', err);

  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Something went wrong!'
    : err.message;

  return res.status(500).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Async error handler wrapper
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};