import * as React from "react";
import { Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required, BooleanInput} from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { Box ,Typography} from "@mui/material";
const AsideEdit = () => (
        <Box sx={{ width: '200px', margin: '1em' }}>
            <Typography variant="h6">Permissions</Typography>
            {/* <BooleanInput source="permissions.0.show_users"/> */}
        </Box>
);
export const UserEdit = (props) => (
    <Edit aside={<AsideEdit/>} {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="username"  validate={required()}/>
            <TextInput source="first_name"  validate={required()}/>
            <TextInput source="last_name"  validate={required()}/>
            <TextInput source="email"  validate={required()}/>
        </SimpleForm>
    </Edit>
);