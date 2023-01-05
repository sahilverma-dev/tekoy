import { Navigate, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Room from "./pages/Room";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/room/roomID"
        element={user ? <Room /> : <Navigate to="/login" replace />}
      />
      <Route path="/user/userID" element={<Profile />} />
    </Routes>
  );
};

export default App;
