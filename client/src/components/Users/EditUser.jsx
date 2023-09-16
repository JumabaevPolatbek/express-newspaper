import * as React from 'react';
import {
	Edit,
	SimpleForm,
	TextInput,
	DateInput,
	ReferenceManyField,
	Datagrid,
	TextField,
	DateField,
	EditButton,
	required,
	BooleanInput,
} from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { Box, Typography } from '@mui/material';

export const UserEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					// width: '100%',
				}}
			>
				<Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
					<Typography variant="h4">User Info</Typography>
					<TextInput disabled label="Id" source="id" />
					<TextInput source="username" validate={required()} />
					<TextInput source="first_name" validate={required()} />
					<TextInput source="last_name" validate={required()} />
					<TextInput source="email" validate={required()} />
				</Box>
				<Box sx={{ p: 2 }}>
					<Typography variant="h4">User Permissions</Typography>
					<BooleanInput source="permissions.show_users" />
				</Box>
			</Box>
		</SimpleForm>
	</Edit>
);
