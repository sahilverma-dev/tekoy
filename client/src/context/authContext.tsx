/* eslint-disable @typescript-eslint/no-empty-function */ // TODO: remove this
import { createContext, useContext, useState } from "react";
import { AuthContextProps, User } from "./types";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'universal-cookie';

const AuthContext = createContext<AuthContextProps>({
  user: {},
  loginWithGoogle: () => { },
  loginWithEmailPassword: () => { },
  registerWithEmailPassword: () => { },
  loginAsRandomUser: () => { },
  logout: () => { },
});

type AuthProvidorProps = {
  children: React.ReactNode;
};

const AuthContextProvider: React.FC<AuthProvidorProps> = (
  props: AuthProvidorProps
) => {
  const [user, setUser] = useState<User>();

  const loginWithGoogle =
    useGoogleLogin({
      onSuccess: async (res) => {
        const { data } = await axios(
          "https://www.googleapis.com/oauth2/v3/userinfo", // TODO: move it in env or config folder
          {
            headers: {
              Authorization: `Bearer ${res?.access_token}`,
            },
          }
        );
        console.log(data);
        const newUser = { email: data.email, id: data.sub, avatar: data.picture, name: `${data.given_name} ${data.family_name}` };
        const token = await axios.post(`${import.meta.env.VITE_REACT_APP_API}api/v1/user/google`, { ...newUser });

        const cookies = new Cookies();
        cookies.set('user', token);
      },
    });


  const loginWithEmailPassword = (email: string, password: string) => {
    // login user with email and password
  };

  const registerWithEmailPassword = (user: User) => {
    // register user with email and password
  };

  const loginAsRandomUser = (
    id: number,
    email: string,
    name: string,
    avatar: string
  ) => {
    setUser({ id, email, name, avatar });
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
