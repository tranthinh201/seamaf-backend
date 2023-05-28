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
};

module.exports = contactController;
