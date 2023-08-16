const sharp = require('sharp');
const {
	addUser,
	addUserToGroup,
	deleteUser,
	editUser,
	imageUpload,
	deleteImage,
} = require('./actionsUsersTable');
const { getUsers } = require('./getUsers');
const path = require('path');
const fs = require('fs');
module.exports = {
	addUserController: async (req, res) => {
		try {
			const result = await addUser(req.body);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: error });
		}
	},
	addUserToGroupController: async (req, res) => {
		try {
			const { userId, groupId } = req.body;
			const result = await addUserToGroup(
				groupId,
				userId
			);
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: error });
		}
	},
	getUsersController: async (req, res) => {
		try {
			const result = await getUsers();
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: error });
		}
	},
	deleteUserController: async (req, res) => {
		try {
			const { userId } = req.params;
			const result = await deleteUser(userId);
			res.status(200).json({
				message: `User ${userId} deleted successfully`,
			});
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: error });
		}
	},
	editUserController: async (req, res) => {
		try {
			const { userId } = req.params;
			await editUser(userId, req.body);
			res.status(200).json({
				message: 'Success',
			});
		} catch (error) {
			fs.unlinkSync(req.file.path);
			console.log(error);
			return res.status(400).json({ message: error });
		}
	},
	imageUploadController: async (req, res) => {
		try {
			const { userId } = req.params;

			await sharp(req.file.path)
				.resize({ width: 800 })
				.toFormat('jpeg')
				.jpeg({ quality: 70 })
				.toFile(
					'uploads/images/image-' +
						req.file.filename
				);
			fs.unlinkSync(req.file.path);
			const pathName =
				'uploads\\images\\image-' +
				req.file.filename;
			await imageUpload(userId, pathName);
			res.status(200).json({
				message: 'Success',
			});
		} catch (error) {
			console.log(error);
			res.status(400).json(error);
			fs.unlinkSync(req.file.path);
		}
	},
	delImageController: async (req, res) => {
		try {
			const { imageId } = req.params;
			await deleteImage(imageId);
			res.status(200).json({
				message: 'Success',
			});
		} catch (error) {
			console.log(error);
			res.status(400).json(error);
		}
	},
};
