import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Room from "./pages/Room";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import NotFound from "./pages/NotFound";

const App = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence initial={false} presenceAffectsLayout>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/room/:roomID"
          // element={user ? <Room /> : <Navigate to="/login" replace />}
          element={<Room />}
        />
        <Route path="/user/:userID" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
