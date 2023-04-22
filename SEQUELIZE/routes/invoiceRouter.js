const express = require("express");
const router = express.Router();
const { AppError } = require("../utils/AppError");
const {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  deleteInvoice,
  updateInvoice,
} = require("../controllers/invoice_controller");



router.get("/", getAllInvoices);
router.get("/:id", getSingleInvoice);
router.post("/", createInvoice);
router.delete("/", deleteInvoice);
router.patch("/", updateInvoice);


module.exports = router;