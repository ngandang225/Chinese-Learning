'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Part extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Part.belongsTo(models.Topic, { foreignKey: 'topicId' });
      Part.hasMany(models.Skill, { foreignKey: 'partId' });
      Part.hasMany(models.Exercise, { foreignKey: 'partId' });
    }
  }
  Part.init({
    name: DataTypes.STRING,
    record: DataTypes.STRING,
    topicId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Part',
  });
  return Part;
};