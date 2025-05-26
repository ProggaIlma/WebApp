import Order from "../models/order.model.js";
import { PaginationHelper } from "../utils/helpers/pagination.helper.js";
import mongoose from "mongoose";

const createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!userId || !items?.length || !shippingAddress || !paymentMethod || totalAmount == null) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    return res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const p_info = {
      page: req.query.page,
      pageSize: req.query.limit || req.query.pageSize,
    };

    const filter = {}; // Extend later with userId or status filters

    const pagination = PaginationHelper.createPaginationFilter(filter, p_info);

    if (Array.isArray(pagination)) {
      return res.status(400).json({
        code: 400,
        status: "BAD_REQUEST",
        errors: pagination,
      });
    }

    const { offset, limit, where, page } = pagination;

    const [orders, total] = await Promise.all([
      Order.find(where).skip(offset).limit(limit),
      Order.countDocuments(where),
    ]);

    const response = PaginationHelper.prepareResponse(orders, page, limit, total);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      code: 500,
      status: "INTERNAL_SERVER_ERROR",
      error: "Failed to fetch orders",
    });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid order ID format" });
  }

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    Object.keys(updates).forEach((key) => {
      order[key] = updates[key];
    });

    await order.save();

    return res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Order Update Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Order Deletion Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
