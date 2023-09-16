import { List, Datagrid, TextField, EditButton, ShowButton } from 'react-admin';
import CustomDeleteButton from '../ConfirmDel';

export const ListLanguages = () => {
	return (
		<List>
			<Datagrid>
				<TextField source="id" />
				{/* <ImageField source="name" title="Language name" /> */}
				<TextField source="name" label="Language name" />
				<TextField source="country" />
				<TextField source="iso_639_code" label="ISO code" />
				<EditButton />
				<ShowButton />
				<CustomDeleteButton />
			</Datagrid>
		</List>
	);
};
