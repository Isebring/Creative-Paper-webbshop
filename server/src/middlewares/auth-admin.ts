import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../middlewares/error-handler';
import { UserModel } from '../resources/users/user-model';

async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session?.userId) {
      throw new UnauthorizedError('You must be logged in');
    }

    const user = await UserModel.findById(req.session.userId);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (!user.isAdmin) {
      throw new UnauthorizedError('You must be an admin to access this route');
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default isAdmin;
