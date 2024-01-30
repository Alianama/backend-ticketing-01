const express = require("express");
const connection = require("../../connection");
const router = express.Router();
const CryptoJS = require("crypto-js");
const paskey = "2k29@tynk!";

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  passwordHash = CryptoJS.AES.encrypt(password, paskey).toString();

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

  connection.query(
    query,
    [username, passwordHash],
    function (error, results, fields) {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.json({ message: "Registrasi berhasil", data: results });
      }
    }
  );
});

module.exports = router;
