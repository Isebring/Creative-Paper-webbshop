import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const categoriesSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }]
    }
)

export type Category = InferSchemaType<typeof categoriesSchema>;

export const categoryModel = model('Category', categoriesSchema);