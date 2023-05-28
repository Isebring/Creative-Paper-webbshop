import express from 'express';
import { getAllCategories, getProductsByCategory } from './category-controller';

const categoryRouter = express
.Router()
.get('/api/categories', getAllCategories)
.get('/api/categories/:category/products', getProductsByCategory)

export default categoryRouter;