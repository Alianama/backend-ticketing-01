const express = require("express");
const router = express.Router();
const connection = require("../../connection");
const cors = require("cors");

// Enable CORS for all routes in this router
router.use(cors());

router.post("/", (req, res) => {
  // Assume you have a middleware or function to authenticate the user,
  // and you have the user's ID stored in req.userId
  const { username, password } = req.body;

  if (!username) {
    // User is not authenticated
    return res.status(401).json({ session: 0 });
  }

  // Query the database to get the user's session status
  const query = "SELECT session FROM users WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      if (results.length > 0) {
        res.status(200).json({ session: results[0].session });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  });
});

module.exports = router;
