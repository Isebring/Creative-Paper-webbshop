import express from 'express';
import {
  getAllCategories,
  getProductsByCategories,
} from './category-controller';

const categoryRouter = express
  .Router()
  .get('/api/categories', getAllCategories)
  .get('/api/products/by-category/:id', getProductsByCategories);

export default categoryRouter;
