import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ValidationError) {
    if (err.message.includes('errors occurred')) {
      res.status(400).json(err.errors[0]);
    } else {
      res.status(400).json(err.message);
    }
  } else if (err instanceof Error) {
    res.status(500).json(err.message);
  } else {
    res.status(500).json('An unknown error occurred');
  }
};

export default errorHandler;
