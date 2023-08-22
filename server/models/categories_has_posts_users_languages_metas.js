'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CategoryPostsTranslations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.category);
			this.belongsTo(models.posts);
			this.belongsTo(models.metas);
			this.belongsTo(models.users_table, {
				foreignKey: 'userId',
			});
			this.belongsTo(models.languages);
		}
	}
	CategoryPostsTranslations.init(
		{
			description: DataTypes.STRING,
			categoryId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
			metaId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			languageId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'CategoryPostsTranslations',
		}
	);
	return CategoryPostsTranslations;
};
