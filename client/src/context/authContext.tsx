/* eslint-disable @typescript-eslint/no-empty-function */ // TODO: remove this
import { createContext, useContext, useState } from "react";
import { AuthContextProps, User } from "./types";

const AuthContext = createContext<AuthContextProps>({
  user: {},
  loginWithGoogle: () => {},
  loginWithEmailPassword: () => {},
  registerWithEmailPassword: () => {},
  loginAsRandomUser: () => {},
  logout: () => {},
});

type AuthProvidorProps = {
  children: React.ReactNode;
};

const AuthContextProvider: React.FC<AuthProvidorProps> = (
  props: AuthProvidorProps
) => {
  const [user, setUser] = useState<User>();

  const loginWithGoogle = () => {
    //login user with google
  };

  const loginWithEmailPassword = (email: string, password: string) => {
    //login user with email and password
  };

  const registerWithEmailPassword = (user: User) => {
    //register user with email and password
  };

  const loginAsRandomUser = (
    id: number,
    email: string,
    name: string,
    avatar: string
  ) => {
    //login with randomly generated data
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        loginWithEmailPassword,
        registerWithEmailPassword,
        loginAsRandomUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (authContext) {
    return authContext;
  } else {
    throw new Error("Something is wrong with auth context");
  }
};

export { useAuth, AuthContextProvider };
