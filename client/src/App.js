import { Admin, Resource } from 'react-admin';
import customAuthProvider from './utils/authProvider';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import customDataProvider from './utils/dataProvider';
import users from './components/users';
import languages from './components/languages';
const App = () => {
	return (
		<Admin
			authProvider={customAuthProvider}
			dataProvider={customDataProvider}
			loginPage={SignIn}
			dashboard={Dashboard}
		>
			<Resource name="users" {...users} />
			<Resource name="language" {...languages} />
		</Admin>
	);
};

export default App;
