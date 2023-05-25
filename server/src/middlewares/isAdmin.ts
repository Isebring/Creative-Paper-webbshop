import { NextFunction, Request, Response } from 'express';

function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.session?.user;

  if (user && user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized access' });
  }
}

export default isAdmin;
