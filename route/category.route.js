const express = require("express");
const Router = express.Router();

const categoryController = require("../controller/category.controller");

Router.get("/", categoryController.getAll);
Router.post("/", categoryController.createCategory);
Router.delete("/:id", categoryController.deleteCategory);
Router.get("/getId/:id", categoryController.getCategoryById);
Router.post("/update", categoryController.updateCategory);
module.exports = Router;
