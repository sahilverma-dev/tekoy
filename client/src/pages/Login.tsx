// icons
import { Box, Button, Input, Title, PasswordInput, Stack } from "@mantine/core";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useAuth } from "../context/authContext";

const Login = () => {
  const authContext = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const loginWithEmailAndPassword = (e: any) => {
    e.preventDefault();
    authContext.loginWithEmailPassword(form.values.email, form.values.password);
    console.log(form.values);
  };

  const loginWithGoogle = () => {
    authContext.loginWithGoogle();
  };
  return (
    <Box
      bg="dark"
      className="flex flex-col gap-2 p-2 items-center justify-center min-h-screen"
    >
      <Title order={1} className="text-white text-5xl">
        Login
      </Title>
      <form
        className="w-full p-3 max-w-lg"
        onSubmit={loginWithEmailAndPassword}
      >
        <Stack>
          <Input
            type="email"
            placeholder="Your email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            placeholder="Your password"
            {...form.getInputProps("password")}
          />
          <Button type="submit" variant="outline">
            Login
          </Button>
        </Stack>
      </form>
      <Link to="/register" className="text-blue-500 font-semibold mb-3 text-xs">
        Register
      </Link>
      <Button
        leftIcon={<GoogleIcon />}
        variant="outline"
        onClick={loginWithGoogle}
      >
        Login with Google
      </Button>
    </Box>
  );
};

export default Login;
