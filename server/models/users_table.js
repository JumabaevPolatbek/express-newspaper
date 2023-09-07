'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class users_table extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsToMany(models.permissions, {
				as: 'permissions',
				through: 'users_has_permissions',
				foreignKey: {
					name: 'userId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
			this.belongsTo(models.images);
			this.belongsToMany(models.groups, {
				through: 'users_has_groups',
				as: 'UsersGroup',
				foreignKey: {
					name: 'userId',
					allowNull: false,
				},
				onDelete: 'CASCADE',
			});
			this.hasMany(models.CategoryPostsTranslations, {
				as: 'author',
				foreignKey: {
					name: 'userId',
					allowNull: false,
				},
				onDelete: 'SET NULL',
			});
		}
	}
	users_table.init(
		{
			username: {
				type: DataTypes.STRING(60),
				unique: true,
				allowNull: false,
				validate: {
					isValidUsername(value) {
					  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
			  
					  if (!usernameRegex.test(value)) {
						throw new Error(
						  'Username must be between 3 and 20 characters long and can only contain letters, numbers, and underscores.'
						);
					  }
					},
				  },
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isStrongPassword(value) {
					  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			  
					  if (!passwordRegex.test(value)) {
						throw new Error(
						  'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.'
						);
					  }
					},
				  },
			},
			email: {
				type: DataTypes.STRING(60),
				unique: true,
				allowNull: false,
				validate: {
					isEmailCustom(value) {
					  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			  
					  if (!emailRegex.test(value)) {
						throw new Error('Invalid email address');
					  }
					},
				  },
			},
			first_name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			info: DataTypes.STRING,
			imageId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'users_table',
		}
	);
	return users_table;
};
