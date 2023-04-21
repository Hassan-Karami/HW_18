const express = require('express');
const router = express.Router();
const {AppError}= require("../utils/AppError");
const studentRouter = require("./studentRouter")



router.use("/students",studentRouter)

module.exports = router;
