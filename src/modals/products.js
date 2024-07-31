const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: [true],
  },
  name: {
    type: String,
    required: [true],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minlength: [10, "Description must be at least 10 characters long"],
  },
  availableQuantity: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
