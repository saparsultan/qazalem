"use client";
import YouTube from "react-youtube";
import { useState } from "react";

const YouTubePlayer = ({ videoId, className }) => {
  const [playState, setPlayState] = useState(false);
  // Set up event handlers
  const onReady = (event) => {
    // Access the player instance
    const player = event.target;

    // For example, you can automatically play the video
    player.pauseVideo();
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      rel: 0,
      showinfo: 0,
    },
  };

  const onError = (error) => {
    console.error("YouTube Player Error:", error);
  };

  return (
    <YouTube
      className={className}
      videoId={videoId}
      opts={opts}
      playing={playState}
      // onReady={onReady}
      onError={onError}
      // loading="dddd"
    />
  );
};

export default YouTubePlayer;
