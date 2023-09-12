import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";

const UsersList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="description" />
        <TextField source="createdAt" />
        <DateField source="updatedAt" />
        <TextField source="user" />
        {/* <BooleanField source="commentable" /> */}
      </Datagrid>
    </List>
  );
};

export default UsersList;
