const { connection } = require("../Database/connection");
const { DataTypes } = require("sequelize");
const Food = connection.sequelize.define(
  "Food",
  {
    food_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },

    price: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "Foods",
    timestamps: true,
  }
);
module.exports = { Food };
