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
            this.belongsTo(models.images, {
                as: 'userImage',
                foreignKey: 'imageId',
                onDelete: 'CASCADE',
            });
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
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(60),
                unique: true,
                allowNull: false,
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
