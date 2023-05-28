const pool = require("../model/db.js");

const productsController = {
  getLates: async (req, res, next) => {
    try {
      const [rows, fields] = await pool.query(
        "SELECT * FROM product, category, image WHERE product.category_id = category.id_category AND product.id_product = image.id_product AND product.outstanding = 1 GROUP BY product.id_product ORDER BY(createdAt) DESC LIMIT 6"
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
  getAllProduct: async (req, res, next) => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM product, category, image WHERE product.category_id = category.id_category AND product.id_product = image.id_product GROUP BY product.id_product"
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

  getDetailProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const [rows, fields] = await pool.query(
        "SELECT product.*, category.*, GROUP_CONCAT(image.path SEPARATOR ',') AS path FROM  product INNER JOIN category ON product.category_id = category.id_category INNER JOIN image ON product.id_product = image.id_product WHERE  product.id_product = ? GROUP BY  product.id_product",
        [id]
      );
      res.json({
        data: rows,
      });
    } catch (e) {
      res.json({
        state: "error",
      });
    }
  },

  createProduct: async (req, res) => {
    const date = new Date();
    const { name, price, description, quantity, outstanding, categoryId } =
      req.body;
    const thumbnail = req.files;
    const [result, err] = await pool.query(
      `INSERT INTO product(name, price, quantity, description, outstanding, category_id, thumbnail, new, sale, updatedAt, createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        name,
        price,
        quantity,
        description,
        outstanding,
        categoryId,
        thumbnail && thumbnail[0]?.path,
        1,
        1,
        date,
        date,
      ]
    );
    if (err) {
      console.log(err);
    } else {
      if (thumbnail) {
        thumbnail.slice(1).map((image) => {
          pool.query("INSERT INTO image(id_product, path) VALUES (?, ?)", [
            result.insertId,
            image?.path,
          ]);
        });
        res.status(200).json({
          message: "Insert success!",
        });
      }
    }
  },
  updatedProduct: async (req, res) => {
    const date = new Date();
    const { id, name, price, description, quantity, outstanding, categoryId } =
      req.body;
    const thumbnail = req.files;
    const [result, err] = await pool.query(
      `UPDATE product SET name = ?, price = ?, quantity = ?, description = ?, outstanding = ?, thumbnail = ?, category_id = ?, updatedAt = ?, createdAt = ? WHERE id_product = ?`,
      [
        name,
        price,
        quantity,
        description,
        outstanding,
        thumbnail[0].path,
        categoryId,
        date,
        date,
        id,
      ]
    );
    if (err) {
      console.log(err);
    } else {
      if (thumbnail) {
        thumbnail.slice(1).map((image) => {
          pool.query("INSERT INTO image(id_product, path) VALUES (?, ?)", [
            id,
            image?.path,
          ]);
        });
      }
      res.status(200).json({
        message: "Update success!",
      });
    }
  },

  searchProduct: async (req, res) => {
    const name = req.body.name;
    const SQL = `SELECT product.id_product, product.name, image.path FROM product, image WHERE image.id_product = product.id_product AND product.name LIKE '%${name}%' GROUP BY product.id_product`;

    const [result, err] = await pool.query(SQL);
    if (result) {
      res.status(200).json({
        data: result,
      });
    } else {
      res.status(200).json({
        data: err,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const SQL = "DELETE FROM `product` WHERE id_product = ?";
      const [result, err] = await pool.query(SQL, [id]);
      if (err) {
        console.log(err);
      } else {
        await pool.query("DELETE FROM `image` WHERE id_product = ?", [id]);
        res.status(200).json({
          data: "Delete success!",
        });
      }
    } catch (err) {
      res.status(500).json({
        state: "error",
      });
    }
  },
  deleteImageProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const SQL = "DELETE FROM `image` WHERE id_image = ?";
      const [result, err] = await pool.query(SQL, [id]);
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: "Delete success",
        });
      }
    } catch (err) {
      res.status(500).json({
        state: "error",
      });
    }
  },
  getImageProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const SQL = "SELECT * FROM `image` WHERE id_product = ?";
      const [result, err] = await pool.query(SQL, [id]);

      res.json({
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        state: "error",
      });
    }
  },
  getByCategory: async (req, res) => {
    try {
      const { id } = req.body;

      const SQL =
        "SELECT * FROM product, category WHERE product.category_id = category.id_category AND category.id_category = ?";
      const [result, err] = await pool.query(SQL, [id]);

      res.json({
        data: result,
      });
    } catch (e) {
      res.status(500).json({
        message: "ERROR",
      });
    }
  },
};

module.exports = productsController;

// const db = require("../models");

// const productsController = {
//   getAll: async (req, res, next) => {
//     try {
//       const products = await db.Product.findAll({
//         limit: 8,
//       });
//       res.status(200).json({
//         data: products,
//       });
//     } catch (err) {
//       res.json({
//         state: "error",
//       });
//     }
//   },
//   getAllProduct: async (req, res, next) => {
//     const products = await db.Product.findAll({
//       include: [
//         {
//           model: db.Category,
//           required: true,
//         },
//       ],
//     });
//     res.status(200).json({
//       data: products,
//     });
//   },
//   getDetailProduct: async (req, res) => {
//     try {
//       const id = req.params.id;
//       const product = await db.Product.findByPk(id);
//       res.json({
//         data: product,
//       });
//     } catch (e) {
//       res.json({
//         state: "error",
//       });
//     }
//   },
//   getLatesProduct: async (req, res) => {
//     try {
//       const products = await db.Product.findAll({
//         order: [["createdAt", "DESC"]],
//         limit: 6,
//       });
//       res.status(200).json({
//         data: products,
//       });
//     } catch (err) {
//       res.json({
//         state: "error",
//       });
//     }
//   },
//   createProduct: async (req, res) => {
//     const date = new Date();
//     const { name, price, description, quantity, outstanding, categoryId } =
//       req.body;
//     const thumbnail = req.file;
//     const product = await db.Product.create({
//       name: name,
//       price: price,
//       thumbnail: thumbnail.path,
//       quantity: quantity,
//       description: description,
//       outstanding: outstanding,
//       new: true,
//       sale: true,
//       updatedAt: date,
//       createdAt: date,
//       categoryId: categoryId,
//     });
//     res.status(200).json({
//       data: product,
//     });
//   },
//   updatedProduct: async (req, res) => {
//     const date = new Date();
//     console.log(req.body);
//     try {
//       const {
//         id,
//         name,
//         price,
//         description,
//         quantity,
//         outstanding,
//         newsp,
//         sale,
//       } = req.body;
//       const thumbnail = req.file;
//       const product = await db.Product.update(
//         {
//           name: name,
//           price: price,
//           thumbnail: thumbnail?.path,
//           quantity: quantity,
//           description: description,
//           outstanding: outstanding,
//           new: true,
//           sale: sale,
//           updatedAt: date,
//         },
//         {
//           where: {
//             id: id,
//           },
//         }
//       );
//       console.log(req.body);
//       res.status(200).json({
//         data: product,
//       });
//     } catch (err) {
//       res.status(500).json({
//         state: "error",
//       });
//     }
//   },
//   searchProduct: async (req, res) => {
//     try {
//       const name = req.body.name;
//       const products = await db.Product.findAll({
//         where: {
//           name: name,
//         },
//       });
//       res.status(200).json({
//         data: products,
//       });
//     } catch (err) {
//       res.status(500).json({
//         state: "error",
//       });
//     }
//   },
// };

// module.exports = productsController;
