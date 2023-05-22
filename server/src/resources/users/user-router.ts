import express from 'express';
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
} from './user-controller';

const userRouter = express
  .Router()
  .get('/api/users', getAllUsers)
  .post('/api/users/register', registerUser)
  .post('/api/users/login', loginUser)
  .post('/api/users/logout', logoutUser);
export default userRouter;
