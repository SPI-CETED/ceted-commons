"use strict";

module.exports = function(sequelize, DataTypes) {
  var TechnologyUser = sequelize.define("TechnologyUser", {
    id : {
      type: DataTypes.INTEGER(6).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }
, {
    updatedAt: 'created_on',
    createdAt: 'updated_on'
  });

  return TechnologyUser;
};
