import express from "express";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "./user-controller";

const userRouter = express
  .Router()
  .get("/api/users", getAllUsers)
  .post("/api/users/register", registerUser)
  .post("/api/users/login", loginUser)
  .post("/api/users/logout", logoutUser);
// .get("/api/users/auth", isAuthenticated, getLoggedInUser)
// .post("/api/users/checkUsername", checkUsername);
export default userRouter;
