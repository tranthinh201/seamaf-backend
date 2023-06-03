const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");

const productRoute = require("./route/product.route");
const authRoute = require("./route/auth.route");
const cartRoute = require("./route/cart.route");
const categoryRoute = require("./route/category.route");
const contactRoute = require("./route/contact.route");

const cookieParser = require("cookie-parser");

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/product", productRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/user", authRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/category", categoryRoute);

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
