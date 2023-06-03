const pool = require("../model/db.js");
const MailUtils = require("../utils/mail.js");

const contactController = {
  createContact: async (req, res) => {
    try {
      const date = new Date();
      const { email, subject, message } = req.body;
      const SQL = `INSERT INTO contact(email, subject, message, createdAt) VALUES (?, ?, ?, ?)`;
      const [result, err] = await pool.query(SQL, [
        email,
        subject,
        message,
        date,
      ]);

      if (err) {
        console.log(err);
      } else {
        await MailUtils.getInstance().sendMailInfor(email, subject, message);
        res.status(200).json({
          message: "Send mail success!",
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  getContact: async (req, res) => {
    try {
      const SQL = "SELECT * FROM contact";
      const [rows, fields] = await pool.query(SQL);
      res.status(200).json({
        data: rows,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getContactById: async (req, res) => {
    try {
      const { id } = req.params;

      const SQL = "SELECT * FROM contact WHERE id_contact = ?";
      const [rows, fields] = await pool.query(SQL, [id]);
      res.status(200).json({
        data: rows[0],
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = contactController;
