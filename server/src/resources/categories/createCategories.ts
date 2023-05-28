import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { categoryModel } from './category-model';

dotenv.config();

const defaultCategories = ['Pens', 'Notebooks', 'Journals', 'Cards', 'Calendars', 'Planners', 'Accessories', 'Test'];

async function createCategories() {
    console.log("create categories is running!")

    for (const name of defaultCategories) {
        const existingCategory = await categoryModel.findOne({ name });
        if (!existingCategory) {
            const category = new categoryModel({ name });
            await category.save();
            console.log(`Category ${name} created`);
        } else {
            console.log(`Category ${name} already exists.`);
        }
    }

    console.log('Done');
}





 //createCategories().catch(console.error);

export default createCategories;