import React from 'react';

export interface Structures {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isColliding: boolean;
  name: string;
}

interface StructuressProps {
  building: Structures[];
}

const Structuress: React.FC<StructuressProps> = ({ building }) => {
  return (
    <>
      {building.map((div) => (
        <div
          key={div.id}
          id={div.isColliding ? div.name : undefined}
          style={{
            width: `${div.width}px`,
            height: `${div.height}px`,
            backgroundColor: div.isColliding ? 'gray' : 'yellow',
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

export default Structuress;
