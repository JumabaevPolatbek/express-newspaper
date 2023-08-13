'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users_has_groups extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.users_table);
            this.belongsTo(models.groups);
        }
    }
    users_has_groups.init(
        {
            description: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            groupId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'users_has_groups',
        }
    );
    return users_has_groups;
};
