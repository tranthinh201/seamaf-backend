const pool = require("../model/db.js");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const authController = {
  getAllUser: async function (req, res) {
    try {
      const [rows] = await pool.query("SELECT * FROM user");

      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      console.log(err);
    }
  },
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const [result, fields] = await pool.query(
          "SELECT * FROM user WHERE email = ? AND password = ?",
          [email, password]
        );
        const { password, ...other } = result;
        if (result?.length > 0) {
          res.json({
            message: "Login success",
            data: result,
          });
        } else {
          res.status(400).json({
            message: "Login fail",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const [user] = await pool.query(
        "SELECT email FROM user WHERE email = ?",
        [req.body.email]
      );

      if (user.length === 0) {
        const hashed = await bcrypt.hash(req.body.password, salt); // hash password
        const [rows] = await pool.query(
          "INSERT INTO `user`(`email`, `password`, `admin`, `username`) VALUES (?, ?, ?, ?)",
          [req.body.email, hashed, 0, req.body.username]
        );
        res.status(200).json({
          success: "Đăng ký tài khoản thành công",
        });
      } else {
        res.status(200).json({
          error: "Email đã được đăng ký!",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  registerGoogle: async (req, res) => {
    try {
      const [user] = await pool.query(
        "SELECT email FROM user WHERE email = ?",
        [req.body.email]
      );

      if (user.length === 0) {
        const [rows] = await pool.query(
          "INSERT INTO `user`(`email`, `password`, `admin`, `username`, `isGoogle`) VALUES (?, ?, ?, ?, ?)",
          [req.body.email, "", 0, req.body.username, true]
        );

        const [result, fields] = await pool.query(
          "SELECT * FROM user WHERE email = ? ",
          [req.body.email]
        );
        if (result?.length > 0) {
          res.json({
            message: "Đăng nhập thành công",
            data: result,
          });
        }
      } else {
        const [result, fields] = await pool.query(
          "SELECT * FROM user WHERE email = ? ",
          [req.body.email]
        );
        if (result?.length > 0) {
          res.json({
            message: "Đăng nhập thành công",
            data: result[0],
          });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      // Lấy thông tin người dùng từ cơ sở dữ liệu
      const [result] = await pool.query("SELECT * FROM user WHERE email = ?", [
        email,
      ]);
      if (result.length === 0) {
        res.status(401).json({ message: "Email or password is incorrect" });
        return;
      }
      const user = result[0];
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          console.error("Error comparing passwords: ", error);
          res.status(500).json({ message: "Server error" });
          return;
        }
        if (!isMatch) {
          res.status(401).json({ message: "Email or password is incorrect" });
          return;
        }

        const { password, ...noPassword } = user;

        res.status(200).json({
          data: noPassword,
        });
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
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
  update: async (req, res) => {
    const { id, admin } = req.body;

    try {
      const SQL = "UPDATE `user` SET `admin`= ? WHERE id_user = ?";
      const [rows, fields] = await pool.query(SQL, [admin, id]);
      res.status(200).json({
        data: fields,
      });
    } catch (err) {
      res.json({
        state: "error",
      });
    }
  },
};

module.exports = authController;
