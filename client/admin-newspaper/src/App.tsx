import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { authProvider } from "./authProvider";
import SignIn from "./components/LoginPage";
import customDataProvider from "./dataProvider";
import UsersList from "./components/Users/UsersList";
import { UserCreate } from "./components/Users/CreateUser";

export const App = () => (
  <Admin
    authProvider={authProvider}
    loginPage={SignIn}
    dataProvider={customDataProvider}
  >
    <Resource
      name="users"
      list={UsersList}
      // edit={EditGuesser}
      // show={UsersList}
      create={UserCreate}
    />
    <Resource
      name="menus"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="submenus"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="categories"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="languages"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="posts"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
