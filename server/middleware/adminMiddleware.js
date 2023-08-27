const jwt = require('jsonwebtoken');
const secretKey = 'my-secret-key';
const usersTable = require('../models/index').users_table;
const permissionsTable = require('../models/index').permissions;
module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const { user } = req;
        if (!user) {
            return res.status(400).json({
                message: 'User is not authorized',
            });
        }
        const result = await usersTable.findOne({
            where: {
                id: user.id,
            },
            include: {
                model: permissionsTable,
                as: 'permissions',
                through: {
                    attributes: [],
                },
            },
        });
        const { permissions } = result;
        if (permissions[0].is_admin === false) {
            res.status(400).json({
                message: `You don't have access`,
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'User is not authorized' });
    }
};
