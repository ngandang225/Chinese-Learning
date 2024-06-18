'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.belongsTo(models.Part, { foreignKey: 'partId' });
      Exercise.belongsTo(models.Skill, { foreignKey: 'skillId' })
      Exercise.hasMany(models.Question, { foreignKey: 'exerciseId'});
    }
  }
  Exercise.init({
    description: DataTypes.STRING,
    partId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    record: DataTypes.STRING,
    skillId: DataTypes.INTEGER,
    exerciseType: DataTypes.STRING,
    ordinalNumber: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};