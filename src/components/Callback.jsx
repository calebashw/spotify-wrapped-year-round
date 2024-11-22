import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSpotifyStore from "../store/spotifyStore"; // Zustand store

const Callback = () => {
  const navigate = useNavigate();
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
  
    if (accessToken) {
      console.log("Access Token:", accessToken);
  
      // Save token
      setAccessToken(accessToken);
      localStorage.setItem("spotifyAccessToken", accessToken);
  
      // Clear the hash
      window.location.hash = "";
  
      // Log navigation attempt
      console.log("Navigating to /dashboard...");
      navigate("/dashboard");
    } else {
      console.error("Access token not found. Redirecting to login...");
      navigate("/");
    }
  }, [navigate, setAccessToken]);
  

  return <div>Loading...</div>; // Display a loading message while processing
};

export default Callback;
