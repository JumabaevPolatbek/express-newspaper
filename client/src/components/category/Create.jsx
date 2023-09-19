import * as React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	ReferenceInput,
	AutocompleteInput,
	required,
} from 'react-admin';
export const CreateCategory = () => (
	<Create>
		<SimpleForm>
			<TextInput
				source="name"
				title="Category name"
				fullWidth
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
	</Create>
);
