import { fetchUtils, DataProvider } from 'react-admin';
const api = 'http://195.158.22.198:5000';
const customProvider = {
	...DataProvider,
	getList: async (resource, params) => {
		const url = api + '/' + resource;
		try {
		} catch (error) {
			throw new Error('Error fetching data...');
		}
	},
};
