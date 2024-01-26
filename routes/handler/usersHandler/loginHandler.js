const express = require("express");
const router = express.Router();
const cors = require("cors");
const connection = require("../../connection"); // Assuming you have a connection module
const CryptoJS = require("crypto-js");

router.use(cors());

router.post("/", (req, res) => {
  // Ambil data dari body request
  const { username, password } = req.body;

  const paskey = "2k29@tynk!";

  // Query ke database untuk mencocokkan username dan password
  const query = "SELECT * FROM users WHERE username = ? AND password = ?  ";
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      if (results.length > 0) {
        // Successful login, update session and send response
        const updateSession =
          "UPDATE users SET session = 1 WHERE username = ? AND password = ? ";
        connection.query(updateSession, [username, password], (error) => {
          if (error) {
            res.status(500).json({ message: error.message });
          } else {
            res
              .status(200)
              .json({ message: "Login successful. Session started." });
          }
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  });
});

module.exports = router;
