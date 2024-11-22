import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";


const Callback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const exchangeCodeForToken = useCallback(async (authCode) => {
    try {
      const response = await fetch("http://localhost:5000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authCode }),
      });

      const data = await response.json();
      console.log(data); // Handle your token here
    } catch (error) {
      console.error("Error exchanging token:", error);
    }
  }, []); // Empty dependency array ensures this function is only created once

  useEffect(() => {
    if (code) {
      exchangeCodeForToken(code);
    }
  }, [code, exchangeCodeForToken]); // Safe to add exchangeCodeForToken now

  return <div>Authenticating...</div>;
};

export default Callback;
