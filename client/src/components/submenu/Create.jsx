import * as React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	ReferenceInput,
	AutocompleteInput,
	required,
} from 'react-admin';
export const CreateSubMenu = () => (
	<Create>
		<SimpleForm>
			<TextInput
				source="title"
				title="Menu name"
				fullWidth
				validate={required()}
			/>
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
	</Create>
);
