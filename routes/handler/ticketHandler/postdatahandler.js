const connection = require("../../connection");

function postdatahandler(req, res) {
  // Membuat koneksi ke database

  // Mengambil data dari body request
  const { id, name, kerusakan, date_update, complete } = req.body;

  // Membuka koneksi ke database

  // Query untuk menambahkan data ke tabel 'ticket'
  const query = `INSERT INTO ticket (id, name, kerusakan, date_update, complete) VALUES (?, ?, ?, ?, ?)`;

  // Menjalankan query dengan parameter yang disediakan
  connection.query(
    query,
    [id, name, kerusakan, date_update, complete],
    function (error, results, fields) {
      // Menutup koneksi setelah query selesai

      if (error) {
        res.status(500).send(error.message);
      } else {
        res.json({ message: "Data berhasil ditambahkan!", data: results });
      }
    }
  );
}

module.exports = postdatahandler;
