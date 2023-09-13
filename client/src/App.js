import { Admin, Resource } from 'react-admin';
import customAuthProvider from './utils/authProvider';
import SignIn from './components/SignIn';
import { Dashboard } from '@mui/icons-material';

function App() {
	return (
		<Admin
			authProvider={customAuthProvider}
			loginPage={SignIn}
			dashboard={Dashboard}
		>
			<Resource name="users" />
		</Admin>
	);
}

export default App;
