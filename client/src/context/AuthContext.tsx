import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { IUser, User } from "../interfaces";
import { api } from "../axios";
import { showNotification } from "@mantine/notifications";
import decode from "jwt-decode";
import LoaderScreen from "../components/LoaderScreen";

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => void;
  loginWithEmailPassword: (email: string, password: string) => void;
  registerWithEmailPassword: (
    email: string,
    name: string,
    password: string
  ) => void;
  loginAsRandomUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (res: any) => {
      setIsLoading(true);
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
          email: data?.email,
          name: data?.name,
        };
        try {
          const { data: data1 } = await api({
            url: "user/google",
            method: "post",
            data: userData,
          });
          console.log(data1);
          if (data1) {
            setUser({ ...data1.user, token: data1.token });
            localStorage.setItem("token", data1?.token);
            showNotification({
              title: "Login Successful",
              message: `Logged in as ${data1?.user?.name}`,
            });
          }
        } catch (error: any) {
          showNotification({
            title: "Failed to Login",
            color: "red",
            message: error?.response?.data?.error,
          });
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    },
    onError: (error: any) => {
      console.log(error);
      showNotification({
        title: "Failed to Login",
        color: "red",
        message: error?.response?.data?.error,
      });
    },
  });

  const loginWithEmailPassword = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await api({
        url: "user/login",
        method: "post",
        data: {
          email,
          password,
        },
      });
      console.log(data);
      if (data) {
        setUser({ ...data.user, token: data.token });
        localStorage.setItem("token", data?.token);
        showNotification({
          title: "Login Successful",
          message: data?.message,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      showNotification({
        title: "Failed to Login",
        color: "red",
        message: error?.response?.data?.error,
      });
      console.log(error);
    }
  };

  const registerWithEmailPassword = async (
    email: string,
    name: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      const { data } = await api({
        url: "user/register",
        method: "post",
        data: {
          email,
          name,
          password,
        },
      });
      console.log(data);
      if (data) {
        setUser({ ...data.user, token: data.token });
        localStorage.setItem("token", data?.token);
        showNotification({
          title: "Login Successful",
          message: data?.message,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      showNotification({
        title: "Failed to Login",
        color: "red",
        message: error?.response?.data?.error,
      });
      console.log(error);
    }
  };

  const loginAsRandomUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await api({
        url: "user/random",
        method: "post",
      });
      console.log(data);
      if (data) {
        setUser({ ...data.user, token: data.token });
        localStorage.setItem("token", data?.token);
        showNotification({
          title: "Login Successful",
          message: data?.message,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      showNotification({
        title: "Failed to Login",
        color: "red",
        message: error?.response?.data?.error,
      });
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoader(true);
    if (token) {
      const decoded: IUser = decode(token);
      setUser({
        ...decoded,
        token,
      });
      setLoader(false);
    } else {
      setLoader(false);
      logout();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        loginWithEmailPassword,
        registerWithEmailPassword,
        loginAsRandomUser,
        logout,
      }}
    >
      {loader ? <LoaderScreen /> : children}
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
