const express = require("express");
const router = express.Router();
const cors = require("cors");
const connection = require("../../connection");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const paskey = process.env.PASSKEY;

router.use(cors());

function loginHandler(req, res) {
  const { username, password } = req.body;

  const queryPassword = "SELECT password FROM users WHERE username = ?";
  connection.query(queryPassword, [username], (error, results) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (results.length > 0) {
      const decryptedPassword = CryptoJS.AES.decrypt(
        results[0].password,
        paskey
      ).toString(CryptoJS.enc.Utf8);

      if (password === decryptedPassword) {
        const updateSession = "UPDATE users SET session = 1 WHERE username = ?";
        connection.query(updateSession, [username], (error) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }

          return res
            .status(200)
            .json({ message: "Login successful. Session started." });
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(401).json({ message: "User not found" });
    }
  });
}

module.exports = loginHandler;
