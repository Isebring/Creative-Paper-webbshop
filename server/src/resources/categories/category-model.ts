import { InferSchemaType, model, Schema } from "mongoose";

const categorySchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        products: [{
            type: Schema.Types.ObjectId,
            red: 'Product'
        }]
    }
)

export type Category = InferSchemaType<typeof categorySchema>;

export const categoryModel = model('category', categorySchema);