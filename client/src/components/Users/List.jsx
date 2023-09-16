import {
	List,
	Datagrid,
	TextField,
	DateField,
	usePermissions,
	ImageField,
	EditButton,
	ShowButton,
	DeleteButton,
} from 'react-admin';
import CustomDeleteButton from '../ConfirmDel';

export const UserList = () => {
	return (
		<List>
			<Datagrid>
				<TextField source="id" />
				<ImageField source="image" />
				<TextField source="username" />
				<TextField source="email" />
				<DateField source="createdAt" />
				<TextField source="first_name" />
				<TextField source="last_name" />
				<EditButton />
				<ShowButton />
				<CustomDeleteButton />
			</Datagrid>
		</List>
	);
};
