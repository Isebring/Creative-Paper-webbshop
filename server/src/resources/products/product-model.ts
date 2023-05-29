import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  summary: { type: String },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  price: { type: Number, required: true },
  quantity: { type: Number },
  stock: { type: Number },
  imageId: { type: String, required: true }, // Schematypes? Path? }, // Schematypes? Path?
  secondImageId: { type: String },
  rating: { type: Number },
  usersRated: { type: Number },
});

export type Product = InferSchemaType<typeof productSchema> & {
  imageURL: string;
};
export const ProductModel = model('Product', productSchema);
