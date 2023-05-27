import express from 'express';
import { getAllCategories } from './category-controller';

const categoryRouter = express
.Router()
.get('/api/category', getAllCategories)

export default categoryRouter;