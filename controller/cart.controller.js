const pool = require("../model/db.js");

const cartController = {
  checkCartItem: async (userId, productId) => {
    const [rows] = await pool.query(
      "SELECT * FROM cart, product WHERE product.id_product = cart.id_product AND  cart.id_user = ? AND product.id_product = ?",
      [userId, productId]
    );
    return rows;
  },

  checkQuantityProduct: async (productId) => {
    try {
      const [rows] = await pool.query(
        "SELECT quantity FROM product WHERE id_product = ?",
        [productId]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  },
  checkQuantityCart: async (idCart) => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM cart, product WHERE product.id_product = cart.id_product AND id_cart = ?",
        [idCart]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  },

  updateCartItem: async (userId, productId) => {
    try {
      await pool.query(
        "UPDATE cart SET quantityCart = quantityCart + 1 WHERE id_user = ? AND id_product = ?",
        [userId, productId]
      );
    } catch (error) {
      console.log(error);
    }
  },

  getCartByIdUser: async (userId, productId) => {
    try {
      await pool.query(
        "SELECT * FROM cart WHERE cart.id_user = ? AND cart.id_product = ? ",
        [userId, productId]
      );
    } catch (error) {
      console.log(error);
    }
  },

  addCartItem: async (userId, productId) => {
    const createdAt = new Date();
    try {
      await pool.query(
        "INSERT INTO cart (id_user, id_product, quantityCart, createdAt) VALUES (?, ?, 1, ?)",
        [userId, productId, createdAt]
      );
    } catch (error) {
      console.log(error);
    }
  },
  addToCart: async (req, res) => {
    try {
      const { idProduct, idUser } = req.body;
      console.log(idUser, idProduct);
      const cartItem = await cartController.checkCartItem(idUser, idProduct);
      if (cartItem.length > 0) {
        if (cartItem[0].quantity <= cartItem[0].quantityCart) {
          res.status(200).json({
            message: "Sản phẩm trong cửa hàng đã hết!",
          });
        } else {
          await cartController.updateCartItem(idUser, idProduct);
          res.json({
            success: "Update success",
          });
          console.log("Update!");
        }
      } else {
        console.log("Insert!");
        await cartController.addCartItem(idUser, idProduct);
        res.json({
          success: "Insert success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getCart: async (req, res) => {
    try {
      const { idUser } = req.body;

      const [rows, fields] = await pool.query(
        "SELECT cart.id_cart, image.path, cart.quantityCart, product.name, product.price, product.quantity FROM `cart`, `product`, `image`, `user` WHERE cart.id_product = product.id_product AND product.id_product = image.id_product AND user.id_user = cart.id_user AND user.id_user = ?  GROUP BY product.id_product",
        [idUser]
      );
      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      res.json({
        state: "error",
      });
    }
  },

  deleteProductCart: async (req, res) => {
    try {
      const { id } = req.params;

      const [rows, fields] = await pool.query(
        "DELETE FROM `cart` WHERE id_cart = ?",
        [id]
      );
      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      res.json({
        state: "error",
      });
    }
  },

  updateCartItemIncrease: async (req, res) => {
    try {
      const { id } = req.params;
      const checkQuantity = await cartController.checkQuantityCart(id);
      if (checkQuantity[0].quantity <= checkQuantity[0].quantityCart) {
        res.status(200).json({
          message: "Sản phẩm trong cửa hàng đã hết!",
        });
      } else {
        const [rows] = await pool.query(
          "UPDATE cart SET quantityCart = quantityCart + 1 WHERE id_cart = ?",
          [id]
        );
        res.status(200).json({
          data: rows,
        });
      }
    } catch (error) {
      req.json({
        error: error,
      });
    }
  },

  updateCartItemDecrease: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const [rows] = await pool.query(
        "UPDATE cart SET quantityCart = quantityCart - 1 WHERE id_cart = ?",
        [id]
      );
      res.status(200).json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = cartController;
