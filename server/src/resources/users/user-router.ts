import express from 'express';
import { isUserAuthenticated } from '../../middlewares/auth-user';
import isAdmin from '../../middlewares/isAdmin';
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
  .get('/api/users', getAllUsers)
  .post('/api/users/register', registerUser)
  .post('/api/users/login', loginUser)
  .post('/api/users/logout', logoutUser)
  .put('/api/users/:id', isAdmin, updateUserRole)
  .get('/api/users/auth', isUserAuthenticated, getLoggedInUser);
export default userRouter;
