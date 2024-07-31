const express = require("express");
const Product = require("../modals/products");
const router = express.Router();

router.post("/products", async (req, res) => {
  try {
    const { productId, name, price, description, availableQuantity } = req.body;

    if (!productId || !name || !price || !availableQuantity) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const isProduct = await Product.findOne({ productId });

    if (isProduct) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }

    const product = new Product({
      productId,
      name,
      price,
      description,
      availableQuantity,
    });
    await product.save();

    res.status(201).json({
      message: "the product created successFully",
      product,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/products/:productId", async (req, res) => {
  try {
    const product = await Product.findOne({
      productId: req.params.productId,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      message: "product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
