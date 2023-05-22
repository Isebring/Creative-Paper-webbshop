import express from "express";
import { loginUser, logoutUser, registerUser } from "./user-controller";

const userRouter = express
  .Router()
  .post("/api/users/register", registerUser)
  .post("/api/users/login", loginUser)
  .post("/api/users/logout", logoutUser);
export default userRouter;
