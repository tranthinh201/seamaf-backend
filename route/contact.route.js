const express = require("express");
const Router = express.Router();

const contactController = require("../controller/contact");

Router.post("/", contactController.createContact);
Router.get("/:id", contactController.getContactById);
Router.get("/", contactController.getContact);

module.exports = Router;
