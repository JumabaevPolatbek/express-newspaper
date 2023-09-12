import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  CheckboxGroupInput,
  BooleanInput,
} from "react-admin";

export const UserCreate: React.FC = () => (
  <Create>
    <SimpleForm>
      <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
          <Typography variant="h6">User account</Typography>
          <TextInput
            source="username"
            validate={[required()]}
            sx={{ display: "block" }}
          />
          <TextInput
            source="password"
            validate={[required()]}
            sx={{ display: "block" }}
            type="password"
          />
          <TextInput
            source="email"
            validate={[required()]}
            sx={{ display: "block" }}
          />
          {/* <TextInput
            source="description"
            multiline={true}
            label="Short description"
            sx={{ display: "block" }}
          /> */}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
          <Typography variant="h6">Permissions</Typography>
          <BooleanInput
            label="Access cms rigth"
            source="permissions.access_cms"
          />
          <BooleanInput label="Is Admin rigth" source="permissions.is_admin" />
          <BooleanInput
            label="Show users rigth"
            source="permissions.show_users"
          />
          <BooleanInput
            label="Edit users rigth"
            source="permissions.edit_users"
          />
          <BooleanInput
            label="Delete users rigth"
            source="permissions.delete_users"
          />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);
