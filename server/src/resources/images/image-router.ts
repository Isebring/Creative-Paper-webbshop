import express from 'express';
import { deleteImage, getImageById, uploadImage } from './image-controller';

const imageRouter = express
  .Router()
  .get('/api/image/:id', getImageById)
  .post('/api/image', uploadImage)
  // .post('/api/product', saveProductData) // Använts för testning
  // .put('/api/product/:id', updateProductData) // Använts för testning
  .delete('/api/image/:id', deleteImage);

export default imageRouter;
