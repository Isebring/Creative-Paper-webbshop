import express from "express";
import { loginUser, registerUser } from "./user-controller";

const userRouter = express
  .Router()
  .post("/api/users/register", registerUser)
  .post("/api/users/login", loginUser);
export default userRouter;
