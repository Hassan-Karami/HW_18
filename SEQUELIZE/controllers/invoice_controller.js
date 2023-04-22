const {AppError} = require("../utils/AppError");
const { Invoice } = require("../models/invoice");
const {Student}= require("../models/student");
const { Food } = require("../models/food");
const { FoodInvoice } = require("../models/Food_Invoice");




//Get all invoices
const getAllInvoices = async (req,res,next)=>{
  try {
    const invoicesList= await Invoice.findAll();
    res.send(invoicesList)
  } catch (error) {
    next(new AppError(500,"Something went wrong"));
  }
}

//Get single invoice
const getSingleInvoice = async (req, res, next) => {
  try {
    const targetInvoice = await Invoice.findByPk(+req.params.id);
    if(!!targetInvoice){
    res.send(targetInvoice);
    return; 

    }
    return next(404,"Food NOt Found")
  } catch (error) {
    next(new AppError(500, "Something went wrong"));
  }
};


//Create Invoice
const createInvoice =async (req,res,next)=>{
  try {
      const duplicate = await Invoice.findOne({
        where: { tracking_code: req.body.tracking_code},
      });
      if (!!duplicate) {
        console.log(duplicate);
        return next(new AppError(409, "this invoice already exist"));
      }
      const { tracking_code, StudentId, foodIdsArray } = req.body;
      const validStudentId = await Student.findByPk(StudentId);
      if(!validStudentId){
        return next(new AppError(404, "invalid student_id"))
      }
      for(let i=0;i<foodIdsArray.length;i++){
        const targetFood = await Food.findByPk(foodIdsArray[i]);
        if (!targetFood) {
          return next(new AppError(404, `Invalid Food`));
        }
      }
      
      const newInvoice = await Invoice.create({ tracking_code , StudentId});
      for(let i=0;i<foodIdsArray.length;i++){
         await FoodInvoice.create({ FoodId: foodIdsArray[i], InvoiceId: newInvoice.id});
      }
      res.status(201).send(newInvoice);
    
  } catch (error) {
    console.log(error);
     next(new AppError(500,"Something went wrong"));
  }
}


//Update an Invoice
const updateInvoice = async (req, res, next) => {
  try {
    const targetInvoice = await Invoice.findByPk(+req.body.id);
    if (!targetInvoice) {
      return next(new AppError(404, "NOt Found(in update invoice)"));
    }
    const { StudentId, tracking_code,foodIdsArray } = req.body;
    
      
       //update only invoice 
       const updateBody = {};
        if (!!StudentId) updateBody.StudentId = StudentId;
        if (!!tracking_code) updateBody.tracking_code = tracking_code;
         await Invoice.update(updateBody, {
           where: { id: +req.body.id },
         });

         //update FoodInvoices for this invoice if foodIdsArray was entered.
         if(!!foodIdsArray){
           //food validation
           for (let i = 0; i < foodIdsArray.length; i++) {
             const targetFood = await Food.findByPk(foodIdsArray[i]);
             if (!targetFood) {
               return next(new AppError(404, `Invalid Food`));
             }
           }

           //destroy old FoodInvoice field with received invoiceId
           await FoodInvoice.destroy({ where: { InvoiceId: req.body.id } });
          //  await Invoice.destroy({ where: { id: req.body.id } });

           for (let i = 0; i < foodIdsArray.length; i++) {
             await FoodInvoice.create({
               FoodId: foodIdsArray[i],
               InvoiceId: req.body.id,
             });
           }
         }
              
   
    const updatedInvoice = await Invoice.findByPk(req.body.id);
    res.status(200).send(updatedInvoice);
  } catch (error) {
    console.log(error);
    next(new AppError(500, "Something went wrong"));
  }
};


//Delete an invoice
const deleteInvoice = async(req,res,next)=>{
  const targetInvoice = await Invoice.findByPk(req.body.id);
  if(!targetInvoice){
    return next(new AppError(404,"invoice not found"));
  }
  const deltedFoodInvoice = await FoodInvoice.destroy({where: {InvoiceId: req.body.id}});
  const deletedInvoice = await Invoice.destroy({where: { id: req.body.id}});
  res.status(202).send(`invoice with id "${req.body.id}" removed successfully`)

}



module.exports = {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
};