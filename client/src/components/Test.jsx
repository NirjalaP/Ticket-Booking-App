import React from "react"
import ReactPlayer from "react-player"

export default function TestPlayer() {
  return (
    <div style={{ width: 960, margin: "40px auto" }}>
<video
  src={currentTrailer.videoUrl}
  controls
  autoPlay
  muted
  className="w-full max-w-[960px]"
/>    </div>
  )
}
