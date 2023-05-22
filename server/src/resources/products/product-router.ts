import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product-controller";

const productRouter = express
  .Router()
  .get("/api/products", getAllProducts)
  .get("/api/products/:id", getProductById)
  .post("/api/products", createProduct) //add?
  .put("/api/products/:id", updateProduct)
  // .put("/api/products/:id", productQuantity) // uppdatera lagersaldo, men går under updateProduct
  .delete("/api/products/:id", deleteProduct);

export default productRouter;
