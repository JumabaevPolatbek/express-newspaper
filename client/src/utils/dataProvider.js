import axios from 'axios';
import { Cookies } from 'react-cookie';
const api = 'http://localhost:5000/';
const cookie = new Cookies();
const customDataProvider = {
	getList: async (resource, params) => {
		const url = api + resource;

		try {
			const resp = await axios.get(url, {
				headers: { Authorization: `Bearer ${cookie.get('token')}` },
			});
			return {
				data: resp.data.message,
				total: 2,
			};
		} catch (error) {
			throw new Error('Error fetching data...');
		}
	},
	getOne: async (resource, params) => {
		const url = api + resource + `/${params.id}`;
		try {
			const response = await axios.get(url, {
				headers: { Authorization: `Bearer ${cookie.get('token')}` },
			});
			return {
				data: response.data.message,
			};
		} catch (error) {
			throw new Error('Error fetching data ...');
		}
	},
	getMany: async (resource, params) => {
		const url = api + resource;
		try {
			const response = await axios.get(url);
			const records = response.data.message.map((item) => item);
			return {
				data: records,
			};
		} catch (error) {
			throw new Error('Error fetching data ...');
		}
	},
	getManyReferences: async (resource, params) => {
		const url = api + resource + `/${params.id}`;
		try {
			const response = await axios.get(url, {
				headers: { Authorization: `Bearer ${cookie.get('token')}` },
			});
			return {
				data: response.data.message,
			};
		} catch (error) {
			throw new Error('Error fetching data ...');
		}
	},
	update: async (resource, params) => {
		const url = api + resource + `/${params.id}`;
		try {
			// return console.log(params);
			const respons = await axios.patch(
				url,
				{ ...params },
				{
					headers: { Authorization: `Bearer ${cookie.get('token')}` },
				}
			);
			return {
				data: respons.data.message,
			};
		} catch (error) {
			throw new Error('Error send data ...');
		}
	},
	create: async (resource, params) => {
		const url = `${api}${resource}/create`;
		try {
			const response = await axios.post(url, params, {
				headers: { Authorization: `Bearer ${cookie.get('token')}` },
			});
			return {
				data: response.data.message,
			};
		} catch (error) {
			const {
				response: { data },
			} = error;
			throw new Error(data.errors[0].message);
		}
	},
	delete: async (resource, params) => {
		const url = `${api}${resource}/${params.id}`;
		try {
			const response = await axios.delete(url, {
				headers: { Authorization: `Beaer ${cookie.get('token')}` },
			});
			return {
				data: response.message,
			};
		} catch (error) {
			throw new Error('Error deleting data ...');
		}
	},
	deleteMany: async (resource, params) => {
		console.log(params);
	},
};
export default customDataProvider;
