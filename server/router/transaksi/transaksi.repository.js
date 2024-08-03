const queryTransaksi = () => {
  return `SELECT * FROM transaksi ORDER BY id_transaksi DESC`;
};

const queryAddTransaksi = () => {
  return `INSERT INTO transaksi (nama_product, nama_customer, harga_beli, diskon_rupiah, total_pembelian, create_at) VALUES (?, ?, ?, ?, ?, ?)`;
};

const queryDeleteTransaksi = () => {
  return `DELETE FROM transaksi WHERE id_transaksi = ?`;
};

module.exports = {
  queryTransaksi,
  queryAddTransaksi,
  queryDeleteTransaksi,
};
