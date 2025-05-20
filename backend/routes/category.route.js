import { Router } from "express";
import { createCategory,getCategoryById,getAllCategories,updateCategory,
  deleteCategory } from "../controllers/category.controller.js";

const categoryrouter = Router();

// Routes
categoryrouter.post("/create-category", createCategory);
categoryrouter.get("/getCategories", getAllCategories);
categoryrouter.get("/:id", getCategoryById);
categoryrouter.patch("/:id", updateCategory);
categoryrouter.delete("/:id", deleteCategory);

export default categoryrouter;
