const { connection } = require("../Database/connection");
const { DataTypes } = require("sequelize");
const Invoice = connection.sequelize.define(
  "Invoice",
  {
    tracking_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        len: [12, 12],
      },
    },
  },
  {
    tableName: "Invoices",
    timestamps: true,
  }
);
module.exports = { Invoice };
