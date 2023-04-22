const express = require('express');
const router = express.Router();
const {AppError}= require("../utils/AppError");
const studentRouter = require("./studentRouter");
const foodRouter = require("./foodRouter");
const invoiceRouter = require("./invoiceRouter");





router.use("/students",studentRouter);
router.use("/foods", foodRouter);
router.use("/invoices", invoiceRouter);

module.exports = router;
