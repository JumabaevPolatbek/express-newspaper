'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class groups extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsToMany(models.users_table, {
				as: 'GroupsUser',
				through: 'users_has_groups',
				foreignKey: {
					name: 'groupId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
		}
	}
	groups.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'groups',
		}
	);
	return groups;
};
