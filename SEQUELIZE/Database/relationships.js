const {Student} = require("../models/student");
const { Food } = require("../models/food");
const { Invoice } = require("../models/invoice");
const { FoodInvoice } = require("../models/Food_Invoice");

const loadRelationship = async()=>{
    await Student.hasMany(Invoice);
    await Invoice.belongsTo(Student);
    await Food.belongsToMany(Invoice,{through: FoodInvoice});
    await Invoice.belongsToMany(Food,{through : FoodInvoice});
}

module.exports = {loadRelationship}