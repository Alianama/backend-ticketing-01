const connection = require("../../connection");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const paskey = process.env.PASSKEY;

function generateID(prefix) {
  const randomNumber = Math.floor(Math.random() * 1000); // You can adjust the range based on your needs
  return `${prefix}_${Date.now()}_${randomNumber}`;
}

function postdatahandler(req, res) {
  // Mengambil data dari body request
  const { id, name, kerusakan, date_update, complete } = req.body;

  // Encrypting kerusakan field using AES encryption
  const AesKerusakan = CryptoJS.AES.encrypt(kerusakan, paskey).toString();

  // Query untuk menambahkan data ke tabel 'ticket' dengan ID baru
  const query = `INSERT INTO ticket (id, name, kerusakan, date_update, complete) VALUES (?, ?, ?, ?, ?)`;

  const idNew = generateID("Ticket");

  // Menjalankan query dengan parameter yang disediakan
  connection.query(
    query,
    [id, name, AesKerusakan, date_update, complete],
    function (error, results, fields) {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.json({ message: "Data berhasil ditambahkan!", data: results });
      }
    }
  );
}

module.exports = postdatahandler;
