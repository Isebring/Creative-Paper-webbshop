import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { categoryModel } from './category-model';

type ObjectId = mongoose.Types.ObjectId;

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
export { getProductsByCategories };

const getProductsByCategories = async (req: Request, res: Response) => {
  const categories = req.body.categories;
  

  if (!Array.isArray(categories)) {
    return res.status(400).json({ error: 'Categories is not an array or is not provided.' });
  }

  try {
    const categoryInstances = await Promise.all(categories.map((category: string) => {
      return categoryModel.findOne({ name: category }).populate('products');
    }));

    const allProducts = categoryInstances.reduce((products: ObjectId[], categoryInstance) => {
      if (categoryInstance && categoryInstance.products) {
        return products.concat([...categoryInstance.products]);
      } else {
        return products;
      }
    }, []);
    
    

    res.status(200).json(allProducts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};
