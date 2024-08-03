const queryShowCustomers = () => {
  return `SELECT * FROM customer`;
};

const queryAddCustomer = () => {
  return `INSERT INTO customer (nama_customer, alamat, no_telpon) VALUES (?, ?, ?)`;
};

const queryDeleteCustomer = () => {
  return `DELETE FROM customer WHERE id_customer = ?`;
};

const queryUpdateCustomer = () => {
  return `UPDATE customer SET nama_customer = ?, alamat = ?, no_telpon = ? WHERE id_customer = ?`;
};

module.exports = {
  queryShowCustomers,
  queryAddCustomer,
  queryDeleteCustomer,
  queryUpdateCustomer,
};
