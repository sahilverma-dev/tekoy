// icons
import { Box, Button, Input, Title, PasswordInput, Stack } from "@mantine/core";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useAuth } from "../context/authContext";
import React from "react";

const Login: React.FunctionComponent = () => {
  const { loginWithEmailPassword, loginWithGoogle } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const googleLoginHandler = (e: any) => {
    loginWithGoogle();
  }

  const loginWithEmailAndPassword = (e: any) => {
    e.preventDefault();
    loginWithEmailPassword(form.values.email, form.values.password);
    console.log(form.values);
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
        onClick={googleLoginHandler}
      >
        Login with Google
      </Button>
    </Box>
  );
};

export default Login;
