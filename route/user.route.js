const express = require("express");
const Router = express.Router();

const userController = require("../controller/user.controller");

Router.get("/", userController.getAll);
Router.get("/:id", userController.getUserById);
Router.delete("/:id", userController.deleteUser);

module.exports = Router;
