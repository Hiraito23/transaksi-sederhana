const koneksi = require("../../config/database");
const {
  queryShowCustomers,
  queryAddCustomer,
  queryDeleteCustomer,
  queryUpdateCustomer,
} = require("./customer.repository");

const customerService = () => {
  return new Promise((resolve, reject) => {
    const query = queryShowCustomers();

    koneksi.query(query, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const addCustomerService = (reqBody) => {
  return new Promise((resolve, reject) => {
    const query = queryAddCustomer();
    const params = [reqBody.nama_customer, reqBody.alamat, reqBody.no_telpon];

    koneksi.query(query, params, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const deleteCustomerService = (reqId) => {
  return new Promise((resolve, reject) => {
    const query = queryDeleteCustomer();

    koneksi.query(query, [reqId], (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const updateCustomerService = (reqBody, reqId) => {
  return new Promise((resolve, reject) => {
    const query = queryUpdateCustomer();
    const params = [
      reqBody.nama_customer,
      reqBody.alamat,
      reqBody.no_telpon,
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
  customerService,
  addCustomerService,
  deleteCustomerService,
  updateCustomerService,
};
