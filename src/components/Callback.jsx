import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSpotifyStore from "../store/spotifyStore"; // Zustand store

const Callback = () => {
  const navigate = useNavigate();
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken);

  useEffect(() => {
    const hash = window.location.hash; // Get the URL fragment
    const params = new URLSearchParams(hash.substring(1)); // Parse the fragment
    const accessToken = params.get("access_token");

    if (accessToken) {
      console.log("Access Token:", accessToken);

      // Save the token to Zustand
      setAccessToken(accessToken);

      // Optionally save to localStorage for persistence
      localStorage.setItem("spotifyAccessToken", accessToken);

      // Clear the hash from the URL
      window.location.hash = "";

      // Redirect to the dashboard
      navigate("/dashboard");
    } else {
      console.error("Access token not found in the URL.");
      navigate("/"); // Redirect to login if no token is found
    }
  }, [navigate, setAccessToken]);

  return <div>Loading...</div>; // Display a loading message while processing
};

export default Callback;
