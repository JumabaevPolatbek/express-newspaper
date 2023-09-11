'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class languages extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.menus_has_submenus_post_languages, {
				as: 'language',
				foreignKey: {
					name: 'languageId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
			this.hasMany(models.CategoryPostsTranslations, {
				as: 'translation',
				foreignKey: {
					name: 'languageId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
			this.hasMany(models.posts, {
				foreignKey: {
					name: 'languageId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
			this.hasMany(models.category, {
				foreignKey: {
					name: 'languageId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
			this.hasMany(models.menus, {
				foreignKey: {
					name: 'languageId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
			this.hasMany(models.submenu, {
				foreignKey: {
					name: 'languageId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
		}
	}
	languages.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isLetterOnly: (value) => {
						const lettersRegex = /^[\p{L}]+$/u;
						if (!lettersRegex.test(value)) {
							throw new Error('Name must contain only letters.');
						}
					},
				},
			},
			country: {
				type: DataTypes.STRING,
				allowNull: false,
				// validate: {
				// 	is: {
				// 		args: [a - Z],
				// 		msg: 'Only english letters',
				// 	},
				// },
			},
			iso_639_code: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'languages',
		}
	);
	return languages;
};
