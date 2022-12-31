import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { IUser } from "../interfaces";
import { api } from "../axios";

interface AuthContextProps {
  user: IUser | null;
  loginWithGoogle: () => void;
  loginWithEmailPassword: (email: string, password: string) => void;
  registerWithEmailPassword: (email: string, password: string) => void;
  loginAsRandomUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loginWithGoogle: () => {},
  loginWithEmailPassword: () => {},
  registerWithEmailPassword: () => {},
  loginAsRandomUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (res: any) => {
      try {
        const { data } = await axios(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${res?.access_token}`,
            },
          }
        );
        console.log(data);
        const userData: IUser = {
          id: data?.sub,
          avatar: data?.picture,
          authProvider: "Google",
          email: data?.email,
          name: data?.name,
        };
        const { data: data1 } = await api({
          url: "user/login",
          method: "post",
          data: userData,
        });
        console.log(data1);

        // setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        console.log(error);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const loginWithEmailPassword = (email: string, password: string) => {};

  const registerWithEmailPassword = (email: string, password: string) => {};

  const loginAsRandomUser = () => {};

  const logout = () => {
    setUser(null);
  };

  // useEffect(() => {
  //   const userData = localStorage.getItem("userData");
  //   if (userData) setUser(JSON.parse(userData));
  // }, []);
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
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  } else {
    throw new Error("Something is wrong with auth context");
  }
};
