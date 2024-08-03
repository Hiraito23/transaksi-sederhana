const queryProducts = () => {
  return `SELECT * FROM product ORDER BY id_product DESC`;
};

const queryAddProducts = () => {
  return `INSERT INTO product (nama_product, deskripsi, harga) VALUES (?, ?, ?)`;
};

const queryDeleteProducts = () => {
    return `DELETE FROM product WHERE id_product = ?`
}

const queryUpdateProducts = () => {
    return `UPDATE product SET nama_product = ?, deskripsi = ?, harga = ? WHERE id_product = ?`
}

module.exports = {
  queryProducts,
  queryAddProducts,
  queryDeleteProducts,
  queryUpdateProducts
};
