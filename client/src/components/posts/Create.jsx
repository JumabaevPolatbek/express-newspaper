import * as React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	ReferenceInput,
	AutocompleteInput,
	required,
} from 'react-admin';
import CKEditorInput from './CKEditor';
export const CreatePost = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput
					source="title"
					title="Post title"
					fullWidth
					validate={required()}
				/>
				<CKEditorInput source="content" />
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
};
