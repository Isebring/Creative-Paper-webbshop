import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { ProductModel } from './product-model';

// const testSchema

export async function getAllProducts(req: Request, res: Response) {
  const products = await ProductModel.find();
  res.status(200).json(products);
}

export async function getProductById(req: Request, res: Response) {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const incomingProduct = req.body;

  const productValidationSchema = yup.object({
    _id: yup.string().required(),
    title: yup.string().trim().min(2).required(),
    description: yup.string().trim().min(5).required(),
    summary: yup.string().trim().min(3).required(),
    categories: yup.string().trim().min(2).required(),
    price: yup.number().min(1).required(),
    quantity: yup.number().required(),
    stock: yup.number().required(),
    imageId: yup.string().trim().min(2).required(),
    imageURL: yup.string().trim().min(2).required(),
    secondImageId: yup.string().trim().min(2).required(),
    secondImageURL: yup.string().trim().min(2).required(),
    rating: yup.number().required(),
    usersRated: yup.number().required(),
  });

  try {
    await productValidationSchema.validate(incomingProduct);

    const newProduct = new ProductModel(incomingProduct);
    newProduct.quantity = incomingProduct.stock;
    const savedProduct = await newProduct.save();
    const responseObj = {
      message: 'Product added',
      ...savedProduct.toJSON(),
    };
    res.set('content-type', 'application/json');
    res.status(201).send(JSON.stringify(responseObj));
  } catch (error) {
    next(error); // är detta globala error handlern? Oklart
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const productId = req.params.id;
  const product = await ProductModel.findById(productId);

  if (!product) {
    return res.status(404).json(`Product with ID ${productId} not found`);
  }

  const productUpdateSchema = yup.object({
    title: yup.string().trim().min(2).required(),
    description: yup.string().trim().min(5).required(), // Ska dessa verkligen vara required vid en edit?
    summary: yup.string().trim().min(3).required(),
    categories: yup.string().trim().min(2).required(),
    price: yup.number().min(1).required(),
    quantity: yup.number().required(),
    stock: yup.number().required(),
    imageId: yup.string().trim().min(2).required(),
    imageURL: yup.string().trim().min(2).required(),
    secondImageId: yup.string().trim().min(2).required(),
    secondImageURL: yup.string().trim().min(2).required(),
    rating: yup.number().required(),
    usersRated: yup.number().required(),
  });

  try {
    const validatedProduct = await productUpdateSchema.validate(req.body);

    if (validatedProduct.stock !== product.stock) {
      validatedProduct.quantity = validatedProduct.stock;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      validatedProduct,
      { new: true },
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    const deletedProduct = await ProductModel.findById(productId);

    if (!deletedProduct) {
      return res.status(404).json('product not found');
    }

    await ProductModel.findByIdAndDelete(productId);
    res.status(200).json('product deleted');
    // res.status(204).end();   bättre alternativ?
  } catch (error) {
    res.status(404).json({
      message: 'Error finding the product',
      error: (error as any).message,
    });
  }
}

export async function productQuantity(
  productId: string,
  quantityToDecrease: number,
) {
  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    product.quantity -= quantityToDecrease;

    await product.save();
  } catch (error) {
    throw error;
  }
}
