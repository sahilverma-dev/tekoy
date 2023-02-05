import {
  Title,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form/";
import { showNotification } from "@mantine/notifications";

// icons
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FormEvent } from "react";
import Page from "../components/common/Page";

const Register = () => {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password1: "",
      password2: "",
      terms: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const {
    loginWithGoogle,
    isLoading,
    loginAsRandomUser,
    registerWithEmailPassword,
  } = useAuth();

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, name, password1, password2 } = form.values;
    if (name && name && email && password1 && password2)
      if (password1 !== password2) {
        showNotification({
          title: "Passwords are not same",
          color: "red",
          message: "Confirm your password properly",
        });
      } else {
        registerWithEmailPassword(email, name, password1);
      }
    else {
      showNotification({
        title: "All felids are required",
        color: "red",
        message: "Enter all input felids",
      });
    }
  };

  return (
    <Page className="flex">
      <div className="bg-white sm:h-screen h-[700px] w-full py-5 px-7">
        <div className="max-w-xl flex flex-col justify-between h-full mx-auto">
          <Link to="/">
            <img
              src="/logo.png"
              alt=""
              className="h-11 aspect-square flex-shrink-0 md:h-14"
            />
          </Link>
          <div>
            <Title className="text-3xl font-poppins font-bold">Register </Title>
            <form className="my-4 flex flex-col gap-3" onSubmit={formSubmit}>
              <TextInput
                size="md"
                required
                placeholder="Enter your Name"
                label="Name"
                autoFocus
                type="text"
                disabled={isLoading}
                {...form.getInputProps("name")}
              />
              <TextInput
                size="md"
                required
                placeholder="Enter your email"
                label="Email"
                type="email"
                disabled={isLoading}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                size="md"
                required
                placeholder="Enter your password"
                label="Password"
                disabled={isLoading}
                {...form.getInputProps("password1")}
              />
              <PasswordInput
                size="md"
                required
                placeholder="Confirm your password"
                label="Confirm Password"
                disabled={isLoading}
                {...form.getInputProps("password2")}
              />
              <Checkbox
                disabled={isLoading}
                {...form.getInputProps("terms")}
                label={
                  <>
                    Accepts{" "}
                    <Link
                      to="/terms-and-conditions"
                      target="_blank"
                      className="font-bold text-blue-600"
                    >
                      terms and conditions
                    </Link>
                  </>
                }
              />
              <Button
                type="submit"
                size="md"
                loading={isLoading}
                disabled={
                  !form.values.terms ||
                  form.values.password1.length < 6 ||
                  form.values.password2.length < 6
                }
                className="bg-primary hover:bg-black active:bg-slate-900 w-full rounded-full font-bold transition-all"
              >
                Register
              </Button>

              <Button
                type="button"
                size="md"
                onClick={loginAsRandomUser}
                loading={isLoading}
                disabled={!form.values.terms}
                className="bg-blue-600 hover:bg-black active:bg-slate-900 w-full rounded-full font-bold transition-all"
              >
                Continue as a Random User
              </Button>
              {/* <Text className="w-full text-center font-semibold">or</Text> */}
              <Button
                type="button"
                size="md"
                // onClick={loginWithGoogle}
                onClick={() => {
                  console.log("hello");
                  loginWithGoogle();
                }}
                loading={isLoading}
                disabled={!form.values.terms}
                className="border border-black/30 hover:bg-black hover:text-white text-black active:bg-zinc-700 active:text-white w-full rounded-full font-bold transition-all"
              >
                <GoogleIcon />
                <span className="ml-1">Login with Google</span>
              </Button>
            </form>
            <div className="text-sm">
              Already have an account? Try to{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                Login
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
    </Page>
  );
};

export default Register;
