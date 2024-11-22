const Login = () => {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const SCOPES = "user-top-read";

  if (!CLIENT_ID) {
    console.error("Spotify CLIENT_ID is missing. Please check your .env file.");
  }

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES)}`;

  console.log("CLIENT_ID:", CLIENT_ID);
  console.log("Redirect URI:", REDIRECT_URI);
  console.log("Auth URL:", authUrl);

  return (
    <div>
      <h1>Spotify Top Artists App</h1>
      <button onClick={() => (window.location.href = authUrl)}>Log in with Spotify</button>
    </div>
  );
};

export default Login;
