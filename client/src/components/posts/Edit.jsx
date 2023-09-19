import * as React from 'react';
import {
	Edit,
	SimpleForm,
	TextInput,
	required,
	ReferenceInput,
	AutocompleteInput,
} from 'react-admin';

export const EditPost = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput
				source="name"
				title="Category name"
				validate={required()}
			/>
			<TextInput source="url" />
			<ReferenceInput
				source="languageId"
				reference="language"
				validate={required()}
			>
				<AutocompleteInput label="Language" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);
