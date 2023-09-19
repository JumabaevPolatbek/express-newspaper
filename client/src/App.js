import { Admin, Resource } from 'react-admin';
import customAuthProvider from './utils/authProvider';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import customDataProvider from './utils/dataProvider';
import users from './components/Users';
import languages from './components/languages';
import menus from './components/menus';
import i18nInstance from './utils/i18nProvider';
import category from './components/category';
import posts from './components/posts';
const App = () => {
	return (
		<Admin
			authProvider={customAuthProvider}
			dataProvider={customDataProvider}
			loginPage={SignIn}
			dashboard={Dashboard}
		>
			<Resource name="users" {...users} />
			<Resource
				name="language"
				{...languages}
				recordRepresentation="name"
			/>
			<Resource name="menus" {...menus} />
			<Resource name="category" {...category} />
			<Resource name="post" {...posts} />
		</Admin>
	);
};

export default App;
