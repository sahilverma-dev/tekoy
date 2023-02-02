import { useState } from "react";
import { Title, Button, Modal } from "@mantine/core";
import Header from "../components/common/Header";

import {
  motion,
  // useAnimation
} from "framer-motion";

// icons
import { BiSearch as SearchIcon } from "react-icons/bi";
import { HiPlus as AddIcon } from "react-icons/hi";
import RoomCard from "../components/RoomCard";
import { container } from "../constants/variants";
import { useMediaQuery } from "@mantine/hooks";
import Page from "../components/common/Page";

const Home = () => {
  // const controls = useAnimation();

  const isMobile = useMediaQuery("(max-width: 600px)");
  const [opened, setOpened] = useState<boolean>(false);
  const openModal = () => setOpened(true);
  const closeModal = () => setOpened(false);
  return (
    <Page>
      <motion.div layout>
        <Header />
        <motion.div
          layout
          className="min-h-screen w-full p-2 sm:p-4 max-w-8xl mx-auto"
        >
          <motion.div
            layout
            className="flex flex-wrap items-center gap-2 justify-between"
          >
            <motion.div
              layout
              className="border rounded-full focus-within:border-black w-full sm:w-1/2 px-4 py-2 transition-all flex items-center gap-2"
            >
              <SearchIcon />
              <input
                type="search"
                placeholder="Search for the rooms"
                className="text-xs outline-none w-full h-full"
              />
            </motion.div>
            <Title order={1} className="text-lg sm:text-xl sm:-order-1">
              All Rooms
            </Title>
            <motion.div layout>
              <Button
                variant="filled"
                onClick={openModal}
                className="bg-green-600 hover:bg-green-500 active:bg-green-900 font-bold flex items-center p-1 sm:pr-3 transition-all"
                radius="xl"
              >
                <div className="bg-white text-green-700 p-1.5 sm:mr-1 rounded-full">
                  <AddIcon />
                </div>
                <span className="hidden sm:inline">Create a new Room</span>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            layout
            variants={container}
            initial="hidden"
            animate="visible"
            // animate={control}
            className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-2 my-4"
          >
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
          </motion.div>
          {/* <div
            className="flex items-center flex-col gap-2 justify-center w-full"
            style={{
              height: "calc(100vh - 160px)",
            }}
          >
            <Loader color="indigo" />
            <Text>
              There's no room. Be the first to{" "}
              <span
                onClick={openModal}
                className="text-blue-600 cursor-pointer font-bold"
              >
                create one
              </span>
            </Text>
            <Text className="text-xs text-slate-800">Loading Rooms...</Text>
          </div> */}
        </motion.div>
      </motion.div>
      <Modal
        opened={opened}
        fullScreen={isMobile}
        centered
        color="red"
        // overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.8}
        overlayBlur={3}
        size="80%"
        overflow="inside"
        onClose={closeModal}
        title="Create new Room"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        {/* Modal content */}
      </Modal>
    </Page>
  );
};

export default Home;
