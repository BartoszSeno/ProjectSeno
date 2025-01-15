import React from "react";

interface PlayerProps {
  position: { x: number; y: number };
}

const Player: React.FC<PlayerProps> = ({ position }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "blue",
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
