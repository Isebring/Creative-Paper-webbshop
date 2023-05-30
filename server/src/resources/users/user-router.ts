import express from 'express';
import isAdmin from '../../middlewares/auth-admin';
import { isUserAuthenticated } from '../../middlewares/auth-user';

import {
  getAllUsers,
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserRole,
} from './user-controller';

const userRouter = express
  .Router()
  .get('/api/users', isAdmin, getAllUsers)
  .post('/api/users/register', registerUser)
  .post('/api/users/login', loginUser)
  .post('/api/users/logout', logoutUser)
  .put('/api/users/:id', isAdmin, updateUserRole)
  .get('/api/users/auth', isUserAuthenticated, getLoggedInUser);
export default userRouter;
