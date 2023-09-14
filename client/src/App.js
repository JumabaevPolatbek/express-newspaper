import { Admin, Resource } from 'react-admin';
import customAuthProvider from './utils/authProvider';
import SignIn from './components/SignIn';
import { Dashboard } from '@mui/icons-material';
import { UserList } from './components/Users/List';
import customDataProvider from './utils/dataProvider';
import { UserEdit } from './components/Users/EditUser';
const App = () => {
	return (
		<Admin
			authProvider={customAuthProvider}
			dataProvider={customDataProvider}
			loginPage={SignIn}
			dashboard={Dashboard}
		>
			<Resource name="users" list={UserList} edit={UserEdit} />
		</Admin>
	);
};

export default App;
