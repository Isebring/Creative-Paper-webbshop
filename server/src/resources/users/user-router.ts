import express from 'express';
import { isUserAuthenticated } from '../../middlewares/auth-user';
import {
  getAllUsers,
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
} from './user-controller';

const userRouter = express
  .Router()
  .get('/api/users', getAllUsers)
  .post('/api/users/register', registerUser)
  .post('/api/users/login', loginUser)
  .post('/api/users/logout', logoutUser)
  .get('/api/users/auth', isUserAuthenticated, getLoggedInUser);
export default userRouter;
