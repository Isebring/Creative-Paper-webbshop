import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  productQuantity,
  updateProduct,
} from "./product-controller";

const productRouter = express
  .Router()
  .get("/api/products", getAllProducts)
  .get("/api/products", getProductById)
  .post("/api/products", createProduct) //add?
  .put("/api/products/:id", updateProduct)
  .put("/api/products/:id", productQuantity) // uppdatera lagersaldo
  .delete("/api/products/:id", deleteProduct);
