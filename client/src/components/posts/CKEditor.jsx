import React, { useEffect, useRef } from 'react';
import { useInput } from 'react-admin';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

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
				],
			}}
			onReady={(editor) => {
				editorRef.current = editor;
				configureEditor(editor);
			}}
		/>
	);
};

export default CKEditorInput;
