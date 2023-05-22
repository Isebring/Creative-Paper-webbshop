import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  productQuantity,
} from "./product-controller";

const productRouter = express
  .Router()
  .get("/api/products", getAllProducts)
  .get("/api/products/:id", getProductById)
  .post("/api/products", createProduct) //add?
  // .put("/api/products/:id", updateProduct) Kan inte vara dublett
  .put("/api/products/:id", productQuantity) // uppdatera lagersaldo
  .delete("/api/products/:id", deleteProduct);

export default productRouter;
