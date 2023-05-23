import mongoose from 'mongoose';
import { afterAll, beforeAll } from 'vitest';

// Connect to mongo in first test file and keep connection alive.
beforeAll(async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      mongoose.set('strictQuery', true);
      await mongoose.connect('mongodb://127.0.0.1:27017/user-content-test');
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error(error);
  }
});

// Delete database models after each test file since files run in isolation.
// Without this code mongoose freaks out when it tries to recreate the models.
afterAll(() => mongoose.modelNames().forEach(mongoose.deleteModel));
