const express = require("express");
const {
  productService,
  addProductService,
  deleteProductService,
  updateProductService,
} = require("./products.service");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await productService();
    res.json({
      success: true,
      message: "Get data products success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      succes: false,
      message: "Get data products failed",
      err: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { nama_product, deskripsi, harga } = req.body;
  const reqBody = { nama_product, deskripsi, harga };

  try {
    await addProductService(reqBody);
    res.json({
      success: true,
      message: "Post data products success",
    });
  } catch (err) {
    res.status(400).json({
      succes: false,
      message: "Post data products failed",
      err: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;

  try {
    await deleteProductService(reqId);
    res.json({
      success: true,
      message: "Delete data products success",
    });
  } catch (err) {
    res.status(400).json({
      succes: false,
      message: "Delete data products failed",
      err: err.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const reqId = req.params.id;
  const { nama_product, deskripsi, harga, stock } = req.body;
  const reqBody = { nama_product, deskripsi, harga };

  try {
    await updateProductService(reqBody, reqId);
    res.json({
      success: true,
      message: "Update data products success",
    });
  } catch (err) {
    res.status(400).json({
      succes: false,
      message: "Update data products failed",
      err: err.message,
    });
  }
});

module.exports = router;
