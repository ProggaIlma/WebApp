import Product from "../models/product.model.js"
import { PaginationHelper } from "../utils/helpers/pagination.helper.js";
import mongoose from "mongoose";

const createProduct = async (req, res) => {
    try {
      const { name, description, price, categoryId, images, stock } = req.body;
  
      // Basic input validation
      if (!name || !description || !price || !categoryId || stock == null) {
        return res.status(400).json({ error: "All required fields must be provided." });
      }
  
     
      const product = await Product.create({
        name,
        description,
        price,
        categoryId,
        images,
        stock,
      });
  
      return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
      console.error("Product Creation Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  const getProducts = async (req, res) => {
    try {
      const p_info = {
        page: req.query.page,
        pageSize: req.query.limit || req.query.pageSize, // support both terms
      };
  
      const filter = {}; // You can add search filters here later
  
      const pagination = PaginationHelper.createPaginationFilter(filter, p_info);
  
      if (Array.isArray(pagination)) {
        return res.status(400).json({
          code: 400,
          status: 'BAD_REQUEST',
          errors: pagination,
        });
      }
  
      const { offset, limit, where, page } = pagination;
  
      const [products, total] = await Promise.all([
        Product.find(where).skip(offset).limit(limit),
        Product.countDocuments(where),
      ]);
  
      const response = PaginationHelper.prepareResponse(products, page, limit, total);
  
      return res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({
        code: 500,
        status: 'INTERNAL_SERVER_ERROR',
        error: 'Failed to fetch products',
      });
    }
  };
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product Deletion Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update fields
    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    await product.save();

    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Product Update Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getProductById = async (req, res) => {
  const { id } = req.params;

  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
  export  {createProduct, getProducts,deleteProduct,updateProduct,getProductById};