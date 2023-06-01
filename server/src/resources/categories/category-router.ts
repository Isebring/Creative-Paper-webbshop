import express from 'express';
import {
  getAllCategories,
  getProductsByCategories,
} from './category-controller';

const categoryRouter = express
  .Router()
  .get('/api/categories', getAllCategories)
  .get('/api/categories/:id/products', getProductsByCategories);

export default categoryRouter;
