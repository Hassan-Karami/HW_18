const express = require("express");
const router = express.Router();
const { AppError } = require("../utils/AppError");
const { createStudent } = require("../controllers/students_controller");

router.post("/", createStudent);





module.exports = router;