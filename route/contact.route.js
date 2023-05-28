const express = require("express");
const Router = express.Router();

const contactController = require("../controller/contact");

Router.post("/", contactController.createContact);

module.exports = Router;
