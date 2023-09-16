import * as React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	DateInput,
	required,
} from 'react-admin';

export const CreateMenu = () => (
	<Create>
		<SimpleForm>
			<TextInput source="name" title="Language name" fullWidth />
			<TextInput source="country" label="Country" />
			<TextInput source="iso_639_code" label="ISO code for language" />
		</SimpleForm>
	</Create>
);
