const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const Cas = sequelize.define('Cas', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey : true
        },
        redniBroj: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        tip: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sedmica: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
   },
   {
    timestamps: false
  });
   return Cas;
}