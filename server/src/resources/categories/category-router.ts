import express from 'express';
import { getAllCategories, getProductsByCategories } from './category-controller';

const categoryRouter = express
.Router()
.get('/api/categories', getAllCategories)
.post('/api/products/by-category', getProductsByCategories)

export default categoryRouter;