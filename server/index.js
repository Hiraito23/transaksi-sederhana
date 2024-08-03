const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ extends: true }));

// import router controller
const productsRouter = require("./router/products/products.controller");
const transaksiRouter = require("./router/transaksi/transaksi.controller");
const customerRouter = require("./router/customer/customer.controller");

// router
app.use("/", productsRouter);
app.use("/transaksi", transaksiRouter);
app.use("/customer", customerRouter);

app.listen(port, () => {
  console.log(`app running on port http://localhost:${port}`);
});
