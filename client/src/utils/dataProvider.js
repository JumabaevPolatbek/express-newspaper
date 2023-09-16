import axios from 'axios';
import { Cookies } from 'react-cookie';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
const api = 'http://195.158.22.198:5000';
const cookie = new Cookies();
const customDataProvider = {
	getList: async (resource, params) => {
		const url = api + '/' + resource;

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
		const url = 'http://localhost:5000/' + resource + `/${params.id}`;
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
	getManyReferences: async (resource, params) => {
		const url = 'http://localhost:5000/' + resource + `/${params.id}`;
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
		const url = 'http://localhost:5000/' + resource + `/${params.id}`;
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
		const url = `http://localhost:5000/${resource}/create`;
		try {
			const response = await axios.post(url, params, {
				headers: { Authorization: `Bearer ${cookie.get('token')}` },
			});
			return {
				data: response.message,
			};
		} catch (error) {
			throw new Error('Error sending data ....');
		}
	},
	delete: async (resource, params) => {
		const url = `http://localhost:5000/${resource}/${params.id}`;
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
};
export default customDataProvider;
