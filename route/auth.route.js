const express = require("express");
const Router = express.Router();

const authController = require("../controller/auth.controller");
Router.get("/", authController.getAllUser);
Router.post("/login", authController.loginUser);
Router.post("/register", authController.registerUser);
Router.post("/register-google", authController.registerGoogle);
Router.get("/:id", authController.getUserById);
Router.delete("/:id", authController.deleteUser);
Router.put("/update", authController.update);

module.exports = Router;
