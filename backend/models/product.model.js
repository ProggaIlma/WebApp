import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
   
    },
    images: {
      type: [String],
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("product", productSchema);

export default Product;
