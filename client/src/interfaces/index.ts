export interface IUser {
  id: string;
  name: string;
  email: string;
  verified?: boolean;
  authProvider?: "Google" | "Email/Password" | "Random";
  avatar: string;
}
