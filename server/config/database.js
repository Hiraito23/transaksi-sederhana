const mysql = require("mysql");

const koneksi = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "modul_penjualan",
  password: "password",
});

koneksi.connect((err) => {
  if (err) throw err;
  console.log("MySQL running...");
});

module.exports = koneksi;
