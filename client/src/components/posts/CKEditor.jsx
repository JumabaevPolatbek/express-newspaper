import React, { useRef } from 'react';
import { useInput } from 'react-admin';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FileManagerComponent } from '@syncfusion/ej2-react-filemanager';
const CKEditorInput = ({ source }) => {
	const {
		field: { onChange },
	} = useInput({ source });
	const editorRef = useRef();
	const handleEditorChange = (event, editor) => {
		const data = editor.getData();
		onChange(source, data);
	};
	const configureEditor = (editor) => {
		editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
			// Return a custom no-op upload adapter
			return {
				upload: () => Promise.resolve(),
				abort: () => {},
			};
		};
	};
	return (
		<>
			<FileManagerComponent
				ajaxSettings={{
					url: 'http://localhost:5000/images',
					getImageUrl: 'http://localhost:5000/images',
				}}
			/>
			<CKEditor
				editor={ClassicEditor}
				onChange={handleEditorChange}
				config={{
					toolbar: [
						'heading',
						'|',
						'bold',
						'italic',
						'link',
						'bulletedList',
						'numberedList',
						'uploadImage',
						'blockQuote',
						'insertTable',
						'mediaEmbed',
						'undo',
						'redo',
						'ckbox',
					],
				}}
				onReady={(editor) => {
					editorRef.current = editor;
					configureEditor(editor);
				}}
			/>
		</>
	);
};

export default CKEditorInput;
