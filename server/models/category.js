'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.CategoryPostsTranslations, {
                as: 'category',
                foreignKey: {
                    name: 'categoryId',
                    allowNull: false,
                },
                onDelete: 'CASCADE',
            });
            this.belongsTo(models.languages);
        }
    }
    category.init(
        {
            name: DataTypes.STRING,
            url: DataTypes.STRING,
            languageId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'category',
        }
    );
    return category;
};
