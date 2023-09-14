import { Cookies } from 'react-cookie';
import axios from 'axios';
const api = 'http://195.158.22.198:5000/auth/signin';
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
		localStorage.removeItem('username');
		return Promise.resolve();
	},
	checkAuth: () =>
		cookie.get('token') ? Promise.resolve() : Promise.reject(),
	checkError: (error) => {
		const status = error.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem('username');
			return Promise.reject();
		}
		// other error code (404, 500, etc): no need to log out
		return Promise.resolve();
	},
	getIdentity: () =>
		Promise.resolve({
			id: 'user',
			fullName: 'Admin',
		}),
	getPermissions: () => Promise.resolve(''),
};

// Custom login logic
const login = async ({ username, password }) => {
	// Implement your custom login logic here
	await fetch(api, {
		method: 'POST',
		body: JSON.stringify({ username: username, password: password }),
	})
		.then((response) => {
			console.log(response);
			return Promise.resolve();
		})
		.catch((error) => {
			// throw new Error(error);
			return Promise.reject();
		});
};

// Custom logout logic
const logout = () => {
	// Implement your custom logout logic here
};

// Custom error handling logic
const handleAuthError = (params) => {
	// Implement your custom error handling logic here
};

// Custom authentication check logic
const checkAuth = () => {
	// Implement your custom authentication check logic here
	return Promise.reject();
};

export default customAuthProvider;