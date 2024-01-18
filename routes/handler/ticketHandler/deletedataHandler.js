const connection = require("../../connection");

function deletedataHandler(req, res) {
  const id = req.params.id;

  // Periksa apakah data dengan ID yang diberikan ada sebelum dihapus
  const checkQuery = "SELECT * FROM ticket WHERE id = ?";
  connection.query(checkQuery, [id], function (checkError, checkResults) {
    if (checkError) {
      res.status(500).send(checkError.message);
    } else {
      if (checkResults.length === 0) {
        // Data dengan ID yang diberikan tidak ditemukan

        res.status(404).send({ message: "Data not found." });
      } else {
        // Lanjutkan untuk menghapus data
        const deleteQuery = "DELETE FROM ticket WHERE id = ?";
        connection.query(deleteQuery, [id], function (error, results) {
          if (error) {
            res.status(500).send(error.message);
          } else {
            res.json({ message: "Data berhasil dihapus", data: results });
          }
        });
      }
    }
  });
}

module.exports = deletedataHandler;
