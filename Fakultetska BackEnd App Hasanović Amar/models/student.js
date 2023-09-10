const Sequelize = require("sequelize");

 
module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define('Student', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey : true
        },
        ime: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        prezime: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        index: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
   },
   {
    timestamps: false
  });
   return Student;
}