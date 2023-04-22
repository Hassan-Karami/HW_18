const express = require("express");
const router = express.Router();
const { AppError } = require("../utils/AppError");
const {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/students_controller");


router.get("/", getAllStudents);
router.get("/:id", getSingleStudent);
router.post("/", createStudent);
router.patch("/",updateStudent);
router.delete("/",deleteStudent);






module.exports = router;