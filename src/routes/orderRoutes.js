const express = require("express");
const Order = require("../modals/orders");
const Product = require("../modals/products");
const router = express.Router();

router.post("/orders", async (req, res) => {
  try {
    const { orderId, productId, quantity } = req.body;

    if (!orderId || !productId || !quantity) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const isOrder = await Order.findOne({ orderId });

    if (isOrder) {
      return res.status(400).json({
        message: "Order already exists",
      });
    }

    const product = await Product.findOne({ productId });

    if (!product)
      return res.status(404).json({
        message: "Product not found",
      });

    if (quantity > product.availableQuantity)
      return res.status(400).json({
        message: "your quentity exceeds available quantity of product",
      });

    const order = new Order({ orderId, productId, quantity });
    await order.save();

    product.availableQuantity -= quantity;
    await product.save();

    res.status(201).json({
      message: "the order has been placed successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "something has gone wrong",
      error: error.message,
    });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
