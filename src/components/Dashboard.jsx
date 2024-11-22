import React, { useEffect, useState } from "react";
import "../style/Dashboard.css";

const Dashboard = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = localStorage.getItem("spotifyAccessToken");

  useEffect(() => {
    if (!accessToken) {
      console.error("Access Token is missing.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const fetchData = async () => {
      try {
        // Fetch Top Artists
        const artistsResponse = await fetch(
          "https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term",
          { headers }
        );
        if (!artistsResponse.ok) throw new Error(`Error: ${artistsResponse.status}`);
        const artistsData = await artistsResponse.json();
        setTopArtists(artistsData.items || []);

        // Fetch Top Songs
        const songsResponse = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term",
          { headers }
        );
        if (!songsResponse.ok) throw new Error(`Error: ${songsResponse.status}`);
        const songsData = await songsResponse.json();
        setTopSongs(songsData.items || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <section className="top-artists">
            <h1 className="header">🎤 Your Top Artists</h1>
            {topArtists.length === 0 ? (
              <p>No top artists available.</p>
            ) : (
              <ul className="artist-list">
                {topArtists.map((artist) => (
                  <li key={artist.id} className="artist-item">
                    <img
                      src={artist.images[0]?.url}
                      alt={artist.name}
                      className="artist-image"
                      onClick={() => window.open(artist.external_urls.spotify, "_blank")}
                    />
                    <span>{artist.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="top-songs">
            <h1 className="header">🎵 Your Top Songs</h1>
            {topSongs.length === 0 ? (
              <p>No top songs available.</p>
            ) : (
              <ul className="song-list">
                {topSongs.map((song) => (
                  <li key={song.id} className="song-item">
                    <img
                      src={song.album.images[0]?.url}
                      alt={song.name}
                      className="song-image"
                    />
                    <span>{song.name} - {song.artists[0].name}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
