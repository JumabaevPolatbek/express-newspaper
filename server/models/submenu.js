'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class submenu extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.menus_has_submenus_post_languages, {
                as: 'submenus',
                foreignKey: {
                    name: 'submenuId',
                    allowNull: true,
                },
                onDelete: 'SET NULL',
            });
        }
    }
    submenu.init(
        {
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'submenu',
        }
    );
    return submenu;
};
