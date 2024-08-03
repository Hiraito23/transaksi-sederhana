const koneksi = require("../../config/database");
const {
  queryProducts,
  queryAddProducts,
  queryDeleteProducts,
  queryUpdateProducts,
} = require("./products.repository");

const productService = () => {
  return new Promise((resolve, reject) => {
    const query = queryProducts();

    koneksi.query(query, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const addProductService = (reqBody) => {
  return new Promise((resolve, reject) => {
    const query = queryAddProducts();
    const params = [
      reqBody.nama_product,
      reqBody.deskripsi,
      reqBody.harga,
      // reqBody.stock,
    ];

    koneksi.query(query, params, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const deleteProductService = (reqId) => {
  return new Promise((resolve, reject) => {
    const query = queryDeleteProducts();

    koneksi.query(query, reqId, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const updateProductService = (reqBody, reqId) => {
  return new Promise((resolve, reject) => {
    const query = queryUpdateProducts();
    const params = [
      reqBody.nama_product,
      reqBody.deskripsi,
      reqBody.harga,
      // reqBody.stock,
      reqId,
    ];

    koneksi.query(query, params, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  productService,
  addProductService,
  deleteProductService,
  updateProductService,
};
