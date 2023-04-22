const { AppError } = require("../utils/AppError");
const { Food } = require("../models/food");
const { where } = require("sequelize");

//Get all foods
const getAllFoods = async (req,res,next)=>{
  try {
    const foodsList= await Food.findAll();
    res.send(foodsList)
  } catch (error) {
    next(new AppError(500,"Something went wrong"));
  }
}

//Get single food
const getSingleFood = async (req, res, next) => {
  try {
    const targetFood = await Food.findByPk(+req.params.id);
    if(!!targetFood){
    res.send(targetFood);
    return; 

    }
    return next(404,"Food NOt Found")
  } catch (error) {
    next(new AppError(500, "Something went wrong"));
  }
};

//Create food
const createFood =async (req,res,next)=>{
  try {
      const duplicate = await Food.findOne({
        where: { food_name: req.body.food_name },
      });
   
      if (!!duplicate) {
        return next(new AppError(409, "this food already exists"));
      }
      const { food_name, price } = req.body;
      const newFood = await Food.create({ food_name, price });
      res.status(201).send(newFood);
    
  } catch (error) {
     next(new AppError(500,"Something went wrong"));
  }
}

//Update food
const updateFood = async (req, res, next) => {
  try {
    const targetFood = await Food.findByPk(+req.body.id);
    if (!targetFood) {
      return next(new AppError(404, "NOt Found(in update food)"));
    }
    const { food_name, price } = req.body;
    const updateBody = {};
    if(!!food_name)  updateBody.food_name = food_name;
    if (!!price) updateBody.price = price;

    await Food.update(updateBody, {
      where: { id: +req.body.id },
    });
    const updatedFood = await Food.findByPk(req.body.id);
    res.status(200).send(updatedFood);

  } catch (error) {
    console.log(error);
    next(new AppError(500, "Something went wrong"));
  }
};


//Delete student
const deleteFood = async (req, res, next) => {
  try {
    const targetFood = await Food.findByPk(+req.body.id);
    if (!targetFood) {
      return next(new AppError(404, "NOt Found(in delete food)"));
    }
    const deleteFood = Food.destroy({where: {id:+req.body.id}});
    res.status(202).send(`food "${targetFood.food_name}" was removed successfully`);
  
  } catch (error) {
    next(new AppError(500, "Something went wrong"));
  }
};


module.exports = {
  createFood,
  getAllFoods,
  getSingleFood,
  updateFood,
  deleteFood,
};