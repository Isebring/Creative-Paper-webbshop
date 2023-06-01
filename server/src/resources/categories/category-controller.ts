import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from '../../middlewares/error-handler';
import { ProductModel } from '../products/product-model';
import { categoryModel } from './category-model';

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    next(new InternalServerError((error as Error).message));
  }
};

export const getProductsByCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categoryId = req.params.id;

  try {
    const products = await ProductModel.find({ categories: categoryId });
    res.status(200).json(products);
  } catch (error) {
    next(new InternalServerError((error as Error).message));
  }
};
