const connection = require("../../connection");

function getdataHandler(req, res, next) {
  // Query ke database untuk mendapatkan semua data dari tabel
  const query = "SELECT * FROM ticket ";

  connection.query(query, function (error, results, fields) {
    // Menutup koneksi setelah query selesai

    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
}

module.exports = getdataHandler;
