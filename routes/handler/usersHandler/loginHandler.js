const express = require("express");
const router = express.Router();
const cors = require("cors");
const connection = require("../../connection"); // Assuming you have a connection module
const CryptoJS = require("crypto-js");

router.use(cors());

router.post("/login", (req, res) => {
  // Ambil data dari body request
  const { username, password } = req.body;

  const paskey = "2k29@tynk!";
  passwordHash = CryptoJS.AES.encrypt(password, paskey).toString();

  const queryPassword = `SELECT password FROM users WHERE username = ?`;
  connection.query(queryPassword, [username], (error, results) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (results.length > 0) {
      const decryptedPasswords = results.map((result) => {
        return CryptoJS.AES.decrypt(result.password, paskey).toString(
          CryptoJS.enc.Utf8
        );
      });

      // Pilih salah satu decrypted password (misalnya, yang pertama)
      const decryptedPassword = decryptedPasswords[0];

      // Query ke database untuk mencocokkan username dan password
      const query = "SELECT * FROM users WHERE username = ? ";
      connection.query(query, [username], (error, results) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }

        if (results.length > 0) {
          if (password === decryptedPassword) {
            // Successful login, update session and send response
            const updateSession =
              "UPDATE users SET session = 1 WHERE username = ? AND password = ? ";
            connection.query(
              updateSession,
              [username, decryptedPassword],
              (error) => {
                if (error) {
                  return res.status(500).json({ message: error.message });
                }

                return res
                  .status(200)
                  .json({ message: "Login successful. Session started." });
              }
            );
          } else {
            return res.status(401).json({ message: "Invalid credentials" });
          }
        }
      });
    } else {
      return res.status(401).json({ message: "User not found" });
    }
  });
});

module.exports = router;
