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
          >
          <img
            src="https://raw.githubusercontent.com/BartoszSeno/learn/refs/heads/master/trees1.png?token=GHSAT0AAAAAAC46NESJDXTM2FQTA3232JI4Z37XUPA"
            style={{
              position: 'absolute',
              bottom: 0, // Przyklej do dołu diva
              left: '50%', // Wycentruj względem poziomu
              transform: 'translateX(-50%) translateY(0%)', // Przesuń w dół poza granice diva
              height: 'auto', // Zachowanie proporcji
            }}
          />
        </div>
      ))}
    </>
  );
};

export default Trees;
