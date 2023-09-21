import * as React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	ReferenceInput,
	AutocompleteInput,
	required,
	useRecordContext,
} from 'react-admin';
import CKEditorInput from './CKEditor';
export const CreatePost = (props) => {
	const [formData, setFormData] = React.useState({});

	const handleInputChange = (fieldName, value) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[fieldName]: value,
		}));
	};
	const record = useRecordContext();
	console.log(record);
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput
					source="title"
					title="Post title"
					fullWidth
					validate={required()}
				/>
				<CKEditorInput
					source="content"
					onChange={handleInputChange}
					record={record}
				/>
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
