import React from "react";

export interface Border {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BordersProps {
  allBorders: Border[];
}

const Borders: React.FC<BordersProps> = ({ allBorders }) => {
  return (
    <>
      {allBorders.map((div) => (
        <div
          key={div.id}
          style={{
            width: `${div.width}px`,
            height: `${div.height}px`,
            position: "absolute",
            top: `${div.y}px`,
            left: `${div.x}px`,
            zIndex: 10000,
            border: "2px solid black",
            opacity: 0.5,
          }}
        />
      ))}
    </>
  );
};

export default Borders;
