import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSpotifyStore from "../store/spotifyStore";

const Callback = () => {
  const navigate = useNavigate();
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken);

  useEffect(() => {
    console.log("Callback route hit!");
    console.log("Current URL:", window.location.href);

    const hash = window.location.hash;
    console.log("Full URL Hash:", hash);

    if (!hash) {
      console.error("Hash is empty. Redirect to /.");
      navigate("/");
      return;
    }

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    console.log("Access Token:", accessToken);

    if (accessToken) {
      console.log("Access token found. Navigating to /dashboard...");
      setAccessToken(accessToken);
      localStorage.setItem("spotifyAccessToken", accessToken);
      navigate("/dashboard");
    } else {
      console.error("Access token not found. Redirecting to login...");
      navigate("/");
    }
  }, [navigate, setAccessToken]);

  return <div>Processing login...</div>;
};

export default Callback;
