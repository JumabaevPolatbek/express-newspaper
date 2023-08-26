'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class menus extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(
				models.menus_has_submenus_post_languages,
				{
					as: 'childMenus',
					foreignKey: {
						name: 'menuId',
						allowNull: false,
					},
					onDelete: 'CASCADE',
				}
			);
			this.hasMany(
				models.menus_has_submenus_post_languages,
				{
					as: 'posts',
					foreignKey: {
						name: 'menuId',
						allowNull: false,
					},
					onDelete: 'CASCADE',
				}
			);
		}
	}
	menus.init(
		{
			title: DataTypes.STRING,
			slug: DataTypes.STRING,
			url: DataTypes.STRING,
			content: DataTypes.TEXT,
			languageId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'menus',
		}
	);
	return menus;
};
