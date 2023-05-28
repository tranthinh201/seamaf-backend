const express = require("express");
const Router = express.Router();
const uploadCloud = require("../config/cloudinaty.config");

const productsController = require("../controller/product.controller");

Router.get("/getLatesProduct", productsController.getLates);
Router.get("/getAll", productsController.getAllProduct);
Router.get("/getDetail/:id", productsController.getDetailProduct);

Router.post(
  "/create",
  uploadCloud.array("thumbnail[]"),
  productsController.createProduct
);

Router.post("/find", productsController.searchProduct);

Router.put(
  "/update",
  uploadCloud.array("thumbnail[]"),
  productsController.updatedProduct
);

Router.get("/getImageProduct/:id", productsController.getImageProduct);
Router.delete("/deleteImageProduct/:id", productsController.deleteImageProduct);

Router.delete("/delete/:id", productsController.deleteProduct);
Router.post("/getByCategory", productsController.getByCategory);

module.exports = Router;
