import mongoose from 'mongoose';
import { app } from './app';

async function main() {
  await mongoose.connect(
    'mongodb+srv://admin:IL10xOKxb89edrXB@webshop.gpzfdho.mongodb.net/?retryWrites=true&w=majority'
  );
  console.log('Connected to Database');

  app.listen(3000, () => {
    console.log('Server is running: http://localhost:3000');
  });
}
