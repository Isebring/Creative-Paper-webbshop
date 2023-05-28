import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { categoryModel } from '../categories/category-model';
import { ProductModel } from './product-model';

// const testSchema

export async function getAllProducts(req: Request, res: Response) {
  const products = await ProductModel.find();
  res.status(200).json(products);
}

export async function getProductById(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId).populate(
      'categories',
    );
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
  console.log(incomingProduct);
  const productValidationSchema = yup.object({
    title: yup.string().min(2).required(),
    description: yup.string().min(5).required(),
    summary: yup.string().min(3).required(),
    categories: yup.array().of(yup.string().min(2)).required(),
    price: yup.number().min(1).required(),
    quantity: yup.number().required(),
    stock: yup.number().required(),
    imageId: yup.string().min(2).required(),
    imageURL: yup.string().min(2).required(),
    secondImageId: yup.string().min(2).required(),
    secondImage: yup.string().min(2).required(),
    rating: yup.number().required(),
    usersRated: yup.number().required(),
  });

  try {
    await productValidationSchema.validate(incomingProduct);

    // We save the product without the categories first.
    const newProduct = new ProductModel({ ...incomingProduct, categories: [] });
    newProduct.quantity = incomingProduct.stock;
    const savedProduct = await newProduct.save();

    // Then, we lookup the categories and add them to the product.
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
    
    // Now we save the product again with the correct categories.
    await savedProduct.save();

    const responseObj = {
      message: 'Product added',
      ...savedProduct.toJSON(),
    };
    res.set('content-type', 'application/json');
    res.status(201).send(JSON.stringify(responseObj));
  } catch (error) {
    next(error);
  }
}


export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const productId = req.params._id;
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
    const productId = req.params._id;
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

// export async function productQuantity(
//   productId: string,
//   quantityToDecrease: number,
// ) {
//   try {
//     const product = await ProductModel.findById(productId);

//     if (!product) {
//       throw new Error(`Product with ID ${productId} not found`);
//     }

//     // Decrease the quantity by the specified amount
//     product.quantity -= quantityToDecrease;

//     await product.save();
//   } catch (error) {
//     throw error;
//   }
// }
