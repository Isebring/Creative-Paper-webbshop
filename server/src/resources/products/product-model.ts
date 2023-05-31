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
  stock: { type: Number, required: true }, // Ta tillbaka required när det finns
  imageId: { type: String, required: true }, // Schematypes? Path?
  secondImageId: { type: String, required: true }, // Schematypes? Path?
  rating: { type: Number },
  usersRated: { type: Number },
  isArchived: { type: Boolean, default: false },
});

productSchema.pre('find', function () {
  this.getFilter().isArchived = { $ne: true };
});

export type Product = InferSchemaType<typeof productSchema> & {
  imageURL: string;
};
export const ProductModel = model('Product', productSchema);
