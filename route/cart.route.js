const express = require("express");
const Router = express.Router();

const cartController = require("../controller/cart.controller");

Router.post("/", cartController.addToCart);
Router.post("/getCart", cartController.getCart);
Router.delete("/delete/:id", cartController.deleteProductCart);
Router.post("/increase/:id", cartController.updateCartItemIncrease);
Router.post("/decrease/:id", cartController.updateCartItemDecrease);

module.exports = Router;
