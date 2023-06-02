import express from 'express';
import isAdmin from '../../middlewares/auth-admin';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from './product-controller';

const productRouter = express
  .Router()
  .get('/api/products', getAllProducts)
  .get('/api/products/:id', getProductById)
  .post('/api/products', isAdmin, createProduct)
  .put('/api/products/:id', isAdmin, updateProduct)
  .delete('/api/products/:id', isAdmin, deleteProduct);

export default productRouter;
