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
export { getProductsByCategory };

const getProductsByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    
    try {
      const categoryInstance = await categoryModel.findOne({ name: category }).populate('products');
      
      if (!categoryInstance) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      res.status(200).json(categoryInstance.products);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred.' });
      }
    }
  };
  
