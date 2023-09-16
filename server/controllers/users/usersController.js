const sharp = require('sharp');
const {
	addUser,
	addUserToGroup,
	deleteUser,
	editUser,
	imageUpload,
	deleteImage,
} = require('./actionsUsersTable');
const { getUsers, getUser } = require('./getUsers');
const path = require('path');
const fs = require('fs');
const validationError = require('../../services/validationError');
module.exports = {
	addUserController: async (req, res) => {
		try {
			const { message, statusCode, errors } = await addUser(req.body);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		} catch (error) {
			const { statusCode, message, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	addUserToGroupController: async (req, res) => {
		try {
			const { userId, groupId } = req.body;
			const result = await addUserToGroup(groupId, userId);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: error });
		}
	},
	getUsersController: async (req, res) => {
		try {
			const { statusCode, message } = await getUsers();
			res.status(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			const { message, statusCode, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	deleteUserController: async (req, res) => {
		try {
			const { userId } = req.params;
			const { statusCode, message } = await deleteUser(userId);
			res.status(statusCode).json({
				message: message,
			});
		} catch (error) {
			const { statusCode, errors, message } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	editUserController: async (req, res) => {
		try {
			const { userId } = req.params;
			const { statusCode, message } = await editUser(
				userId,
				req.body.data
			);
			res.status(statusCode).json({
				message: message,
			});
			// console.log(req.params);
			// console.log(req.body.data);
		} catch (error) {
			console.log(error);
			const { statusCode, message, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	imageUploadController: async (req, res) => {
		try {
			const { userId } = req.params;

			await sharp(req.file.path)
				.resize({ width: 800 })
				.toFormat('jpeg')
				.jpeg({ quality: 70 })
				.toFile('uploads/images/image-' + req.file.filename);
			fs.unlinkSync(req.file.path);
			const pathName = 'uploads\\images\\image-' + req.file.filename;
			const { statusCode, message } = await imageUpload(userId, pathName);
			return res.status(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			fs.unlinkSync(req.file.path);
			const { statusCode, message, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	delImageController: async (req, res) => {
		try {
			const { imageId } = req.params;
			const { statusCode, message } = await deleteImage(imageId);
			res.status(statusCode).json({
				message: message,
			});
		} catch (error) {
			console.log(error);
			const { statusCode, message, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
	getUserByIdController: async (req, res) => {
		try {
			const { userId } = req.params;
			const { statusCode, message } = await getUser(userId);
			res.status(statusCode).json({ message: message });
		} catch (error) {
			console.log(error);
			const { statusCode, message, errors } = validationError(error);
			return res
				.status(statusCode)
				.json({ message: message, errors: errors });
		}
	},
};
