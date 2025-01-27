import React from "react";

interface PlayerProps {
  position: { x: number; y: number };
  movment: string;
}

const Player: React.FC<PlayerProps> = ({ position, movment }) => {
  return (
    <div
      style={{
        width: "99px",
        height: "111px",
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: "translate(-50%, -50%)",
        zIndex: `${position.y}`, // Wyższy indeks dla nadrzędnego diva
        backgroundImage: `url(${movment})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        transition: "background-image 0.3s ease",
      }}
    >
      <div
        style={{
          width: "59px",
          height: "29px",
          backgroundColor: "blue",
          bottom: "4px",
          left: "50.6%",
          transform: "translateX(-50%)",
          position: "absolute",
          opacity: 0.2,
        }}
      />
    </div>
  );
};

export default Player;
