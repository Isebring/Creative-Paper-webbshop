import express from 'express';
import { deleteImage, getImageById, uploadImage } from './image-controller';

const imageRouter = express
  .Router()
  .get('/api/image/:id', getImageById)
  .post('/api/image', uploadImage)
  .delete('/api/image/:id', deleteImage);

export default imageRouter;
