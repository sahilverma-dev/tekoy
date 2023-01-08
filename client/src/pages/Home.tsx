import { Title, Button } from "@mantine/core";
import Header from "../components/Header";

import { motion } from "framer-motion";

// icons
import { BiSearch as SearchIcon } from "react-icons/bi";
import { HiPlus as AddIcon } from "react-icons/hi";

const Home = () => {
  return (
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
      </motion.div>
    </motion.div>
  );
};

export default Home;
