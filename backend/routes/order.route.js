import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/order.controller.js";

const orderrouter = Router();

// Routes
orderrouter.post("/create-order", createOrder);
orderrouter.get("/getOrders", getOrders);
orderrouter.get("/:id", getOrderById);
orderrouter.patch("/:id", updateOrder);
orderrouter.delete("/:id", deleteOrder);

export default orderrouter;
