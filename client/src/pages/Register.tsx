// icons
import { Box, Button, Input, Title, PasswordInput, Stack } from "@mantine/core";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";

const Register = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const loginWithEmailAndPassword = (e: any) => {
    e.preventDefault();
    console.log(form.values);
  };

  const loginWithGoogle = () => {
    console.log("login with google");
  };
  return (
    <Box
      bg="dark"
      className="flex flex-col gap-2 p-2 items-center justify-center min-h-screen"
    >
      <Title order={1} className="text-white text-5xl">
        Register
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
          <PasswordInput
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />
          <Button type="submit" variant="outline">
            Register
          </Button>
        </Stack>
      </form>
      <Link to="/login" className="text-blue-500 font-semibold mb-3 text-xs">
        Login
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

export default Register;
