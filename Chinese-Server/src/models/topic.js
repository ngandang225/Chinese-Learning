'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topic.belongsTo(models.Book, { foreignKey: 'bookId' });
      Topic.hasMany(models.Part, { foreignKey: 'topicId' });
    }
  }
  Topic.init({
    name: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};