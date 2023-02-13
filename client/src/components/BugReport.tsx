import { FormEvent, useState } from "react";

import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";

// icons
import {
  FaTwitter as TwitterIcon,
  FaGithub as GithubIcon,
  FaInstagram as InstagramIcon,
} from "react-icons/fa";
import { FiMail as MailIcon } from "react-icons/fi";
import { useForm } from "@mantine/form";
import { api } from "../api";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 2.5,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    "&:hover": {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const socialMediaData = [
  {
    Icon: TwitterIcon,
    title: "Contact me on Twitter",
    link: "https://twitter.com/sahilverma_dev",
  },
  {
    Icon: GithubIcon,
    title: "Follow me on GitHub",
    link: "https://github.com/sahilverma-dev/tekoy",
  },
  {
    Icon: InstagramIcon,
    title: "Contact me on Instagram",
    link: "https://www.instagram.com/sahilverma.dev/",
  },
  {
    Icon: MailIcon,
    title: "Contact me through email",
    link: "mailto:sahilverma.webdev@gmail.com",
  },
  //   {
  //     Icon: InstagramIcon,
  //     title: "Contact me on Instagram",
  //     link: "https://www.instagram.com/sahilverma.dev/",
  //   },
];

const ReportBug = () => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const submitReport = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (form.values.name && form.values.email && form.values.message) {
        const { data } = await api({
          url: "/bug/add",
          method: "post",
          data: {
            name: form.values.name,
            email: form.values.email,
            message: form.values.message,
          },
        });
        setIsLoading(false);
        showNotification({
          message: "New Bug reported",
        });
        console.log(data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showNotification({
        message: "Failed to report the Bug",
        color: "red",
      });
    }
  };

  const icons = socialMediaData.map((social, index) => (
    <Tooltip key={index} label={social.title} withArrow>
      <ActionIcon
        size={28}
        className={classes.social}
        variant="transparent"
        component="a"
        target="_blank"
        href={social.link}
      >
        {<social.Icon size={22} />}
      </ActionIcon>
    </Tooltip>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <div>
          <Title className={classes.title}>Report Bug</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will try to get back to you within 24 hours.
          </Text>

          {/* <ContactIconsList variant="white" /> */}

          <Group mt="xl">{icons}</Group>
        </div>
        <form onSubmit={submitReport} className={classes.form}>
          <TextInput
            type="email"
            label="Email"
            placeholder="your@email.com"
            required
            autoFocus
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps("name")}
          />
          <Textarea
            required
            label="Your message"
            placeholder="I want to order your goods"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps("message")}
          />

          <Group position="right" mt="md">
            <Button type="submit" loading={isLoading} variant="outline">
              Send message
            </Button>
          </Group>
        </form>
      </SimpleGrid>
    </div>
  );
};

export default ReportBug;
