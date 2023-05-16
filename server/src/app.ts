import console from 'console';
import cookieSession from 'cookie-session';
import express from 'express';

const Joi = require('joi');
export const app = express();

// GLOBAL MIDDLEWARE
app.use(express.json());
app.use(
  cookieSession({
    secure: false,
    httpOnly: true,
    secret: 'fjkarhgoahgbvjbjaerhfaorsafa',
    maxAge: 3600000,
  })
);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  if (Joi.isError(err)) {
    if (err.message.includes('errors occurred')) {
      res.status(400).json(err.details[0].message);
    } else {
      res.status(400).json(err.message);
    }
  } else {
    res.status(500).json(err.message);
  }
});
