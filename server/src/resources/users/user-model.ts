import argon2 from "argon2";
import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minlength: [3, "Email must be at least 3 characters"],
      maxlength: [32, "Email cannot exceed 32 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  },
);

userSchema.pre("save", async function (next) {
  // kryptera lösenordet
  this.password = await argon2.hash(this.password, {
    memoryCost: 1024,
    timeCost: 2,
  });
  next();
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("user", userSchema);
