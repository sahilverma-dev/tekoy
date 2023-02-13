import { User } from "../interfaces";

// mantine ui components
import {
  ActionIcon,
  // Menu,
  Tooltip,
} from "@mantine/core";

// framer motion
import { motion } from "framer-motion";

// constants
import { item } from "../constants/variants";
import { getRandomColors } from "../utils";

// icons
// import { HiDotsVertical as DotsIcon } from "react-icons/hi";
// import { FaUserCircle as UserCircleIcon } from "react-icons/fa";
// import { IoIosRemoveCircle as RemoveIcon } from "react-icons/io";
import {
  BsMicFill as MicOnIcon,
  BsMicMuteFill as MicOffIcon,
} from "react-icons/bs";

// props
interface Props {
  user: User;
  micActive: boolean;
  provideRef: any;
}

const RoomUserCard = ({ user, provideRef, micActive }: Props) => {
  return (
    <motion.div
      layout
      variants={item}
      whileHover={{
        scale: 1.09,
      }}
      className="relative w-full h-full flex group items-center justify-around p-2 flex-col aspect-square shrink-0 rounded-md transition-all hover:bg-black/10 hover:border-black/10 hover:shadow-lg border border-transparent"
    >
      {/* <Menu width={150} shadow="md" transition="fade">
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            radius="xl"
            color="dark"
            className="absolute hidden group-hover:flex top-2 right-2"
          >
            <DotsIcon />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            component="a"
            href={`/user/${user.id}`}
            target="_blank"
            icon={<UserCircleIcon />}
          >
            Profile
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" icon={<RemoveIcon />}>
            Remove
          </Menu.Item>
        </Menu.Dropdown>
      </Menu> */}
      <div className="relative h-full mx-auto aspect-square max-h-24">
        <img
          src={user.avatar}
          alt=""
          className="h-full aspect-square block rounded-full object-cover object-center border-4 md:border-[6px]"
          style={{
            borderColor: getRandomColors(),
          }}
        />
        <ActionIcon
          size="sm"
          variant="default"
          radius="xl"
          className={`border-0 text-zinc-200 absolute bottom-1 right-1 ${
            micActive
              ? "bg-zinc-900 hover:bg-zinc-700"
              : "bg-red-600 hover:bg-red-800"
          }`}
        >
          {micActive ? <MicOnIcon size={10} /> : <MicOffIcon size={10} />}
        </ActionIcon>
      </div>
      <Tooltip
        label={user.name}
        withArrow
        position="bottom"
        className="font-bold w-full truncate text-center"
      >
        <p>{user.name}</p>
      </Tooltip>
      <audio
        src=""
        ref={(instance) => provideRef(instance, user?.id)}
        autoPlay
      />
    </motion.div>
  );
};

export default RoomUserCard;
