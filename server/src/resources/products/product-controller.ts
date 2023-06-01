import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { categoryModel } from '../categories/category-model';
import { ProductModel } from './product-model';
import {
  productUpdateSchema,
  productValidationSchema,
} from './product-validation';

export async function getAllProducts(req: Request, res: Response) {
  const products = await ProductModel.find().populate('categories');
  res.status(200).json(products);
}

export async function getProductById(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId).populate({
      path: 'categories',
      select: '-products',
    });
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
  console.log('Incoming product:', req.body);

  const incomingProduct = req.body;

  try {
    await productValidationSchema.validate(incomingProduct);

    const newProduct = new ProductModel({
      ...incomingProduct,
      _id: new ObjectId(),
      categories: [],
    });
    const savedProduct = await newProduct.save();

    for (const categoryName of incomingProduct.categories) {
      const category = await categoryModel.findOne({ name: categoryName });
      if (category) {
        category.products.push(savedProduct._id);
        savedProduct.categories.push(category._id);
        await category.save();
      } else {
        console.log(`Category ${categoryName} not found.`);
      }
    }

    await savedProduct.save();

    const populatedProduct = await ProductModel.findById(
      savedProduct._id,
    ).populate('categories', 'name -_id');

    if (populatedProduct) {
      const responseObj = {
        message: 'Product added',
        ...savedProduct.toJSON(),
      };

      res.set('content-type', 'application/json');
      res.status(201).send(JSON.stringify(responseObj));
    } else {
      throw new Error('Product not found after creation');
    }
  } catch (error) {
    next(error);
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

  try {
    console.log('Update product:', { params: req.params, body: req.body });
    const validatedProduct = await productUpdateSchema.validate(req.body);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      validatedProduct,
      { new: true },
    ).populate('categories');

    // Archive the old product
    product.isArchived = true;
    await product.save();
    console.log(product);

    // Create a new product with validated data
    const newProduct = new ProductModel({
      ...validatedProduct,
      _id: undefined,
      previousId: productId,
    });
    const savedProduct = await newProduct.save();

    // Send the new product as a response
    res.status(200).json({
      updatedProduct,
      newProduct: savedProduct,
      oldProductId: productId,
    });
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

    await categoryModel.updateMany(
      { _id: { $in: deletedProduct.categories } },
      { $pull: { products: productId } },
    );

    await ProductModel.findByIdAndDelete(productId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting the product',
      error: (error as Error).message,
    });
  }
}
