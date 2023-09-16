import * as React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	DateInput,
	required,
	BooleanInput,
} from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { Box, Typography } from '@mui/material';

export const CreateUser = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						// width: '100%',
					}}
				>
					<Box
						sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
					>
						<Typography variant="h6">User Info</Typography>
						<TextInput
							source="username"
							validate={[required()]}
							fullWidth
						/>
						<TextInput
							source="password"
							label="Password"
							validate={[required()]}
							type="password"
						/>
						{/* <RichTextInput source="body" /> */}
						<TextInput source="email" validate={[required()]} />
						<TextInput source="first_name" label="First Name" />
						<TextInput source="last_name" label="Last name" />
						<TextInput source="info" />
					</Box>
					<Box sx={{ p: 2 }}>
						<Typography variant="h6">User Permissions</Typography>
						<BooleanInput
							source="permissions.show_users"
							label="Show Users"
						/>
						<BooleanInput
							source="permissions.edit_users"
							label="Edit Users"
						/>
						<BooleanInput
							source="permissions.delete_users"
							label="Remove Users"
						/>
						<BooleanInput
							source="permissions.is_admin"
							label="Is Admin"
						/>
						<BooleanInput
							source="permissions.access_cms"
							label="Access Cms"
						/>
					</Box>
				</Box>
			</SimpleForm>
		</Create>
	);
};
