'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories_has_posts_users_languages_metas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  categories_has_posts_users_languages_metas.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categories_has_posts_users_languages_metas',
  });
  return categories_has_posts_users_languages_metas;
};