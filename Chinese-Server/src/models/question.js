'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Exercise, { foreignKey: 'exerciseId' });
      Question.hasMany(models.Answer, { foreignKey: 'questionId' })
    }
  }
  Question.init({
    content: DataTypes.STRING,
    answer: DataTypes.STRING,
    ordinalNumber: DataTypes.STRING,
    exerciseId: DataTypes.INTEGER,
    images: DataTypes.STRING,
    record: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};