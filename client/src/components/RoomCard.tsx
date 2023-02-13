import { Image, Title, Avatar, Text, Tooltip } from "@mantine/core";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { item } from "../constants/variants";
import { RoomType, User } from "../interfaces";

// props type
interface PropsType {
  room: RoomType;
}

const RoomCard = ({ room }: PropsType) => {
  return (
    <motion.div variants={item} layout className="mb-3">
      <div className="relative rounded-lg">
        <Link to={`/room/${room._id}`}>
          <div className="overlay rounded-lg overflow-hidden" />
          <Image
            src={room.thumbnail}
            withPlaceholder
            alt="Without placeholder"
            imageProps={{
              loading: "lazy",
              className:
                "aspect-video rounded-lg overflow-hidden h-full w-full object-cover border",
            }}
          />
        </Link>
        <Link to={`/user/${room.user.id}`}>
          <Tooltip label={`${room.user.name} is Speaking`} withArrow>
            <Avatar
              className="absolute bottom-0 right-2 translate-y-1/2 z-20 shadow-md hover:scale-125 transition-all aspect-square h-12 w-12"
              src={room.user.avatar}
              alt={room.user.name}
              radius="xl"
            />
          </Tooltip>
        </Link>
      </div>
      <div className="flex gap-1 items-center my-1">
        {room.listeners.length > 0 ? (
          <>
            <Avatar.Group>
              {room.listeners.slice(0, 3).map((listener: User) => (
                <Link key={listener.id} to={`/user/${listener.id}`}>
                  <Tooltip label={listener.name} withArrow className="text-xs">
                    <Avatar
                      src={listener.avatar}
                      alt={listener.name}
                      radius="xl"
                      size="md"
                      className="hover:scale-125 transition-all border border-black"
                    />
                  </Tooltip>
                </Link>
              ))}
            </Avatar.Group>
            <Text className="text-sm text-slate-600 ">
              {room.listeners.length - 3 === 0
                ? "listeners"
                : `+${room.listeners.length - 3} listeners`}
            </Text>
          </>
        ) : (
          <Text className="text-xs text-slate-600 my-2">No Listeners</Text>
        )}
      </div>
      <Link to={`/room/${room._id}`}>
        <Title order={2} className="text-lg truncate">
          {room.title}
        </Title>
      </Link>
    </motion.div>
  );
};

export default RoomCard;
