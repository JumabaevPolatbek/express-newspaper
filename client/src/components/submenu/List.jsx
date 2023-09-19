import {
	List,
	Datagrid,
	TextField,
	EditButton,
	ShowButton,
	ReferenceField,
} from 'react-admin';
import CustomDeleteButton from '../ConfirmDel';

export const ListSubMenu = () => {
	return (
		<List>
			<Datagrid>
				<TextField source="id" />
				<TextField source="title" label="Menu name" />
				<TextField source="slug" />
				<TextField source="content" />
				<ReferenceField source="languageId" reference="language" />
				<EditButton />
				<ShowButton />
				<CustomDeleteButton />
			</Datagrid>
		</List>
	);
};
