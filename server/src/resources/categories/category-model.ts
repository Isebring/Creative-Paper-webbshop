import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
  imageId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

export type Category = InferSchemaType<typeof categoriesSchema>;

export const categoryModel = model('Category', categoriesSchema);
