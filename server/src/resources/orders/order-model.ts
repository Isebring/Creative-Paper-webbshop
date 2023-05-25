import { InferSchemaType, Schema, model } from 'mongoose';

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false, // Ska MongoDB ge ett id till varje orderItem?!
  },
);

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      enum: ['in progress', 'shipped'],
      default: 'in progress',
    },
    deliveryAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
    strict: 'throw',
  },
);

export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model('Order', orderSchema);
