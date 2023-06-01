import { Request, Response } from 'express';
import { ProductModel } from '../products/product-model';
import { categoryModel } from './category-model';

// type ObjectId = mongoose.Types.ObjectId;

export const getAllCategories = async (_: Request, res: Response) => {
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

export const getProductsByCategories = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  try {
    const products = await ProductModel.find({ categories: categoryId });

    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};
