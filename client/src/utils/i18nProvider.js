import i18n from 'i18next';
import Backend from 'i18next-http-backend';

const i18nInstance = i18n.createInstance();

i18nInstance.use(Backend).init({
	lng: 'en',
	backend: {
		loadPath: '/api/translations/{{lng}}/{{ns}}',
		addPath: '/api/translations/{{lng}}/{{ns}}',
		updatePath: '/api/translations/{{lng}}/{{ns}}',
		deletePath: '/api/translations/{{lng}}/{{ns}}',
		parse: (data) => JSON.parse(data),
		stringify: (data) => JSON.stringify(data),
		allowMultiLoading: false,
		crossDomain: true,
	},
	// Other i18next configuration options
	// ...
	interpolation: {
		escapeValue: false, // Disable HTML escaping
	},
});

export default i18nInstance;
