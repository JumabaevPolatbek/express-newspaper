import { AuthProvider, HttpError } from "react-admin";
import axios from "axios";
import { AuthLogin, Login } from "./models/user";
import { Cookies } from "react-cookie";
/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
const cookie = new Cookies();
export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    await axios
      .post<Login, any>(
        "http://195.158.22.198:5000/auth/signin",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const token = response.data.token;
        cookie.set("token", token);
        return Promise.resolve();
      })
      .catch((error) => Promise.reject(error));
  },
  logout: () => {
    cookie.remove("token");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => (cookie.get("token") ? Promise.resolve() : Promise.reject()),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = cookie.get("token");
    const user = persistedUser ? persistedUser : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
