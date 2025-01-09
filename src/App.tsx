import React, { useState, useEffect, useRef } from 'react';
import Map from './components/Map.tsx';
import Player from './components/Player.tsx';
import Structuress from './components/Structure.tsx';
import Borders from './components/Border.tsx';
import Trees from './components/Tree.tsx';
import { initialPosition, buildings, noEntry, noEntryOnTree } from './config/config.tsx';


const App: React.FC = () => {
  const [position, setPosition] = useState(initialPosition);
  const [building, setBuilding] = useState(buildings);

  const step = 10;
  const keysPressed = useRef<Set<string>>(new Set());

  const handleKeyDown = (event: KeyboardEvent) => {
    keysPressed.current.add(event.key.toLowerCase());
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    keysPressed.current.delete(event.key.toLowerCase());
  };

  const isCollidingWithBorder = (playerX: number, playerY: number): boolean => {
    return noEntry.some(
      (div) =>
        playerX + 25 > div.x &&
        playerX - 25 < div.x + div.width &&
        playerY + 25 > div.y &&
        playerY - 25 < div.y + div.height
    );
  };

  const isCollidingWithTree = (playerX: number, playerY: number): boolean => {
    return noEntryOnTree.some(
      (div) =>
        playerX + 25 > div.x &&
        playerX - 25 < div.x + div.width &&
        playerY + 25 > div.y &&
        playerY - 25 < div.y + div.height
    );
  };

  const checkStructureCollisions = (playerX: number, playerY: number) => {
    setBuilding((prevDivs) =>
      prevDivs.map((div) => ({
        ...div,
        isColliding:
          playerX + 25 > div.x &&
          playerX - 25 < div.x + div.width &&
          playerY + 25 > div.y &&
          playerY - 25 < div.y + div.height,
      }))
    );
  };

  const updatePosition = () => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;
  
      const canMove = (x: number, y: number) => 
        !isCollidingWithBorder(x, y) && !isCollidingWithTree(x, y);
  
      if (keysPressed.current.has('w') && canMove(prev.x, prev.y - step)) {
        newY = Math.max(prev.y - step, 0); // Góra
      }
      if (keysPressed.current.has('s') && canMove(prev.x, prev.y + step)) {
        newY = Math.min(prev.y + step, 4000); // Dół
      }
      if (keysPressed.current.has('a') && canMove(prev.x - step, prev.y)) {
        newX = Math.max(prev.x - step, 0); // Lewo
      }
      if (keysPressed.current.has('d') && canMove(prev.x + step, prev.y)) {
        newX = Math.min(prev.x + step, 4000); // Prawo
      }
  
      checkStructureCollisions(newX, newY);
  
      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const interval = setInterval(updatePosition, 16);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        border: '2px solid black',
      }}
    >
      <Map position={position}>
        <Player position={position} />
        <Structuress building={building} />
        <Borders noEntry={noEntry} />
        <Trees noEntryOnTree={noEntryOnTree} />
      </Map>
    </div>
  );
};

export default App;
