import { DeleteWithConfirmButton, useNotify, useRefresh } from 'react-admin';

const CustomDeleteButton = ({ record }) => {
	const notify = useNotify();
	const refresh = useRefresh();

	const handleSuccess = () => {
		notify('Record deleted successfully');
		refresh();
	};

	return (
		<DeleteWithConfirmButton
			title="Delete Record"
			content="Are you sure you want to delete this record?"
			confirmColor="secondary"
			onSuccess={handleSuccess}
			record={record}
		/>
	);
};
export default CustomDeleteButton;
