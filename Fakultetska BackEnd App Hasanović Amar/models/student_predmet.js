const Sequelize = require("sequelize");

 
module.exports = function (sequelize, DataTypes) {
    const StudentPredmet = sequelize.define('student_predmet', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey : true
        },
   },
   {
    timestamps: false
  });
   return StudentPredmet;
}