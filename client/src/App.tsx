import { useState } from "react";
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
import { ActionIcon, Modal, Tooltip } from "@mantine/core";

// icons
import { AiFillBug as BugIcon } from "react-icons/ai";
import ReportBug from "./components/BugReport";

const App = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
      <Tooltip label="Report a bug" withArrow position="left">
        <ActionIcon
          variant="default"
          size="xl"
          radius="md"
          className="fixed bottom-3 bg-primary hover:bg-purple-800 text-white right-3 aspect-square"
          onClick={() => setModalOpen(true)}
        >
          <BugIcon size={20} />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={modalOpen}
        withCloseButton={false}
        onClose={() => setModalOpen(false)}
        centered
        classNames={{
          modal: "w-full max-w-6xl transition-all",
          overlay: "backdrop-blur",
        }}
      >
        <ReportBug />
      </Modal>
    </AnimatePresence>
  );
};

export default App;
