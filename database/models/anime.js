'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Anime.init({
    title: DataTypes.STRING,
    episodios: DataTypes.INTEGER,
    fecha_ini: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    image_url: DataTypes.STRING,
    image_public_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};