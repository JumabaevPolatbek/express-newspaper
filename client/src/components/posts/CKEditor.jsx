import React, { useEffect, useRef } from 'react';
import { useInput } from 'react-admin';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CKEditorInput = (props) => {
	const { source, record, onChange } = useInput(props);
	// const editorRef = useRef();
	// console.log(input);
	// useEffect(() => {
	// 	if (editorRef.current) {
	// 		editorRef.current.setData(input.value || '');
	// 	}
	// }, [input.value]);
	console.log(props);
	const handleEditorChange = (event, editor) => {
		const data = editor.getData();
		onChange(source, data);
	};

	return (
		<CKEditor
			editor={ClassicEditor}
			// data={record[source]}
			// ref={editorRef}
			onChange={handleEditorChange}
		/>
	);
};

export default CKEditorInput;
