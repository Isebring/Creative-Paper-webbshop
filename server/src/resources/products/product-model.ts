import { InferSchemaType, Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  summary: { type: String },
  categories: { type: String }, // fråga David?
  price: { type: Number, required: true },
  quantity: { type: Number },
  stock: { type: Number },
  imageId: { type: String, required: true }, // Schematypes? Path? }, // Schematypes? Path?
  secondImageURL: { type: String },
  rating: { type: Number },
  usersRated: { type: Number },
});

export type Product = InferSchemaType<typeof productSchema> & {
  imageURL: string;
};
export const ProductModel = model('Product', productSchema);
