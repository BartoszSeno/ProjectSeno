import React from "react";

interface PlayerProps {
  position: { x: number; y: number };
  movment: string;
}

const Player: React.FC<PlayerProps> = ({ position, movment }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: movment,
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: "translate(-50%, -50%)",
        zIndex: 200,
      }}
    />
  );
};

export default Player;
