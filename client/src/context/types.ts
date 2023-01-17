export interface User {
  id?: number;
  email?: string;
  name?: string;
  avatar?: string;
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