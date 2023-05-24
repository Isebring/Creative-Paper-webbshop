import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserModel } from './user-model';
import userRegistrationSchema from './user-validation';

// Check if a user is logged in, in order to be able to place an order etc.
export function getLoggedInUserInfo(req: Request, res: Response) {
  if (!req.session?.email) {
    return res.status(401).json('You must login!');
  }
  res.status(200).json(req.session);
}

// Get all users
export async function getAllUsers(req: Request, res: Response) {
  const users = await UserModel.find({});
  res.status(200).json(users);
}

// Register user
export async function registerUser(req: Request, res: Response) {
  const { email } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return res.status(409).json('email already exists');
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
}

// Login user
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json('Incorrect email');
  }
  const isAuth = await argon2.verify(user.password, password);
  if (!isAuth) {
    return res.status(401).json('Incorrect password');
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
}

export async function getLoggedInUser(req: Request, res: Response) {
  // Create a new user object without the password field
  const userResponse = {
    _id: req.session?.userId,
    email: req.session?.email,
    isAdmin: req.session?.isAdmin,
  };

  // Send response
  res.status(200).json(userResponse);
}

// Logout user
export function logoutUser(req: Request, res: Response) {
  req.session = null;
  res.setHeader(
    'Set-Cookie',
    `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,
  );
  res.sendStatus(204);
}
