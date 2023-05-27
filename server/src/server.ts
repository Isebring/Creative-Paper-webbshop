import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createCategories from '../src/resources/categories/createCategories';
import { app } from './app';

dotenv.config();

async function main() {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL environment variable is not set.');
  }

  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to Database');

  await createCategories();

  app.listen(3000, () => {
    console.log('Server is running: http://localhost:3000');
  });
}

main().catch(console.error);
