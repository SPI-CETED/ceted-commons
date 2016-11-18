"use strict";

module.exports = function(sequelize, DataTypes) {
  var Technology = sequelize.define("Technology", {
    id : {
      type: DataTypes.INTEGER(6).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
, {    updatedAt: 'created_on',
       createdAt: 'updated_on',
       tableName: 'technology',
       classMethods: {
        associate: function(models) {
         models.Technology.hasMany(models.TechnologyUser, { as: 'technologyUsers'})
        }
       }
    });

  return Technology;
};
