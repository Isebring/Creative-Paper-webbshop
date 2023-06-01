import argon2 from 'argon2';
import { NextFunction, Request, Response } from 'express';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../middlewares/error-handler';
import { UserModel } from './user-model';
import userRegistrationSchema from './user-validation';

// Check if a user is logged in, in order to be able to place an order etc.
export function getLoggedInUserInfo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.session?.email) {
      throw new UnauthorizedError('You must login!');
    }
    res.status(200).json(req.session);
  } catch (error) {
    next(error);
  }
}

// Get all users
export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

// Register user
export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new ConflictError('Email already exists');
    }

    // Validate request body with Yup
    await userRegistrationSchema.validate(req.body, {
      abortEarly: false,
    });

    const user = new UserModel(req.body);
    await user.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedError('Incorrect email');
    }
    const isAuth = await argon2.verify(user.password, password);
    if (!isAuth) {
      throw new UnauthorizedError('Incorrect password');
    }
    // Check session/cookie
    if (req.session) {
      req.session.email = user.email;
      req.session.userId = user.id;
      req.session.isAdmin = user.isAdmin;
    } else {
      throw new Error('Session is not defined');
    }

    // Create a new user object without the password field
    const userResponse = {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    // Send response
    res.status(200).json(userResponse);
  } catch (error) {
    next(error);
  }
}

export async function getLoggedInUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Create a new user object without the password field
    const userResponse = {
      _id: req.session?.userId,
      email: req.session?.email,
      isAdmin: req.session?.isAdmin,
    };

    if (!req.session?.email) {
      throw new UnauthorizedError('You must login!');
    }

    // Send response
    res.status(200).json(userResponse);
  } catch (error) {
    next(error);
  }
}

// Logout user
export function logoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    req.session = null;
    res.setHeader(
      'Set-Cookie',
      `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

// Add user as admin
export async function updateUserRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.params.id;
    const { isAdmin } = req.body;

    if (isAdmin === undefined) {
      throw new BadRequestError('isAdmin must be provided');
    }

    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { isAdmin },
      { new: true },
    );

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    next(error);
  }
}
