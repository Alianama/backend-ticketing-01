const express = require("express");
const connection = require("../../connection");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const paskey = process.env.PASSKEY;

function registerHandler(req, res) {
  const { username, password } = req.body;

  // Check if the username already exists
  const checkUsernameQuery =
    "SELECT COUNT(*) as count FROM users WHERE username = ?";
  connection.query(checkUsernameQuery, [username], function (error, results) {
    if (error) {
      return res.status(500).send(error.message);
    }

    const usernameCount = results[0].count;

    if (usernameCount > 0) {
      // Username already exists, send a response
      return res.status(400).json({ message: "Username already exists" });
    } else {
      // Encrypt the password
      const passwordHash = CryptoJS.AES.encrypt(password, paskey).toString();

      // Insert the user into the database
      const insertUserQuery =
        "INSERT INTO users (username, password) VALUES (?, ?)";
      connection.query(
        insertUserQuery,
        [username, passwordHash],
        function (error, results, fields) {
          if (error) {
            return res.status(500).send(error.message);
          }

          res.json({ message: "Registrasi berhasil", data: results });
        }
      );
    }
  });
}

module.exports = registerHandler;
