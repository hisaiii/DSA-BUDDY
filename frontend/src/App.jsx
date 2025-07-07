import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Questions from "./pages/Questions";
import { Toaster } from "react-hot-toast";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <UserProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/logout" element={<Logout />} />

        </Routes>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </Router>
    </UserProvider>

  );
};

export default App;

// Root routing logic
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/questions" />
  ) : (
    <Navigate to="/login" />
  );
};
