const koneksi = require("../../config/database");
const { queryTransaksi, queryAddTransaksi, queryDeleteTransaksi } = require("./transaksi.repository");

const transaksiService = () => {
  return new Promise((resolve, reject) => {
    const query = queryTransaksi();

    koneksi.query(query, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const addTransaksiService = (reqBody) => {
    return new Promise((resolve, reject) => {
      const query = queryAddTransaksi();
      const params = [
        reqBody.nama_product,
        reqBody.nama_customer,
        reqBody.harga_beli,
        reqBody.diskon_rupiah,
        reqBody.total_pembelian,
        reqBody.create_at,
      ];
  
      koneksi.query(query, params, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  };

const deleteTransaksiService = (reqId) => {
  return new Promise((resolve, reject) => {
    const query = queryDeleteTransaksi();

    koneksi.query(query, reqId, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  transaksiService,
  addTransaksiService,
  deleteTransaksiService,
};
