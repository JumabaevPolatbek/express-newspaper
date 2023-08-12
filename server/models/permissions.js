'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class permissions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsToMany(models.users_table, {
				as: 'permissionsUser',
				through: 'users_has_permissions',
				foreignKey: {
					name: 'permissionId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
		}
	}
	permissions.init(
		{
			show_posts: DataTypes.BOOLEAN,
			edit_posts: DataTypes.BOOLEAN,
			delete_posts: DataTypes.BOOLEAN,
			access_cms: DataTypes.BOOLEAN,
			is_admin: DataTypes.BOOLEAN,
			show_users: DataTypes.BOOLEAN,
			edit_users: DataTypes.BOOLEAN,
			delete_users: DataTypes.BOOLEAN,
			is_owner: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'permissions',
		}
	);
	return permissions;
};
