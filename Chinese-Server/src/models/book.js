'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Level, { foreignKey: 'levelId' });
      Book.hasMany(models.Topic, { foreignKey: 'bookId',});
    }
  }
  Book.init({
    name: DataTypes.STRING,
    authors: DataTypes.STRING,
    image: DataTypes.STRING,
    levelId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};