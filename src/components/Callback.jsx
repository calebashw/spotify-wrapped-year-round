import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSpotifyStore from "../store/spotifyStore";

const Callback = () => {
  const navigate = useNavigate();
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken);

  useEffect(() => {
    console.log("Callback route hit!");
    const hash = window.location.hash;
    console.log("Current URL:", window.location.href);
    console.log("Full URL Hash:", hash);

    if (!hash) {
      console.error("URL hash is empty. Spotify may not have redirected correctly.");
      navigate("/");
      return;
    }

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    console.log("Parsed Access Token:", accessToken);

    if (accessToken) {
      console.log("Access token found. Storing and navigating to /dashboard...");
      setAccessToken(accessToken);
      localStorage.setItem("spotifyAccessToken", accessToken);
      window.location.hash = ""; // Clear the hash

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000); // Delay for logs/UI updates
    } else {
      console.error("Access token is missing or malformed in the URL hash:", hash);
      localStorage.removeItem("spotifyAccessToken");
      navigate("/");
    }
  }, [navigate, setAccessToken]);

  return <div>Callback Route Loaded. Processing...</div>;
};

export default Callback;
