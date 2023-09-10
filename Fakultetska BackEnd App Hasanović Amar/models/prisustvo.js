const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const Prisustvo = sequelize.define('Prisustvo', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey : true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
   },
   {
    timestamps: false
  });
   return Prisustvo;
}