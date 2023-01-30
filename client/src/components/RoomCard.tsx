import { Image, Title, Avatar, Text, Tooltip } from "@mantine/core";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { item } from "../constants/varients";

const RoomCard = () => {
  return (
    <motion.div variants={item} layout className="mb-3">
      <div className="relative rounded-lg">
        <Link to={`/room/roomID`}>
          <div className="overlay rounded-lg overflow-hidden" />
          <Image
            src="https://img.freepik.com/free-vector/night-ocean-landscape-full-moon-stars-shine_107791-7397.jpg?w=2000"
            withPlaceholder
            alt="Without placeholder"
            imageProps={{
              loading: "lazy",
              className:
                "aspect-video rounded-lg overflow-hidden h-full w-full object-cover border",
            }}
          />
        </Link>
        <Link to={`/user/userID`}>
          <Tooltip label={`Sahil is Speaking`} withArrow>
            <Avatar
              className="absolute bottom-0 right-2 translate-y-1/2 z-20 border border-black shadow-md hover:scale-125 transition-all"
              src="https://lh3.googleusercontent.com/a/AEdFTp5pquuNymzEj7041BrINbzZXXLY9IRlCX4XGgMgZQ=s96-c"
              radius="xl"
            />
          </Tooltip>
        </Link>
      </div>
      <div className="flex gap-1 items-center my-1">
        <Avatar.Group>
          <Link to={`/user/userID`}>
            <Tooltip label="Sahil Verma" withArrow className="text-xs z-50">
              <Avatar
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                radius="xl"
                size="sm"
                className="hover:scale-125 transition-all"
              />
            </Tooltip>
          </Link>
          <Link to={`/user/userID`}>
            <Tooltip label="Sahil Verma" withArrow className="text-xs">
              <Avatar
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                radius="xl"
                size="sm"
                className="hover:scale-125 transition-all"
              />
            </Tooltip>
          </Link>
          <Link to={`/user/userID`}>
            <Tooltip label="Sahil Verma" withArrow className="text-xs">
              <Avatar
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                radius="xl"
                size="sm"
                className="hover:scale-125 transition-all"
              />
            </Tooltip>
          </Link>
          <Link to={`/user/userID`}>
            <Tooltip label="Sahil Verma" withArrow className="text-xs">
              <Avatar
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                radius="xl"
                size="sm"
                className="hover:scale-125 transition-all"
              />
            </Tooltip>
          </Link>
          <Link to={`/user/userID`}>
            <Tooltip label="Sahil Verma" withArrow className="text-xs">
              <Avatar
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                radius="xl"
                size="sm"
                className="hover:scale-125 transition-all"
              />
            </Tooltip>
          </Link>
        </Avatar.Group>
        <Text className="text-xs text-slate-600 ">10 listeners</Text>
      </div>
      <Link to={`/room/roomID`}>
        <Title order={2} className="text-lg truncate">
          How to start coding as beginner?
        </Title>
      </Link>
    </motion.div>
  );
};

export default RoomCard;
