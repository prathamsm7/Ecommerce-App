require("dotenv").config({ path: "../.env" });

const express = require("express");
const app = express();
const connect = require("./src/config/db");
const cors = require("cors");
const path = require("path");

const usercontroller = require("./src/controllers/user.controller");
const categoryController = require("./src/controllers/category.controller");
const productController = require("./src/controllers/product");
const paymentController = require("./src/controllers/payment");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/user", usercontroller);
app.use("/api/category", categoryController);
app.use("/api/product", productController);
app.use("/api/payment", paymentController);

app.use(express.static(path.join(__dirname, "/images/")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  try {
    let connection = await connect();
    console.log(connection);
    console.log(`Listning on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
