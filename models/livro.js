'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Livro.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
   autor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ano_publicacao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Livro',
    tableName: 'livros'
  });
  return Livro;
};
