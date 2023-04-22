const express = require("express");
const router = express.Router();
const { AppError } = require("../utils/AppError");
 const {
   createFood,
   getAllFoods,
   getSingleFood,
   updateFood,
   deleteFood,
 } = require("../controllers/foods_controller");
const { route } = require("./studentRouter");


router.get("/", getAllFoods);
router.get("/:id", getSingleFood);
router.post("/", createFood);
router.patch("/", updateFood);
router.delete("/", deleteFood);
 




 module.exports = router;