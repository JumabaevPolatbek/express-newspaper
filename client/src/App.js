import { Admin, Resource } from 'react-admin';
import customAuthProvider from './utils/authProvider';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import customDataProvider from './utils/dataProvider';
import Users from './components/Users';
const App = () => {
	return (
		<Admin
			authProvider={customAuthProvider}
			dataProvider={customDataProvider}
			loginPage={SignIn}
			dashboard={Dashboard}
		>
			<Resource name="users" {...Users} />
		</Admin>
	);
};

export default App;
