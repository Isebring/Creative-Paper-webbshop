import { Request, Response } from 'express';
import { categoryModel } from './category-model';

const getAllCategories = async (_: Request, res: Response) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

export { getAllCategories };
