"use client";
import YouTube from "react-youtube";

export default function YouTubePlayer({ videoId, className }) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
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
      playing={false}
      onError={onError}
    />
  );
}
