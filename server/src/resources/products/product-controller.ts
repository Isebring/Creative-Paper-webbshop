import { Request, Response } from "express";
import { ProductModel } from "./product-model";

// const testSchema

export async function getAllProducts(req: Request, res: Response) {
  const products = await ProductModel.find();
  res.status(200).json(products);
}
export async function getProductById() {}
export async function createProduct(req: Request, res: Response) {
  // const incomingProduct = req.body; //samtliga inputfält

  const incomingProduct = req.body;

  const newProduct = new ProductModel(incomingProduct);

  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct);
}
export async function updateProduct() {}
export async function deleteProduct() {}
export async function productQuantity() {}

// // Hampus
// export const createPost = async (req: Request, res: Response) => {
//   const { title, content } = req.body;
//   const author = req.session!.user._id;

//   // Validate input
//   const schema = Joi.object({
//     title: Joi.string().trim().min(2).required(),
//     content: Joi.string().trim().min(5).required(),
//   });

//   const { error } = schema.validate({ title, content });
//   if (error) {
//     return res.status(400).json(error.message);
//   }

//   const newPost = new PostModel({
//     title,
//     content,
//     author,
//   });

//   const savedPost = await newPost.save();
//   res.status(201).json(savedPost);
// };

// // Jespers
// export async function createPost(req: Request, res: Response) {
//   try {
//     const incomingPost = req.body;

//     const author = req.session?._id;
//     if (!author) {
//       res.status(400).json("Missing author ID");
//       return;
//     }

//     const newPost = new PostModel({
//       ...incomingPost,
//       author: req.session?._id,
//     });

//     try {
//       await testSchema.validate(newPost);
//     } catch (error: any) {
//       res.set("content-type", "application/json");
//       return res.status(400).send(JSON.stringify(error.message));
//     }

//     const result = await newPost.save();
//     const responseObj = {
//       message: "Post created",
//       ...result.toJSON(),
//     };

//     res.set("content-type", "application/json");
//     res.status(201).send(JSON.stringify(responseObj));
//   } catch (error) {
//     console.error("Error inserting user:", error);
//     res.set("content-type", "application/json");
//     res.status(500).send(
//       JSON.stringify({
//         message: "Error inserting user",
//         error: (error as any).message,
//       }),
//     );
//   }
// }
