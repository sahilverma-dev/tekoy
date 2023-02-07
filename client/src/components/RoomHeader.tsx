import { Avatar, Menu, Title, ActionIcon } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaUserCircle as ProfileIcon } from "react-icons/fa";
import { FiPower as LogoutIcon } from "react-icons/fi";
import { IoArrowBack as BackIcon } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

// props type
interface PropType {
  title: string;
}

const RoomHeader = ({ title }: PropType) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="sticky inset-0 w-full p-4 bg-black text-white z-30">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        {/* <Button>Back</Button> */}
        <ActionIcon
          className="bg-white text-black rounded-full"
          onClick={() => navigate(-1)}
          size="lg"
          title="Back"
        >
          <BackIcon />
        </ActionIcon>
        {/* <button 
        
        // onClick={} 
        
        className="flex items-center gap-3">
          <img
            src="/logo-white.png"
            alt="Tekoy"
            className="md:h-9 h-7 aspect-square"
          />
          <span className="md:text-xl text-lg font-extrabold">Tekoy</span>
        </button> */}
        <Title className="text-xl">{title}</Title>
        <div className="flex">
          {user ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar
                  variant="outline"
                  color="dark"
                  // bg="gray"
                  src={user?.avatar}
                  radius="xl"
                  title={user.name}
                  alt={user.name}
                  className="cursor-pointer"
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Hello {user.name}</Menu.Label>
                {/* <Menu.Item disabled>Hello</Menu.Item> */}
                <Menu.Item icon={<ProfileIcon />}>
                  <Link to="/profile">Profile</Link>
                </Menu.Item>

                <Menu.Item color="red" icon={<LogoutIcon />} onClick={logout}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link
              className="bg-white shadow text-xs md:text-base text-black px-5 md:px-8 py-2 font-bold rounded md:rounded-md hover:scale-105 transition-all"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
