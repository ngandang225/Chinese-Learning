'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsTo(models.Part, { foreignKey: 'partId' });
      Skill.hasMany(models.Exercise, { foreignKey: 'skillId'});
    }
  }
  Skill.init({
    name: DataTypes.STRING,
    record: DataTypes.STRING,
    partId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};