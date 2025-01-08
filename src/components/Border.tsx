import React from 'react';

export interface Border {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BordersProps {
  noEntry: Border[];
}

const Borders: React.FC<BordersProps> = ({ noEntry }) => {
  return (
    <>
      {noEntry.map((div) => (
        <div
          key={div.id}
          style={{
            width: `${div.width}px`,
            height: `${div.height}px`,
            backgroundColor: 'red',
            position: 'absolute',
            top: `${div.y}px`,
            left: `${div.x}px`,
            border: '2px solid black',
          }}
        />
      ))}
    </>
  );
};

export default Borders;
