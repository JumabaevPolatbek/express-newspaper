import * as React from 'react';
import {
	Edit,
	SimpleForm,
	TextInput,
	required,
	ReferenceInput,
	AutocompleteInput,
} from 'react-admin';

export const EditMenu = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="title" title="Menu name" validate={required()} />
			<TextInput source="slug" />
			<TextInput source="content" />
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
