import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error-handler';
import imageRouter from './resources/images/image-router';
import orderRouter from './resources/orders/order-router';
import productRouter from './resources/products/product-router';
import userRouter from './resources/users/user-router';

// const port = process.env.PORT || 3000;

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

// Routes
app.use(orderRouter);
// app.use(categoryRouter);
app.use(imageRouter);
app.use(productRouter);
app.use(userRouter);

// GLOBAL ERROR HANDLER
app.use(errorHandler);
