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
        }
    }
    languages.init(
        {
            name: DataTypes.STRING,
            country: DataTypes.STRING,
            iso_639_code: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'languages',
        }
    );
    return languages;
};
