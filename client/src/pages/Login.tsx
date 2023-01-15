import { Title, TextInput, PasswordInput, Button } from "@mantine/core";

// icons
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { loginWithGoogle, loginAsRandomUser } = useAuth();
  return (
    <div className="flex">
      <div className="bg-white sm:h-screen h-[650px] w-full py-5 px-7">
        <div className="max-w-xl flex flex-col justify-between h-full mx-auto">
          <Link to="/">
            <img
              src="/logo.png"
              alt=""
              className="h-11 aspect-square flex-shrink-0 md:h-14"
            />
          </Link>
          <div>
            <Title className="text-3xl font-poppins font-bold">Login</Title>
            <form className="my-4 flex flex-col gap-3">
              <TextInput
                size="md"
                placeholder="Enter your email"
                label="Email"
                autoFocus
                type="email"
              />
              <PasswordInput
                size="md"
                placeholder="Enter your password"
                label="Password"
              />
              <Button
                type="submit"
                size="md"
                className="bg-primary hover:bg-black active:bg-slate-900 w-full rounded-full font-bold transition-all"
              >
                Login
              </Button>
              <Button
                type="button"
                size="md"
                onClick={loginAsRandomUser}
                className="bg-blue-600 hover:bg-black active:bg-slate-900 w-full rounded-full font-bold transition-all"
              >
                Continue as a Random User
              </Button>
              {/* <Text className="w-full text-center font-semibold">or</Text> */}
              <Button
                type="button"
                size="md"
                onClick={loginWithGoogle}
                className="border border-black/30 hover:bg-black hover:text-white text-black active:bg-zinc-700 active:text-white w-full rounded-full font-bold transition-all"
              >
                <GoogleIcon />
                <span className="ml-1">Login with Google</span>
              </Button>
            </form>
            <div className="text-sm">
              Didn't register yet?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                Create a new Account
              </Link>
            </div>
          </div>
          <footer className="font-bold text-sm font-poppins">
            &copy; 2023-24 All rights are reserved.{" "}
            <Link
              to="/"
              className="text-primary font-black hover:text-blue-500"
            >
              Tekoy
            </Link>
          </footer>
        </div>
      </div>
      <div className="hidden bg-primary h-screen w-full md:flex items-center justify-center p-3">
        <img
          src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?w=2000"
          alt=""
          loading="lazy"
          className=" w-full max-w-[400px] aspect-square rounded-lg object-contain origin-center shadow-lg"
        />
      </div>
    </div>
  );
};

export default Login;
