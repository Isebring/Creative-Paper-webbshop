import console from "console";
import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import productRouter from "./resources/products/product-router";

const Joi = require("joi");
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

// ERROR HANDLER
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json(err.message);
});

app.use(productRouter);
