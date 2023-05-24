import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from './order-controller';

const orderRouter = express
  .Router()
  .get('/api/orders', getOrders) // Get current user's orders
  .get('/api/orders/all', getAllOrders) // Get all orders (admin only)
  .post('/api/orders', createOrder) // Create a new order
  .get('/api/orders/:id', getOrderById) // Get a specific order by ID
  .put('/api/orders/status/:id', updateOrderStatus); // Update the status of a specific order by ID
export default orderRouter;
