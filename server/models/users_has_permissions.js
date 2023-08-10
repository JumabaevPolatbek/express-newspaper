'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class users_has_permissions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.users_table, {
				foreignKey: 'userId',
			});
			this.belongsTo(models.permissions, {
				foreignKey: 'permissionId',
			});
		}
	}
	users_has_permissions.init(
		{
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'users_has_permissions',
		}
	);
	return users_has_permissions;
};
