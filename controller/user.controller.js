const pool = require("../model/db.js");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM user");
      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      res.json({
        state: "error",
      });
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const SQL = "DELETE FROM `user` WHERE id_user = ?";
      await pool.query(SQL, [id]);
      res.status(200).json({
        message: "Delete success!",
      });
    } catch (err) {
      res.json({
        state: "error",
      });
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const SQL = "SELECT * FROM user WHERE id_user = ?";
      const [rows, fields] = await pool.query(SQL, [id]);
      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      res.json({
        state: "error",
      });
    }
  },
};

module.exports = userController;
