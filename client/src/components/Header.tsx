import { Avatar, Menu } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// icons

import { FaUserCircle as ProfileIcon } from "react-icons/fa";
import { FiPower as LogoutIcon } from "react-icons/fi";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="sticky inset-0 z-20 w-full p-4 bg-primary text-white">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo-white.png"
            alt="Tekoy"
            className="md:h-9 h-7 aspect-square"
          />
          <span className="md:text-xl text-lg font-extrabold">Tekoy</span>
        </Link>
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
              className="bg-white shadow text-xs md:text-xl text-black px-5 md:px-8 py-2 font-bold rounded md:rounded-md hover:scale-105 transition-all"
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

export default Header;
