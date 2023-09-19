import {
	List,
	Datagrid,
	TextField,
	EditButton,
	ShowButton,
	ReferenceField,
	DateField,
} from 'react-admin';
import CustomDeleteButton from '../ConfirmDel';

export const ListPost = () => {
	return (
		<List>
			<Datagrid>
				<TextField source="id" />
				<TextField source="name" label="Category name" />
				<TextField source="url" />
				<DateField source="createdAt" />
				<DateField source="updatedAt" />
				<ReferenceField source="languageId" reference="language" />
				<EditButton />
				<ShowButton />
				<CustomDeleteButton />
			</Datagrid>
		</List>
	);
};
