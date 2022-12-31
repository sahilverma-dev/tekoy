import { Button } from "@mantine/core";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  return (
    <div>
      helo
      {user ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <button onClick={loginWithGoogle}>Login</button>
      )}
    </div>
  );
};

export default Home;
