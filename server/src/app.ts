import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error-handler';
import categoryRouter from './resources/categories/category-router';
import imageRouter from './resources/images/image-router';
import orderRouter from './resources/orders/order-router';
import productRouter from './resources/products/product-router';
import userRouter from './resources/users/user-router';

// const port = process.env.PORT || 3000;
// console.log(process.env.NODE_ENV);
// console.log(process.env.MONGODB_URI);

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
app.use(categoryRouter)

// GLOBAL ERROR HANDLER
app.use(errorHandler);
