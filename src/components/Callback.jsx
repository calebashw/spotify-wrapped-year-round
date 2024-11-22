import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSpotifyStore from "../store/spotifyStore";

const Callback = () => {
  const navigate = useNavigate();
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken);

  useEffect(() => {
    console.log("Callback route hit!");
    const hash = window.location.hash; // Log the entire hash
    console.log("Full URL Hash:", hash);

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    console.log("Parsed Access Token:", accessToken);

    if (accessToken) {
      setAccessToken(accessToken);
      localStorage.setItem("spotifyAccessToken", accessToken);
      window.location.hash = ""; // Clear the hash
      console.log("Navigating to /dashboard...");
      navigate("/dashboard");
    } else {
      console.error("Access token not found. Redirecting to login...");
      navigate("/");
    }
  }, [navigate, setAccessToken]);

  return <div>Callback Route Loaded. Processing...</div>;
};

export default Callback;
