import busboy from 'busboy';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { imageBucket } from './image-model';

// export async function saveProductData(req: Request, res: Response) {
//   try {
//     const productData: Product = req.body;
//     const newProduct = new ProductModel({
//       ...productData,
//       _id: new ObjectId(),    // Använts för testning
//     });
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error('Error saving product data:', error);
//     res.status(400).json({ message: 'Error saving product data', error });
//   }
// }

// export async function updateProductData(req: Request, res: Response) {
//   try {
//     const productData: Product = req.body;
//     const { id } = req.params;
//     const updatedProduct = await ProductModel.findByIdAndUpdate(
//       id,
//       productData,                         // Använts för testning
//       {
//         new: true,
//         runValidators: true,
//       },
//     );

//     if (!updatedProduct) {
//       res.status(404).json({ message: 'Product not found' });
//     } else {
//       res.status(200).json(updatedProduct);
//     }
//   } catch (error) {
//     console.error('Error updating product data:', error);
//     res.status(400).json({ message: 'Error updating product data', error });
//   }
// }

export async function getImageById(req: Request, res: Response) {
  const _id = new mongoose.mongo.ObjectId(req.params.id);

  const file = await imageBucket.find({ _id }).next();
  if (!file?.contentType) {
    return res.status(404).json('Image not found');
  }

  res.setHeader('Content-Type', file.contentType);

  const downloadStream = imageBucket.openDownloadStream(_id);
  downloadStream.pipe(res);
}

export async function uploadImage(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });
  req.pipe(bb);

  bb.on('file', (_, file, info) => {
    const { filename, mimeType } = info;

    const uploadStream = imageBucket.openUploadStream(filename, {
      contentType: mimeType,
    });
    file.pipe(uploadStream);

    uploadStream.on('finish', (data: mongoose.mongo.GridFSFile) => {
      res.status(201).json(data._id);
    });
  });
}

export async function deleteImage(req: Request, res: Response) {
  const _id = new mongoose.mongo.ObjectId(req.params.id);

  const file = await imageBucket.find({ _id }).next();
  if (!file) {
    return res.status(404).json('Image not found');
  }

  await imageBucket.delete(_id);
  res.status(200).json('Image deleted');
}
