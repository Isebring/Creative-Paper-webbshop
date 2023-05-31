import dotenv from 'dotenv';
import { categoryModel } from './category-model';

dotenv.config();

const defaultCategories = [
  'Pens',
  'Notebooks',
  'Journals',
  'Cards',
  'Calendars',
  'Planners',
  'Accessories',
];

async function createCategories() {
  for (const name of defaultCategories) {
    const existingCategory = await categoryModel.findOne({ name });
    if (!existingCategory) {
      const category = new categoryModel({ name });
      await category.save();
    }
  }
}

export default createCategories;
