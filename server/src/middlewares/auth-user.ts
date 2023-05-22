import express from 'express';

export function isUserAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.session?.userId) {
    next();
  } else {
    res.status(401).json('You must be logged in to perform this action');
  }
}
