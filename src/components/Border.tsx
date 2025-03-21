import React from "react";

export interface Border {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BordersProps {
  allInnBorders: Border[];
}

const Borders: React.FC<BordersProps> = ({ allInnBorders }) => {
  return (
    <>
      {allInnBorders.map((div) => (
        <div
          key={div.id}
          style={{
            width: `${div.width}px`,
            height: `${div.height}px`,
            position: "absolute",
            top: `${div.y}px`,
            left: `${div.x}px`,
            zIndex: 10000,
            border: "2px solid red",
            opacity: 0.5,
            //backgroundColor: "red",
          }}
        />
      ))}
    </>
  );
};

export default Borders;
