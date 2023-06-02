import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

// Please note:
// 201 and 204 statuses are handled directly in the route handlers instead of using the error handler.
export class BadRequestError extends Error {
  statusCode = 400;
  constructor(message = 'Bad Request') {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends Error {
  statusCode = 401;
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  statusCode = 409;
  constructor(message = 'Conflict') {
    super(message);
    this.name = 'ConflictError';
  }
}

export class InternalServerError extends Error {
  statusCode = 500;
  constructor(message = 'Internal Server Error') {
    super(message);
    this.name = 'InternalServerError';
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ValidationError) {
    res.status(400).json(err.message);
  } else if (
    err instanceof BadRequestError ||
    err instanceof UnauthorizedError ||
    err instanceof NotFoundError ||
    err instanceof ConflictError ||
    err instanceof InternalServerError
  ) {
    res.status(err.statusCode).json(err.message);
  } else if (err instanceof Error) {
    res.status(500).json(err.message);
  } else {
    res.status(500).json('An unknown error occurred');
  }
};

export default errorHandler;
