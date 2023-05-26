import { Request, Response } from 'express';
import { Types as MongooseTypes } from 'mongoose';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../../middlewares/error-handler';
import { ProductModel } from '../products/product-model';
import { UserModel } from '../users/user-model';
import { OrderModel } from './order-model';
import orderValidationSchema from './order-validation';

// Get orders
export async function getOrders(req: Request, res: Response) {
  // Verify if the user is logged in
  if (!req.session?.userId) {
    throw new UnauthorizedError('You must login to view your orders');
  }
  // Retrieve user's orders from the database
  const orders = await OrderModel.find({ user: req.session.userId });
  res.status(200).json({
    success: true,
    data: orders,
  });
}

// Get all orders (admin only)
export async function getAllOrders(req: Request, res: Response) {
  const products = await OrderModel.find({}).populate('orderItems.product');
  res.status(200).json(products);
}

// Create order
export async function createOrder(req: Request, res: Response) {
  // Verify if the user is logged in
  if (!req.session?.userId) {
    throw new UnauthorizedError('You must login to place an order');
  }

  // Validate request body
  const validatedBody = await orderValidationSchema
    .validate(req.body)
    .catch((error) => {
      throw new BadRequestError(error.message);
    });

  // Retrieve the user from the database
  const user = await UserModel.findById(req.session.userId);
  if (!user) {
    throw new NotFoundError(`User with id ${req.session.userId} not found.`);
  }

  // Process each orderItem to include price and calculate total price
  const orderItems = [];
  let totalPrice = 0;
  for (const item of validatedBody.orderItems) {
    const product = await ProductModel.findById(item.product);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    const price = product.price;
    const totalItemPrice = price * item.quantity;
    orderItems.push({ ...item, price: totalItemPrice }); // price here is total price for this item
    totalPrice += totalItemPrice;
  }

  // Create the order with the associated user
  const orderData = {
    user: user._id,
    orderItems,
    totalPrice,
    deliveryAddress: validatedBody.deliveryAddress,
    status: 'in progress',
  };
  const order = new OrderModel(orderData);
  const savedOrder = await order.save();

  res.status(201).json({
    success: true,
    data: savedOrder,
  });
}

// Get order by id
export async function getOrderById(req: Request, res: Response) {
  const orderId = req.params.id;

  // Check if the provided orderId is a valid ObjectId
  if (!MongooseTypes.ObjectId.isValid(orderId)) {
    throw new BadRequestError('Invalid order ID.');
  }

  const order = await OrderModel.findById(orderId).populate(
    'orderItems.product',
  );

  if (!order) {
    throw new NotFoundError(`Order with id ${orderId} not found.`);
  }

  res.status(200).json(order);
}

// Update order status
// export async function updateOrderStatus(req: Request, res: Response) {
//   // const products = await ProductModel.find();
//   // res.status(200).json(products);
// }
