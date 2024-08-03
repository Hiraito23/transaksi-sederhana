const express = require("express");
const {
  transaksiService,
  deleteTransaksiService,
  addTransaksiService,
} = require("./transaksi.service");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await transaksiService();
    res.json({
      success: true,
      message: "Get data transaksi success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Get data transaksi failed",
    });
  }
});

router.post("/", async (req, res) => {
    const { nama_product, nama_customer, deskripsi, harga, stock, harga_beli, diskon_rupiah, total_pembelian, create_at } = req.body;
    const reqBody = {
      nama_product, 
      nama_customer,
      harga_beli,
      diskon_rupiah,
      total_pembelian,
      create_at,
    };
    try {
      const data = await addTransaksiService(reqBody);
      res.json({
        success: true,
        message: "Post data transaksi success",
        data: data,
      });
    } catch (err) {
    //   console.error('Error adding transaksi:', err);  
      res.status(400).json({
        success: false,
        message: "Post data transaksi failed",
        error: err.message 
      });
    }
  });

router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  try {
    await deleteTransaksiService(reqId);
    res.json({
      success: true,
      message: "Delete data transaksi success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Delete data transaksi failed",
    });
  }
});

module.exports = router;
