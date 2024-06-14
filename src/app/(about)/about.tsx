'use client'

import { useState, useEffect } from "react";
import "../globals.css";
import axios from 'axios';
import MusicPlayer from "@/components/MusicPlayer";
import AboutMe from "@/components/AboutMe";
import Hobbies from "@/components/Hobbies";
import Twitter from "@/components/Twitter";
import { Spinner } from "@nextui-org/spinner";
import { Suspense } from "react";

export default function About() {
  
  interface Song {
    track: {
      id: string
      name: string,
      preview_url: string,
      duration_ms: number,
      artists: [{
        name: string
      }],
      album: {
        images: [
          {
            url: string
          }
        ]
      }
    }
  }

  // Define the structure for song position
  interface SongPosition {
    backward: number,
    forward: number
  }


  const [playlistInfo, setPlayListInfo] = useState<Song[]>([]);
  const [token, setToken] = useState('');
  const [index, setIndex] = useState(0);
  const [songPosition, setSongPosition] = useState<SongPosition>({ backward: 0, forward: 0 });

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  // Fetch Spotify token
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios({
          method: 'post',
          url: 'https://accounts.spotify.com/api/token',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`)
          },
          data: "grant_type=client_credentials"
        });
        setToken(res.data.access_token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    getToken();

    // Refresh token every hour
    const intervalId = setInterval(getToken, 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [clientId, clientSecret]);


  // Fetch playlist data
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const res = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/playlists/5h1oEk4W9KVMHkOd8WWWlC/tracks',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPlayListInfo(res.data.items);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchData();
  }, [token]);


  // Handle song index from localStorage to prevent reseting when refresh
  useEffect(() => {
    const savedIndex = localStorage.getItem('currentSongIndex');
    if (savedIndex !== null) {
      setIndex(parseInt(savedIndex));
    }

    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % (playlistInfo.length || 1);
        localStorage.setItem('currentSongIndex', newIndex.toString());
        return newIndex;
      });
    }, 300000);

    return () => clearInterval(intervalId);
    
  }, [playlistInfo.length]);
  
  useEffect(() => {
    function removeNull() {
      let newIndex = index;
      while (newIndex < playlistInfo.length) {
        if (playlistInfo[newIndex].track.preview_url !== null) {
          break;
        } else {
          newIndex++;
        }
      }
      if (newIndex !== index) {
        setIndex(newIndex);
      }
    }

    removeNull();
  }, [index, playlistInfo]);

  // Update song position
  useEffect(() => {
    setSongPosition({ backward: index, forward: index });
  }, [index]);


  // Function to play previous song
  const prevSong = () => {
    setSongPosition((prev) => {
      const newIndex = prev.backward > 0 ? prev.backward - 1 : playlistInfo.length - 1;
      setIndex(newIndex);
      localStorage.setItem('currentSongIndex', newIndex.toString());
      return { ...prev, backward: newIndex };
    });
  };


  // Function to play next song
  const nextSong = () => {
    setSongPosition((prev) => {
      const newIndex = (prev.forward + 1) % playlistInfo.length;
      setIndex(newIndex);
      localStorage.setItem('currentSongIndex', newIndex.toString());
      return { ...prev, forward: newIndex };
    });
  };


  if (!playlistInfo.length) {
    return <div className="mt-10"><Spinner label="Loading..." color="current" /></div>;
  }

  // Get current song information



  const artwork: string = playlistInfo[index].track.album.images[0].url;
  const songName: string = playlistInfo[index].track.name;
  const artistsArray: string[] = playlistInfo[index].track.artists.map(artist => artist.name);
  const preview: string = playlistInfo[index].track.preview_url;
  const id: string = playlistInfo[index].track.id
  return (
     
      <div className="w-[100%] flex flex-row justify-center mt-64 mb-20">
      <div className="w-[88%] min-h-[500px]  grid grid-cols-2 gap-4">
  
    <AboutMe />
  
  
  
  
    <Twitter />
  
  
    <MusicPlayer
      songName={songName}
      artistName={artistsArray.join(", ")}
      albumCover={artwork}
      index={index}
      prevSong={prevSong}
      nextSong={nextSong}
      preview={preview}
      id={id}
    />
  
</div>

        </div>

  
  );
}
