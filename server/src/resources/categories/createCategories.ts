import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { categoryModel } from './category-model';

dotenv.config();

const defaultCategories = ['Pens', 'Notebooks', 'Journals', 'Cards', 'Calendars', 'Planners', 'Accessories'];

async function createCategories() {
    console.log("create categories is running!")
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL environment variable is not set.');
    }

    await mongoose.connect(process.env.MONGO_URL);

    for (const name of defaultCategories) {
        const category = new categoryModel({ name });
        await category.save();
        console.log(`Category ${name} created`);
    }

    await mongoose.connection.close();
    console.log('Done');
}

createCategories().catch(console.error);
