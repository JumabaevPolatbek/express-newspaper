const fs = require('fs');
const imageTable = require('../../models/index').images;
const validationError = require('../../services/validationError');
const { Op } = require('sequelize');
module.exports = {
	getImages: async () => {
		try {
			const result = await imageTable.findAll();
			return {
				statusCode: 200,
				message: result,
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	createImages: async (arrPath) => {
		try {
			const result = await imageTable.bulkCreate(arrPath);
			return {
				statusCode: 200,
				message: result,
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	removeManyImage: async (arrId) => {
		try {
			const result = await imageTable.findAll({
				where: {
					id: {
						[Op.in]: arrId,
					},
				},
			});
			for (const element of result) {
				if (element !== null) {
					fs.unlinkSync(element.path);
					await imageTable.destroy({
						where: {
							id: element.id,
						},
					});
					return {
						statusCode: 200,
						message: 'OK',
					};
				}
			}
			return {
				statusCode: 401,
				message: 'Language with this id does not exist',
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
	removeByIdImage: async (id) => {
		try {
			const result = await imageTable.findOne({
				where: {
					id: id,
				},
			});
			if (result !== null) {
				fs.unlinkSync(result.path);
				await imageTable.destroy({
					where: {
						id: id,
					},
				});
				return {
					statusCode: 200,
					message: result,
				};
			}
			return {
				statusCode: 401,
				message: 'Language with this id does not exist',
			};
		} catch (error) {
			console.log(error);
			return validationError(error);
		}
	},
};
