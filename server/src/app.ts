import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
<<<<<<< HEAD
import productRouter from './resources/products/product-router';
=======
import * as Yup from 'yup';
import userRouter from './resources/users/user-router';
>>>>>>> c1e9a24dc95c3668fb140c983aba0d0f625417ea

export const app = express();

// GLOBAL MIDDLEWARE
app.use(express.json());
app.use(
  cookieSession({
    secure: false,
    httpOnly: true,
    secret: 'fjkarhgoahgbvjbjaerhfaorsafa',
    maxAge: 3600000,
  }),
);

<<<<<<< HEAD
app.use(productRouter);

// GLOBAL ERROR HANDLER
=======
// Routes
// app.use(orderRouter);
// app.use(categoryRouter);
app.use(productRouter);

// GLOBAL app.use(imageRouter);
// app.use(productRouter);
app.use(userRouter);

// Error
>>>>>>> c1e9a24dc95c3668fb140c983aba0d0f625417ea
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof Yup.ValidationError) {
    if (err.message.includes('errors occurred')) {
      res.status(400).json(err.errors[0]);
    } else {
      res.status(400).json(err.message);
    }
  } else {
    res.status(500).json(err.message);
  }
});
