const { connection } = require("../Database/connection");
const { DataTypes } = require("sequelize");
const Student = connection.sequelize.define(
  "Student",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },

    student_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: [/^[1-9][0-9]{8}$/],
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["male", "female"]],
      },
    },
  },
  {
    tableName: "Students",
    timestamps: true,
  }
);
module.exports = { Student };
