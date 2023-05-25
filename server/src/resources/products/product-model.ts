import { InferSchemaType, Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    _id: { type: String, required: true }, // mongodbId
    title: { type: String, required: true },
    description: { type: String, required: true },
    summary: { type: String, required: true },
    categories: { type: String, required: true }, // fråga David?
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageId: { type: String, required: true }, // Schematypes? Path?
    secondImageId: { type: String, required: true }, // Schematypes? Path?
    rating: { type: Number, required: true },
    usersRated: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
  },
);

productSchema.virtual('imageURL').get(function () {
  return '/api/images/' + this.imageId;
});

export type Product = InferSchemaType<typeof productSchema> & {
  imageURL: string;
};
export const ProductModel = model('Product', productSchema);
