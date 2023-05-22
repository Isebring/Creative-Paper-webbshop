import { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: String, required: true }, // fråga David?
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  stock: { type: Number, required: true },
  imageId: { type: String, required: true }, // Schematypes? Path?
  imageURL: { type: String, required: true },
});

export type Product = InferSchemaType<typeof productSchema>;
export const ProductModel = model("Product", productSchema);
