const usersPermissionsTable =
	require('../../models/index').users_has_permissions;

module.exports = async (req, res) => {
	try {
		const result =
			await usersPermissionsTable.findAll();
		return res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
};
