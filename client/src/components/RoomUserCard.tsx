import { Link } from "react-router-dom";
import { User } from "../interfaces";

// framer motion
import { motion } from "framer-motion";
import { item } from "../constants/variants";
import { getRandomColors } from "../utils";

// props
interface Props {
  user: User;
}

const RoomUserCard = ({ user }: Props) => {
  return (
    <motion.div
      layout
      variants={item}
      className="w-full flex items-center shrink-0 gap-2 flex-col"
    >
      <img
        src={user.avatar}
        alt=""
        className="w-full aspect-square block rounded-full object-cover object-center border-4 md:border-[6px]"
        style={{
          borderColor: getRandomColors(),
        }}
      />
      <Link to={`/user/${user?._id}`} className="font-bold w-full truncate">
        {user.name}
      </Link>
    </motion.div>
  );
};

export default RoomUserCard;
