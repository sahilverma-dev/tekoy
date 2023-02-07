import { useState, FormEvent } from "react";
import {
  Title,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form/";
import { showNotification } from "@mantine/notifications";

// icons
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Page from "../components/common/Page";

const Register = () => {
  const [showTNC, setShowTNC] = useState<boolean>(false);
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
                    <span
                      onClick={() => setShowTNC(true)}
                      className="font-bold text-blue-600 cursor-pointer"
                    >
                      terms and conditions
                    </span>
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
      <Modal
        opened={showTNC}
        onClose={() => setShowTNC(false)}
        title="Terms and Conditions"
        centered
        size="xl"
        overflow="inside"
        classNames={{
          title: "font-bold",
        }}
      >
        <div>
          Welcome to Tekoy! These terms and conditions outline the rules and
          regulations for the use of Tekoy&apos;s website and app.
          <br />
          By accessing this website or app, we assume you accept these terms and
          conditions in full. If you do not agree with these terms and
          conditions or any part of these terms and conditions, you must not use
          this website or app.
          <br />
          Intellectual Property
          <br />
          Unless otherwise stated, we or our licensors own the intellectual
          property rights in the website and app and material on the website and
          app. Subject to the license below, all these intellectual property
          rights are reserved.
          <br />
          License to use website and app
          <br />
          You may view, download for caching purposes only, and print pages from
          the website or app for your own personal use, subject to the
          restrictions set out below and elsewhere in these terms and
          conditions.
          <br />
          You must not:
          <br />
          Republish material from this website or app (including republication
          on another website or app); Sell, rent or sub-license material from
          the website or app; Show any material from the website or app in
          public; Reproduce, duplicate, copy or otherwise exploit material on
          our website or app for a commercial purpose; Edit or otherwise modify
          any material on the website or app; or Redistribute material from this
          website or app except for content specifically and expressly made
          available for redistribution. Where content is specifically made
          available for redistribution, it may only be redistributed within your
          organization.
          <br />
          Acceptable use
          <br />
          You must not use our website or app in any way that causes, or may
          cause, damage to the website or app or impairment of the availability
          or accessibility of the website or app; or in any way which is
          unlawful, illegal, fraudulent or harmful, or in connection with any
          unlawful, illegal, fraudulent or harmful purpose or activity.
          <br />
          You must not use our website or app to copy, store, host, transmit,
          send, use, publish or distribute any material which consists of (or is
          linked to) any spyware, computer virus, Trojan horse, worm, keystroke
          logger, rootkit or other malicious computer software.
          <br />
          You must not conduct any systematic or automated data collection
          activities (including without limitation scraping, data mining, data
          extraction and data harvesting) on or in relation to our website or
          app without our express written consent.
          <br />
          You must not use our website or app to transmit or send unsolicited
          commercial communications.
          <br />
          You must not use our website or app for any purposes related to
          marketing without our express written consent.
          <br />
          User-generated content
          <br />
          In these terms and conditions, &quot;your user content&quot; means
          material (including without limitation text, images, audio material,
          video material and audio-visual material) that you submit to our
          website or app, for whatever purpose.
          <br />
          You grant to us a worldwide, irrevocable, non-exclusive, royalty-free
          license to use, reproduce, adapt, publish, translate and distribute
          your user content in any existing or future media. You also grant to
          us the right to sub-license these rights, and the right to bring an
          action for infringement of these rights.
          <br />
          Your user content must not be illegal or unlawful, must not infringe
          any third party&apos;s legal rights, and must not be capable of giving
          rise to legal action whether against you or us or a third party (in
          each case under any applicable law).
          <br />
          You must not submit any user content to the website or app that is or
          has ever been the
        </div>
      </Modal>
    </Page>
  );
};

export default Register;
