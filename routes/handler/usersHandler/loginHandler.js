const express = require("express");
const router = express.Router();
const cors = require("cors");
const connection = require("../../connection"); // Assuming you have a connection module

router.use(cors());

router.post("/", (req, res) => {
  // Ambil data dari body request
  const { username, password } = req.body;

  // Query ke database untuk mencocokkan username dan password
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  });
});

// Tambahkan rute API lainnya di sini...

module.exports = router;
