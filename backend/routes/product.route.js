import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById
} from "../controllers/product.controller.js";

const productrouter = Router();

// Routes
productrouter.post("/create-product", createProduct);
productrouter.get("/getProducts", getProducts);
productrouter.get("/:id", getProductById);
productrouter.patch("/:id", updateProduct);
productrouter.delete("/:id", deleteProduct);

export default productrouter;
