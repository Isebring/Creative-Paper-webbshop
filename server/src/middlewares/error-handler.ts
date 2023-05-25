import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ValidationError) {
    res.status(400).json(err.message);
  } else if (
    err instanceof BadRequestError ||
    err instanceof UnauthorizedError ||
    err instanceof NotFoundError
  ) {
    res.status(err.statusCode).json(err.message);
  } else if (err instanceof Error) {
    res.status(500).json(err.message);
  } else {
    res.status(500).json('An unknown error occurred');
  }
};

export default errorHandler;
