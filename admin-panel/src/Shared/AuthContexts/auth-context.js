import { createContext } from "react";
export const AuthContext = createContext({
  token: null,
  user: null,
  setUser: () => { },
  login: () => { },
  logout: () => { },
});
