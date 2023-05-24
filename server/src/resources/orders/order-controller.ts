import { Request, Response } from 'express';
import * as Yup from 'yup';
import { UserModel } from '../users/user-model';
import { OrderModel } from './order-model';
import orderValidationSchema from './order-validation';

export async function getOrders(req: Request, res: Response) {
  // const products = await ProductModel.find();
  // res.status(200).json(products);
}
export async function getAllOrders(req: Request, res: Response) {
  // const products = await ProductModel.find();
  // res.status(200).json(products);
}

export async function createOrder(req: Request, res: Response) {
  try {
    // Verify if the user is logged in
    if (!req.session?.userId) {
      res.status(401).json('You must login to place an order');
      return;
    }

    // Validate request body
    const validatedBody = await orderValidationSchema.validate(req.body);

    // Retrieve the user from the database
    const user = await UserModel.findById(req.session.userId);
    if (!user) {
      res.status(404).json('User not found');
      return;
    }

    // Create the order with the associated user
    const orderData = {
      user: user._id,
      ...validatedBody,
    };
    const order = new OrderModel(orderData);
    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      data: savedOrder,
    });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // Validation failed
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error instanceof Error) {
      // Other error
      console.error(error.message);
      res.status(500).json({
        success: false,
        message: error.message, // send the error message to the client
      });
    } else {
      // handle other types of errors, or rethrow
      throw error;
    }
  }
}

export async function getOrderById(req: Request, res: Response) {
  // const products = await ProductModel.find();
  // res.status(200).json(products);
}

export async function updateOrderStatus(req: Request, res: Response) {
  // const products = await ProductModel.find();
  // res.status(200).json(products);
}
