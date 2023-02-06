export interface IUser {
  id: string;
  name: string;
  email: string;
  verified?: boolean;
  authProvider?: "Google" | "Email/Password" | "Random";
  avatar: string;
}

export interface User {
  _id?: number;
  email?: string;
  name?: string;
  avatar?: string;
  token: string;
}

export interface AuthContextProps {
  user: User | undefined;
  loginWithGoogle: () => void;
  loginWithEmailPassword: (email: string, password: string) => void;
  registerWithEmailPassword: (user: User) => void;
  loginAsRandomUser: (
    id: number,
    email: string,
    name: string,
    avatar: string
  ) => void;
  logout: () => void;
}

export interface RoomType {
  _id: string;
  title: string;
  thumbnail: string;
  user: User;
  listeners: User[];
  createdAt: Date;
}
