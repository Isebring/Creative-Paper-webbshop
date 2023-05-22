import console from "console";
import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import * as Yup from "yup";
import userRouter from "./resources/users/user-router";

export const app = express();

// GLOBAL MIDDLEWARE
app.use(express.json());
app.use(
  cookieSession({
    secure: false,
    httpOnly: true,
    secret: "fjkarhgoahgbvjbjaerhfaorsafa",
    maxAge: 3600000,
  }),
);

// Routes
// app.use(orderRouter);
// app.use(categoryRouter);
// app.use(imageRouter);
// app.use(productRouter);
app.use(userRouter);

// Error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof Yup.ValidationError) {
    if (err.message.includes("errors occurred")) {
      res.status(400).json(err.errors[0]);
    } else {
      res.status(400).json(err.message);
    }
  } else {
    res.status(500).json(err.message);
  }
});
