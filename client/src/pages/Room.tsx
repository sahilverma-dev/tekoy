import {
  Title,
  Text,
  Loader,
  ActionIcon,
  Button,
  Tooltip,
  Select,
  TextInput,
  Modal,
  CopyButton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import QRCode from "react-qr-code";

// framer motion
import { AnimatePresence, motion } from "framer-motion";

import { useParams } from "react-router-dom";
import Page from "../components/common/Page";
import RoomHeader from "../components/RoomHeader";
import { users } from "../constants/users";
import RoomUserCard from "../components/RoomUserCard";
import { container, item, messagesWindowVariants } from "../constants/variants";

// icons
import {
  BsMicFill as MicOnIcon,
  BsMicMuteFill as MicOffIcon,
  BsChatLeftFill as ChatIcon,
} from "react-icons/bs";
import { FiSend as SendIcon } from "react-icons/fi";
import {
  MdContentCopy as CopyIcon,
  MdCheck as CheckIcon,
} from "react-icons/md";

import {
  IoMdShare as ShareIcon,
  IoMdExit as ExitIcon,
  IoMdClose as CloseIcon,
} from "react-icons/io";

import { useEffect, useState } from "react";
import { messages } from "../constants/messages";
import { useWebRTC } from "../hooks/useWebRTC";
import { useAuth } from "../context/AuthContext";
import { User } from "../interfaces";

const Room = () => {
  const { roomID } = useParams();
  const [micActive, setMicActive] = useState<boolean>(false);
  const [messagesActive, setMessagesActive] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);

  const { user } = useAuth();
  const { clients, provideRef, handleMute } = useWebRTC(roomID, user);

  const handleMuteClick = (clientId: string) => {
    if (clientId !== user?.id) {
      return;
    }
    setMicActive(!micActive);
  };

  useEffect(() => {
    console.log(clients);
  }, [clients]);

  useEffect(() => {
    if (user?.id) handleMute(micActive, user.id);
  }, [micActive]);

  return (
    <Page>
      <RoomHeader title="Lorem ipsum dolor sit amet." />
      {/* <div
          className="flex items-center flex-col gap-2 justify-center w-full"
          style={{
            height: "calc(100vh - 160px)",
          }}
        >
          <Loader color="indigo" />

          <Text className="text-sm text-slate-800">
            Loading Participants&apos; data...
          </Text>
        </div> */}
      <motion.div layout className={`${messagesActive ? "flex" : ""}`}>
        <motion.div
          layout
          className="overflow-y-scroll hide-scroll"
          style={{
            height: "calc(100vh - 70px)",
          }}
        >
          <div className="max-w-7xl p-3 mx-auto hide-scroll">
            <Title className="text-xl" order={2}>
              Speakers (4)
            </Title>
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 my-3"
            >
              {/* {users.slice(0, 6).map((user, index) => (
                <RoomUserCard
                  provideRef={provideRef}
                  key={index}
                  isSpeaker={true}
                  user={{
                    token: "",
                    avatar: user.picture.medium,
                    name: `${user.name.first} ${user.name.last}`,
                    // _id: user.login.uuid,
                  }}
                />
              ))} */}
            </motion.div>
          </div>
          <motion.div
            layout
            className="w-full h-screen bg-gray-200 p-3 rounded-t-lg"
          >
            <motion.div layout className="max-w-7xl p-3 mx-auto">
              <Title className="text-xl" order={2}>
                Listeners (20)
              </Title>
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 my-3"
              >
                {/* {users.map((user, index) => (
                  <RoomUserCard
                    provideRef={provideRef}
                    key={index}
                    isSpeaker={false}
                    user={{
                      token: "",
                      avatar: user.picture.medium,
                      name: `${user.name.first} ${user.name.last}`,
                      // _id: user.login.uuid,
                    }}
                  />
                ))} */}
                {clients.map((client: User) => (
                  <RoomUserCard
                    key={client.id}
                    user={client}
                    provideRef={provideRef}
                    isSpeaker={false}
                    handleMuteClick={() =>
                      client?.id && handleMuteClick(client?.id)
                    }
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        {messagesActive && (
          <AnimatePresence>
            <motion.div
              layout
              variants={messagesWindowVariants}
              initial="exit"
              animate="enter"
              exit="exit"
              className="min-w-[500px] fixed md:static inset-0 bg-white border-2 z-50 overflow-y-scroll"
              style={{
                height: "calc(100vh - 70px)",
              }}
            >
              <div className="p-3">
                <ActionIcon
                  size="lg"
                  variant="default"
                  radius="md"
                  className="border-0 text-zinc-200 bg-zinc-700 hover:bg-zinc-900 ml-auto"
                  onClick={() => setMessagesActive(false)}
                >
                  <CloseIcon size={20} />
                </ActionIcon>
              </div>
              <div
                className="overflow-y-scroll my-2"
                style={{
                  height: "calc(100vh - 210px)",
                }}
              >
                <motion.ul
                  layout
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="w-full flex flex-col gap-3 mt-4 p-3"
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {messages.map((message) => (
                      <motion.li
                        layout
                        variants={item}
                        key={message._id}
                        className={`w-full flex items-center gap-2 ${
                          message.user._id ===
                          "ec88c23e-a8b2-4636-a820-6e1f14746e61"
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        <img
                          src={message.user.avatar}
                          alt={message.user.name}
                          className="h-10 aspect-square rounded-full border"
                        />
                        <div className="py-[3px] flex bg-blue-500 px-3 rounded-md text-white">
                          {message.message}
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </div>
              <div className="border-t flex gap-2 p-3">
                <TextInput
                  type="text"
                  withAsterisk
                  size="md"
                  radius="md"
                  placeholder="Enter your messages"
                  className="w-full"
                  // {...form.getInputProps('email')}
                />
                <ActionIcon
                  variant="default"
                  size="xl"
                  radius="md"
                  className="bg-blue-600 hover:bg-blue-900 text-white aspect-square h-full"
                >
                  <SendIcon size={18} />
                </ActionIcon>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
      <div className="bg-black/60 backdrop-blur py-3 px-3 md:px-6 rounded-t-md md:rounded-md fixed bottom-0 md:bottom-2 left-1/2 -translate-x-1/2 z-30 w-full md:w-[600px] flex items-center gap-3">
        <Tooltip withArrow offset={10} label="Toggle on/off the mic">
          <ActionIcon
            size="xl"
            variant="default"
            radius="xl"
            className={`border-0 text-zinc-200 ${
              micActive
                ? "bg-red-600 hover:bg-red-800"
                : "bg-zinc-900 hover:bg-zinc-700"
            }`}
            onClick={() => setMicActive(!micActive)}
          >
            {micActive ? <MicOffIcon size={20} /> : <MicOnIcon size={20} />}
          </ActionIcon>
        </Tooltip>
        <Tooltip
          withArrow
          offset={10}
          label="Toggle on/off the chatting window"
        >
          <ActionIcon
            size="xl"
            variant="default"
            radius="xl"
            className={`border-0 text-zinc-200 ${
              messagesActive
                ? "bg-blue-600 hover:bg-blue-800"
                : "bg-zinc-700 hover:bg-zinc-900"
            }`}
            onClick={() => setMessagesActive(!messagesActive)}
          >
            <ChatIcon />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Share the room" withArrow offset={10}>
          <ActionIcon
            size="xl"
            variant="default"
            radius="xl"
            className="border-0 text-zinc-200 bg-zinc-900 hover:bg-zinc-700"
            onClick={() => setShowShare(true)}
          >
            <ShareIcon size={20} />
          </ActionIcon>
        </Tooltip>
        <Select
          radius="md"
          variant="default"
          placeholder="Select Mic"
          size="md"
          classNames={{
            input: "bg-zinc-900 text-white border-0",
            dropdown: "bg-zinc-800 rounded-md text-white border-0",
            item: "text-white hover:text-black",
            // wrapper: "bg-red-500",
          }}
          data={[
            {
              value: "mic-1",
              label: "Mic 1",
            },
            {
              value: "mic-2",
              label: "Mic 2",
            },
            {
              value: "mic-3",
              label: "Mic 3",
            },
            {
              value: "mic-4",
              label: "Mic 4",
            },
          ]}
        />
        <Button
          size="md"
          radius="md"
          onClick={() => {
            showNotification({
              message: `${user?.name} joined the room`,
              classNames: {
                body: "w-auto",
              },
              icon: (
                <img
                  src={user?.avatar}
                  className="rounded-full h-7 block aspect-square shrink-0"
                />
              ),
            });
          }}
          className="bg-red-500 hover:bg-red-900"
          leftIcon={<ExitIcon size={18} />}
        >
          Leave Room
        </Button>
      </div>
      {/* <div className="!fixed bottom-0 overlay pointer-events-none"></div> */}
      <Modal
        opened={showShare}
        title="Share the room"
        radius="md"
        centered
        onClose={() => setShowShare(false)}
        classNames={{
          title: "font-bold",
        }}
      >
        <div className="flex items-center gap-2">
          <TextInput
            readOnly
            value={`${window.location.href}`}
            className="w-full text-black"
          />
          <CopyButton value={window.location.href} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon
                  variant="default"
                  size="lg"
                  className={copied ? "text-green-700" : "text-black"}
                  onClick={copy}
                >
                  {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </div>

        <QRCode
          value={window.location.href}
          className="h-56 aspect-square object-contain mx-auto my-4"
        />
      </Modal>
    </Page>
  );
};

export default Room;
