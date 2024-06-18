'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(models.Exercise, { foreignKey: 'exerciseId' });
      Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
    }
  }
  Answer.init({
    exerciseId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    type: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};