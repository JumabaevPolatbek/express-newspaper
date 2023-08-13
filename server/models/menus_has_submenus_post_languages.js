'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class menus_has_submenus_post_languages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.menus);
            this.belongsTo(models.submenu);
            this.belongsTo(models.posts);
            this.belongsTo(models.languages);
        }
    }
    menus_has_submenus_post_languages.init(
        {
            description: DataTypes.STRING,
            menuId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            submenuId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            postId: {
                type: DataTypes.INTEGER,
            },
            languageId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'menus_has_submenus_post_languages',
        }
    );
    return menus_has_submenus_post_languages;
};
