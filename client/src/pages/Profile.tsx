import { Loader, Text, Title, Tooltip } from "@mantine/core";

import Header from "../components/common/Header";

import { motion } from "framer-motion";

// icons
import { MdVerified as VerifiedIcon } from "react-icons/md";

import Page from "../components/common/Page";
import { useAuth } from "../context/AuthContext";
// import { useQuery } from "react-query";
// import { getProfile } from "../api/profile/getProfile";

const Profile = () => {
  // const profileQuery = useQuery("profile-query", getProfile);
  const { user } = useAuth();
  return (
    <Page>
      <motion.div layout>
        <Header />
        <motion.div
          layout
          className="w-full p-2 sm:p-4 max-w-8xl mx-auto"
          style={{
            height: "calc(100vh - 160px)",
          }}
        >
          <div className="flex items-center justify-center flex-col w-full">
            <div className="flex gap-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-20 aspect-square rounded-full border"
              />
              <p className="flex items-center gap-2 font-bold text-2xl">
                Sahil Verma
                <Tooltip label="This user is verified">
                  <VerifiedIcon
                    className="text-blue-500 cursor-pointer"
                    size={25}
                    title="This user is verified"
                  />
                </Tooltip>
              </p>
            </div>
            <p className="w-1/2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
              inventore non minima illo sunt fugiat corporis asperiores. Velit
              aliquam dolorum reprehenderit molestiae et vero dicta, distinctio
              minus suscipit, laudantium cupiditate!
            </p>
          </div>
          {/* <div
            className="flex items-center flex-col gap-2 justify-center w-full"
            
          >
            <Loader color="indigo" />

            <Text className="text-xs text-slate-800">Loading Rooms...</Text>
          </div> */}
        </motion.div>
      </motion.div>
    </Page>
  );
};

export default Profile;
