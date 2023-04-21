const {AppError} = require("../utils/AppError");
const {Student}= require("../models/student");

const createStudent =async (req,res,next)=>{
  try {
      const duplicate = await Student.findOne({
       where: {student_number: req.body.student_number},
      });
   
      if (!!duplicate) {
        return next(new AppError(409, "duplicate student_number"));
      }
      const {firstName,lastName,student_number,gender} = req.body;
      const newStudent = await Student.create({firstName,lastName,student_number,gender});
      res.status(201).send(newStudent);
    
  } catch (error) {
    return next(new AppError(500,"Something went wrong"));
  }
}

module.exports = {createStudent}