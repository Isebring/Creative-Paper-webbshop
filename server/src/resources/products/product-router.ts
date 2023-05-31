import express from 'express';
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
  .post('/api/products', createProduct)
  .put('/api/products/:id', updateProduct)
  .delete('/api/products/:id', deleteProduct);

export default productRouter;
