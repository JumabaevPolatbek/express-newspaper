import { Cookies } from 'react-cookie';
import decode from './decode';
import axios from 'axios';
const api = 'http://localhost:5000/auth/signin';
const cookie = new Cookies();
const customAuthProvider = {
	login: async ({ username, password }) => {
		try {
			const response = await axios.post(api, {
				username: username,
				password: password,
			});
			const token = response.data.token;
			if (!token) {
				throw new Error('Erorr');
			}
			cookie.set('token', token);
			return Promise.resolve();
		} catch (error) {
			return Promise.reject();
		}
	},
	logout: () => {
		cookie.remove('token');
		return Promise.resolve();
	},
	checkAuth: () =>
		cookie.get('token') ? Promise.resolve() : Promise.reject(),
	checkError: (error) => {
		const status = error.status;
		if (status === 401 || status === 403) {
			cookie.remove('token');
			return Promise.reject();
		}
		// other error code (404, 500, etc): no need to log out
		return Promise.resolve();
	},
	getIdentity: () => {
		const token = cookie.get('token');
		const { dataValues } = decode(token);
		return Promise.resolve({
			id: dataValues.id,
			fullName: dataValues.username,
		});
	},
	getPermissions: () => {
		const token = cookie.get('token');
		const { dataValues } = decode(token);

		return axios
			.get(`http://localhost:5000/users/${dataValues.id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) =>
				Promise.resolve(response.data.message.permissions[0])
			);
	},
};

export default customAuthProvider;
