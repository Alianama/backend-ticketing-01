const connection = require("../../connection");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const paskey = process.env.PASSKEY;

function getdataHandler(req, res, next) {
  // Query ke database untuk mendapatkan semua data dari tabel
  const query = "SELECT * FROM ticket ";

  connection.query(query, function (error, results, fields) {
    if (error) {
      res.status(500).send(error.message);
    } else {
      // Decrypt the 'kerusakan' field for each result
      const decryptedResults = results.map((result) => {
        const decryptedKerusakan = CryptoJS.AES.decrypt(
          result.kerusakan,
          paskey
        ).toString(CryptoJS.enc.Utf8);
        return { ...result, kerusakan: decryptedKerusakan };
      });

      res.json(decryptedResults);
    }
  });
}

module.exports = getdataHandler;
