const pool = require("../model/db.js");

const categoryController = {
  getAll: async (req, res, next) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM category");
      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      res.json({
        state: "error",
      });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { nameCategory } = req.body;
      console.log(nameCategory);
      const [rows] = await pool.query(
        "INSERT INTO `category`(`name_category`) VALUES (?)",
        [nameCategory]
      );
      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      res.status(500).json({
        state: "error",
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query(
        "DELETE FROM `category` WHERE category.id_category = ?",
        [id]
      );
      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      res.status(500).json({
        state: "error",
      });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query(
        "SELECT * FROM category WHERE category.id_category = ?",
        [id]
      );
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({
        state: "error",
      });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id, nameCategory } = req.body;
      console.log(id, nameCategory);
      const [rows] = await pool.query(
        "UPDATE `category` SET `name_category`= ? WHERE id_category = ?",
        [nameCategory, id]
      );
      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      res.status(500).json({
        state: "error",
      });
    }
  },
};

module.exports = categoryController;

// const  db = require("../models");

// const categoryController = {
//   getAll: async (req, res, next) => {
//       const categoris = await db.Category.findAll();
//       res.status(200).json({
//         data: categoris,
//       });

//   },
//   createCategory: async (req, res) => {
//     try {
//       const { nameCategory } = req.body;
//       const category = await db.Category.create({
//         name_category: nameCategory,
//       });
//       res.status(200).json({
//         data: category,
//       });
//     } catch (err) {
//       res.status(500).json({
//         state: "error",
//       });
//     }
//   },
//   deleteCategory: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const category = await db.Category.destroy({
//         where: {
//           id_category: id,
//         },
//       });
//       res.status(200).json({
//         data: category,
//       });
//     } catch (err) {
//       res.status(500).json({
//         state: "error",
//       });
//     }
//   },
//   getCategoryById: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const category = await db.Category.findByPk(id);
//       res.status(200).json(category);
//     } catch (err) {
//       res.status(500).json({
//         state: "error",
//       });
//     }
//   },
//   updateCategory: async (req, res) => {
//     try {
//       const { id, nameCategory } = req.body;
//       const [numOfAffectedRows, affectedRows] = await Category.update(
//         {
//           name_category: nameCategory,
//         },
//         {
//           where: {
//             id_category: id,
//           },
//           returning: true,
//         }
//       );
//       res.status(200).json({
//         data: affectedRows[0],
//       });
//     } catch (err) {
//       res.status(500).json({
//         state: "error",
//       });
//     }
//   },
// };

// module.exports = categoryController;
