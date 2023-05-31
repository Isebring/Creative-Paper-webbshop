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

// Get orders for a logged in user
export async function getOrders(req: Request, res: Response) {
  // Verify if the user is logged in
  if (!req.session?.userId) {
    throw new UnauthorizedError('You must login to view your orders');
  }

  // Retrieve user's orders from the database
  const orders = await OrderModel.find({ user: req.session.userId });

  // Convert orders to plain JavaScript objects to avoid Mongoose-related issues
  const orderObjects = orders.map((order) => order.toObject());

  res.status(200).json({
    success: true,
    data: orderObjects,
  });
}

// Get all orders (admin only)
export async function getAllOrders(req: Request, res: Response) {
  // Retrieve all orders from the database
  const orders = await OrderModel.find({});

  // Convert orders to plain JavaScript objects
  const orderObjects = orders.map((order) => order.toObject());

  res.status(200).json({
    success: true,
    data: orderObjects,
  });
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

    // Update the product stock
    if (product.stock >= item.quantity) {
      await ProductModel.updateOne(
        { _id: product._id },
        { $inc: { stock: -item.quantity } },
      );
      product.stock -= item.quantity;
    } else {
      throw new BadRequestError(
        `Not enough stock for product: ${product.title}`,
      );
    }
    const totalItemPrice = product.price * item.quantity;
    orderItems.push({
      product: {
        _id: product._id,
        title: product.title,
        price: product.price,
      },
      quantity: item.quantity,
      price: totalItemPrice,
    });
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

  // Fetch the full order details
  const finalOrder = await OrderModel.findById(savedOrder._id);

  res.status(201).json({
    success: true,
    data: finalOrder,
  });
}

export async function getOrderById(req: Request, res: Response) {
  const orderId = req.params.id;

  // Check if the provided orderId is a valid ObjectId
  if (!MongooseTypes.ObjectId.isValid(orderId)) {
    throw new BadRequestError('Invalid order ID.');
  }

  const order = await OrderModel.findById(orderId);

  if (!order) {
    throw new NotFoundError(`Order with id ${orderId} not found.`);
  }

  res.status(200).json(order.toObject());
}

export async function updateOrderStatus(req: Request, res: Response) {
  const orderId = req.params.id;
  const newStatus = req.body.status;

  // Check if the provided orderId is a valid ObjectId
  if (!MongooseTypes.ObjectId.isValid(orderId)) {
    throw new BadRequestError('Invalid order ID.');
  }

  // Check if the provided status is valid
  if (!['in progress', 'shipped'].includes(newStatus)) {
    throw new BadRequestError('Invalid order status.');
  }

  // Check if the user is logged in and is an admin
  if (!req.session?.userId || !req.session.isAdmin) {
    throw new UnauthorizedError('Only admins can update the order status.');
  }

  const order = await OrderModel.findById(orderId);

  if (!order) {
    throw new NotFoundError(`Order with id ${orderId} not found.`);
  }

  // Update the order status
  order.status = newStatus;
  await order.save();

  res.status(200).json(order.toObject());
}
