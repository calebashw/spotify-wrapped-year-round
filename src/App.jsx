import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import useSpotifyStore from "./store/spotifyStore"; // Zustand store

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken); // Zustand function

  useEffect(() => {
    console.log("Current URL:", window.location.href);

    if (window.location.hash.includes("access_token")) {
      const hash = window.location.hash;
      // console.log("URL Hash:", hash);

      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");

      // console.log("Access Token Retrieved:", accessToken);

      if (accessToken) {
        // Save to Zustand store
        setAccessToken(accessToken);

        // Save token to localStorage (optional for persistence)
        localStorage.setItem("spotifyAccessToken", accessToken);

        // Clear the hash to clean up the URL
        window.location.hash = "";

        // Redirect to the dashboard
        navigate("/dashboard");
      }
    } else {
      // console.log("No access token found in URL hash.");
    }
  }, [navigate, setAccessToken]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
