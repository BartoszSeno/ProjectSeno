import React from 'react';

export interface Tree {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TreesProps {
  noEntryOnTree: Tree[];
}

const Trees: React.FC<TreesProps> = ({ noEntryOnTree }) => {
  return (
    <>
      {noEntryOnTree.map((div) => (
        <div
          key={div.id}
          style={{
            width: `${div.width}px`,
            height: `${div.height}px`,
            backgroundColor: 'green',
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

export default Trees;
