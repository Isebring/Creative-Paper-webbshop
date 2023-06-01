import busboy from 'busboy';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { NotFoundError } from '../../middlewares/error-handler';
import { imageBucket } from './image-model';

export async function getImageById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const _id = new mongoose.mongo.ObjectId(req.params.id);

    const file = await imageBucket.find({ _id }).next();
    if (!file?.contentType) {
      throw new NotFoundError('Image not found');
    }

    res.setHeader('Content-Type', file.contentType);

    const downloadStream = imageBucket.openDownloadStream(_id);
    downloadStream.pipe(res);
  } catch (error) {
    next(error);
  }
}

export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
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

      uploadStream.on('error', (error) => {
        next(error);
      });
    });

    bb.on('error', (error) => {
      next(error);
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const _id = new mongoose.mongo.ObjectId(req.params.id);

    const file = await imageBucket.find({ _id }).next();
    if (!file) {
      throw new NotFoundError('Image not found');
    }

    await imageBucket.delete(_id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
}
