const Login = () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000/callback"
    const SCOPES = "user-top-read";
  
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;    
  
    return (
      <div>
        <h1>Spotify Top Artists App</h1>
        <a href={authUrl}>
          <button>Log in with Spotify</button>
        </a>
      </div>
    );
  };
  
  export default Login;
  