const express = require("express");
const {
  customerService,
  addCustomerService,
  deleteCustomerService,
  updateCustomerService,
} = require("./customer.service");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await customerService();
    res.status(200).json({
      success: true,
      message: "Get data customers success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Get data customers failed",
      err: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  const reqBody = req.body;
  try {
    await addCustomerService(reqBody);
    res.status(200).json({
      success: true,
      message: "Post data customers success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Post data customers failed",
      err: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  try {
    await deleteCustomerService(reqId);
    res.status(200).json({
      success: true,
      message: "Delete data customers success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Delete data customers failed",
      err: err.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const reqId = req.params.id;
  const reqBody = req.body;
  try {
    await updateCustomerService(reqBody, reqId);
    res.status(200).json({
      success: true,
      message: "Update data customers success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Update data customers failed",
      err: err.message,
    });
  }
});

module.exports = router;
