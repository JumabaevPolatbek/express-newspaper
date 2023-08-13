'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class posts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.images);
            this.belongsToMany(models.images, {
                as: 'postOtherImages',
                through: 'other_images',
                foreignKey: {
                    name: 'postId',
                    allowNull: false,
                },
                onDelete: 'CASCADE',
            });
            this.hasMany(models.menus_has_submenus_post_languages, {
                as: 'postForMenus',
                foreignKey: {
                    name: 'postId',
                    allowNull: true,
                },
                onDelete: 'SET NULL',
            });
            this.hasMany(models.CategoryPostsTranslations, {
                as: 'postForCategories',
                foreignKey: {
                    name: 'postId',
                    allowNull: false,
                },
                onDelete: 'CASCADE',
            });
        }
    }
    posts.init(
        {
            title: DataTypes.STRING,
            content: DataTypes.TEXT,
            imageId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'posts',
        }
    );
    return posts;
};
