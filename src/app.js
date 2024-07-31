// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productsRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api", productRoutes);
app.use("/api", orderRoutes);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🥲 Shutting Down.....");
  console.log(err.name, err.message);
  process.exit(1);
});

const serevr = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/task2", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Task2 MongoDB connected");

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT} ......`);
    });

    process.on("unhandledRejection", (err) => {
      console.log("UNHANDLED REJECTION! 🥲 Shutting Down.....");
      console.log(err.name, err.message);
      serevr.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.error("error while connecting to MongoDB", err);
  }
};

serevr();
