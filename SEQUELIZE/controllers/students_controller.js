const {AppError} = require("../utils/AppError");
const {Student}= require("../models/student");
const { where } = require("sequelize");

//Get all students
const getAllStudents = async (req,res,next)=>{
  try {
    const studentsList= await Student.findAll();
    res.send(studentsList)
  } catch (error) {
    next(new AppError(500,"Something went wrong"));
  }
}

//Get single student
const getSingleStudent = async (req, res, next) => {
  try {
    const targetStudent = await Student.findByPk(+req.params.id);
    if(!!targetStudent){
    res.send(targetStudent);
    return; 

    }
    return next(404,"Student NOt Found")
  } catch (error) {
    next(new AppError(500, "Something went wrong"));
  }
};


//Create student
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
     next(new AppError(500,"Something went wrong"));
  }
}


//Update student
const updateStudent = async (req, res, next) => {
  try {
    const targetStudent = await Student.findByPk(+req.body.id);
    if (!targetStudent) {
      return next(new AppError(404, "NOt Found(in update student)"));
    }
    const { firstName, lastName, student_number, gender } = req.body;
    const updateBody = {};
    if(!!firstName)  updateBody.firstName = firstName;
    if (!!lastName) updateBody.lastName = lastName;
    if (!!student_number) updateBody.student_number = student_number;
    if (!!gender) updateBody.gender = gender;
    await Student.update(updateBody, {
      where: { id: +req.body.id },
    });
    const updatedStudent = await Student.findByPk(req.body.id);
    res.status(200).send(updatedStudent);

  } catch (error) {
    next(new AppError(500, "Something went wrong"));
  }
};

//Delete student
const deleteStudent = async (req, res, next) => {
  try {
    const targetStudent = await Student.findByPk(+req.body.id);
    if (!targetStudent) {
      return next(new AppError(404, "NOt Found(in delete student)"));
    }
    const deletedStudent = Student.destroy({where: {id:+req.body.id}});
    res.status(202).send(`student "${targetStudent.firstName} ${targetStudent.lastName}" with student_number: "${targetStudent.id}" was removed successfully`);
  
  } catch (error) {
    next(new AppError(500, "Something went wrong"));
  }
};



module.exports = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};