const connection = require("../../connection");

function updateDataHandler(req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const kerusakan = req.body.kerusakan;
  const date_update = req.body.date_update;
  const complete = req.body.complete;

  // Query untuk melakukan update data
  const updateQuery = `UPDATE ticket SET name=?, kerusakan=?, date_update=?, complete=? WHERE id=?`;

  // Mengeksekusi query update
  connection.query(
    updateQuery,
    [name, kerusakan, date_update, complete, id],
    function (error, results) {
      if (error) {
        // Mengirim respons error jika terjadi kesalahan
        res.status(500).send(error.message);
      } else {
        // Mengirim respons berhasil jika update sukses
        res.json({
          message: "Data berhasil diupdate",
          data: { id, name, kerusakan, date_update, complete },
        });
      }
    }
  );
}

// Mengekspor fungsi agar dapat digunakan di file lain
module.exports = updateDataHandler;
