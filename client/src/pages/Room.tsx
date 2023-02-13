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
import { BiRefresh as RefreshIcon } from "react-icons/bi";
import {
  IoMdShare as ShareIcon,
  IoMdExit as ExitIcon,
  IoMdClose as CloseIcon,
} from "react-icons/io";

import { useEffect, useState } from "react";
import { messages } from "../constants/messages";
import { useWebRTC } from "../hooks/useWebRTC";
import { useAuth } from "../context/AuthContext";
import { ClientType, User } from "../interfaces";
import { useQuery } from "react-query";
import { api } from "../axios";

interface RoomType {
  title: string;
}

const Room = () => {
  const [selectedMic, setSelectedMic] = useState<string | null>(null);
  const [clientMics, setClientMics] = useState<
    { label: string; value: string }[]
  >([]);
  const { user } = useAuth();
  const { roomID } = useParams();
  const roomQuery = useQuery("room", async () => {
    const { data } = await api({
      url: `rooms/${roomID}`,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    return data.room;
  });
  const [micActive, setMicActive] = useState<boolean>(false);
  const [messagesActive, setMessagesActive] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);

  const { clients, provideRef, handleMute } = useWebRTC(user, roomID);

  useEffect(() => {
    if (user?.id) handleMute(micActive, user?.id);
  }, [micActive]);

  const handleMicChange = async (value: string) => {
    setSelectedMic(value);
    try {
      const selectedMicId = value;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedMicId ? { exact: selectedMicId } : undefined,
        },
      });
      console.log(stream);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(clients);
  }, [clients]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const defaultMic = stream.getTracks()[0].getSettings().deviceId;
        if (defaultMic) setSelectedMic(defaultMic);
        return navigator.mediaDevices.enumerateDevices();
      })
      .then((devices) => {
        const microphones = devices.filter(
          (device) => device.kind === "audioinput"
        );
        const data = microphones.map((mic) => ({
          value: mic.deviceId,
          label: mic.label,
        }));
        setClientMics(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Page>
      {/* <RoomHeader title="Room title" /> */}
      {!roomQuery?.isLoading && roomQuery.data && (
        <RoomHeader title={roomQuery.data?.title} />
      )}
      <motion.div
        layout
        className={` bg-black/90 ${messagesActive ? "flex" : ""}`}
      >
        <motion.div
          layout
          className="overflow-y-scroll w-full bg-black hide-scroll bg-cover bg-center"
          style={{
            height: "calc(100vh - 70px)",
            backgroundImage: `url(${roomQuery.data?.thumbnail})`,
          }}
        >
          <motion.div
            layout
            className="w-full h-screen bg-black/50 text-white backdrop-blur-md p-3 rounded-t-lg"
            style={{
              height: "calc(100vh - 70px)",
            }}
          >
            <motion.div layout className="max-w-7xl p-3 mx-auto">
              {/* <Title className="text-xl" order={2}>
                Listeners (20)
              </Title> */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 my-3"
              >
                <AnimatePresence initial={false}>
                  {clients.map((client: ClientType) => (
                    <RoomUserCard
                      provideRef={provideRef}
                      key={client.id}
                      muted={client.muted}
                      user={client}
                    />
                  ))}
                </AnimatePresence>
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
              className="min-w-[500px] fixed md:static inset-0 bg-zinc-900 border-zinc-800 border-2 z-50 overflow-y-scroll"
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
                  height: "calc(100vh - 211px)",
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
              <div className="border-t border-zinc-800 flex gap-2 p-3">
                <TextInput
                  type="text"
                  withAsterisk
                  size="md"
                  radius="md"
                  variant="default"
                  placeholder="Enter your messages"
                  className="w-full "
                  classNames={{
                    input: "bg-zinc-800 border-zinc-900 text-white",
                  }}
                  // {...form.getInputProps('email')}
                />
                <ActionIcon
                  variant="default"
                  size="xl"
                  radius="md"
                  className="bg-blue-600 hover:bg-blue-900 text-white border-zinc-800 aspect-square h-full"
                >
                  <SendIcon size={18} />
                </ActionIcon>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
      <div className="bg-white/20 backdrop-blur py-3 px-3 md:px-6 rounded-t-md md:rounded-md fixed bottom-0 md:bottom-2 left-1/2 -translate-x-1/2 z-30 w-full md:w-[600px] flex items-center gap-3">
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
            onClick={() => {
              if (user?.id) handleMute(!micActive, user?.id);
              setMicActive(!micActive);
            }}
          >
            {micActive ? <MicOffIcon size={20} /> : <MicOnIcon size={20} />}
          </ActionIcon>
        </Tooltip>
        {/* <Tooltip
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
        </Tooltip> */}
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
        {clientMics.length > 0 && (
          <Select
            radius="md"
            variant="default"
            placeholder="Select Mic"
            size="md"
            classNames={{
              input: "bg-zinc-900 text-white border-0",
              dropdown: "bg-zinc-800 rounded text-white border-0",
              item: "text-white hover:text-black text-sm",
              // wrapper: "bg-red-500",
            }}
            value={selectedMic}
            data={clientMics}
            onChange={handleMicChange}
          />
        )}
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
          className="bg-red-500 hover:bg-red-900 ml-auto"
          leftIcon={<ExitIcon size={18} />}
        >
          Leave Room
        </Button>
      </div>
      {/* {roomQuery?.isLoading && (
        <div className="flex items-center flex-col gap-2 justify-center w-full h-screen">
          <Loader color="indigo" />

          <Text className="text-sm text-slate-800">
            Loading Room&apos; data...
          </Text>
        </div>
      )}
      {!roomQuery?.isLoading && !roomQuery?.isError && (
        <>
      
        </>
      )}
      {roomQuery?.isLoadingError && (
        <div
          className="flex items-center flex-col gap-2 justify-center w-full"
          style={{
            height: "calc(100vh - 160px)",
          }}
        >
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/warning-icon.png"
            alt=""
            className="h-20"
          />
          <Text className="text-lg font-bold text-slate-800">
            Failed to load Room{" "}
          </Text>
          <Button
            variant="default"
            radius="md"
            leftIcon={<RefreshIcon className="text-lg" />}
            className="bg-primary hover:bg-purple-900 text-white"
            onClick={() => roomQuery.refetch()}
          >
            Re-load
          </Button>
        </div>
      )} */}
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
