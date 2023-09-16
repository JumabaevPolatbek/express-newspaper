import * as React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

export const EditLanguages = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput
				source="name"
				title="Language name"
				validate={required()}
			/>
			<TextInput source="country" validate={required()} />
			<TextInput
				source="iso_639_code"
				title="ISO code for language"
				validate={required()}
			/>
		</SimpleForm>
	</Edit>
);
