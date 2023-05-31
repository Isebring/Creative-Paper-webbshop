import * as yup from 'yup';

export const productValidationSchema = yup.object({
  title: yup.string().trim().min(2).required(),
  description: yup.string().trim().min(5).required(),
  summary: yup.string().trim(),
  categories: yup.array().of(yup.string().min(2)).required(),
  price: yup.number().min(1).required(),
  stock: yup.number(),
  imageId: yup.string().trim().min(2).required(),
  secondImageId: yup.string().trim().min(2),
});

export const productUpdateSchema = yup.object({
  title: yup.string().trim(),
  description: yup.string().trim(),
  summary: yup.string().trim(),
  categories: yup.array().of(yup.string().min(2)).required(),
  price: yup.number().min(1).required(),
  stock: yup.number(),
  imageId: yup.string().trim(),
  secondImageId: yup.string().trim(),
});
