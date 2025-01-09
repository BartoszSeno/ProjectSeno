import React from "react";

interface MapProps {
  position: { x: number; y: number };
  children: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ position, children }) => {
  return (
    <div
      style={{
        width: "4000px",
        height: "4000px",
        backgroundColor: "#2F4F4F",
        position: "absolute",
        top: `calc(50% - ${position.y}px)`,
        left: `calc(50% - ${position.x}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default Map;
