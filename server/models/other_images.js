'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class other_images extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.posts);
			this.belongsTo(models.images);
		}
	}
	other_images.init(
		{
			description: DataTypes.STRING,
			postId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			imageId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'other_images',
		}
	);
	return other_images;
};
