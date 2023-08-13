'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class meta extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.CategoryPostsTranslations, {
                as: 'meta',
                foreignKey: {
                    name: 'metaId',
                    allowNull: false,
                },
                onDelete: 'CASCADE',
            });
        }
    }
    meta.init(
        {
            name: DataTypes.STRING,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'meta',
        }
    );
    return meta;
};
