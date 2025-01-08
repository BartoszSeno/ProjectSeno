import React, { useState, useEffect, useRef } from 'react';
import Map from './components/Map.tsx';
import Player from './components/Player.tsx';
import Structuress, { Structures } from './components/Structure.tsx';
import Borders, { Border } from './components/Border.tsx';

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 2000, y: 2000 });
  const [building, setBuilding] = useState<Structures[]>([
    { id: 1, x: 1800, y: 1500, width: 100, height: 100, isColliding: false, name: 'BlackSmith' },
    { id: 2, x: 2200, y: 1700, width: 100, height: 100, isColliding: false, name: 'Hotel' },
    { id: 3, x: 2500, y: 2000, width: 100, height: 100, isColliding: false, name: 'ArmorShop' },
  ]);

  const [noEntry] = useState<Border[]>([
    { id: 1, x: 1000, y: 1800, width: 200, height: 200 },
    { id: 2, x: 2300, y: 2100, width: 150, height: 150 },
  ]);

  const step = 10;
  const keysPressed = useRef<Set<string>>(new Set());

  const handleKeyDown = (event: KeyboardEvent) => {
    keysPressed.current.add(event.key.toLowerCase());
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    keysPressed.current.delete(event.key.toLowerCase());
  };

  const isCollidingWithRed = (playerX: number, playerY: number): boolean => {
    return noEntry.some(
      (div) =>
        playerX + 25 > div.x &&
        playerX - 25 < div.x + div.width &&
        playerY + 25 > div.y &&
        playerY - 25 < div.y + div.height
    );
  };

  const checkYellowCollisions = (playerX: number, playerY: number) => {
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

      if (keysPressed.current.has('w') && !isCollidingWithRed(prev.x, prev.y - step)) {
        newY = Math.max(prev.y - step, 0);
      }
      if (keysPressed.current.has('s') && !isCollidingWithRed(prev.x, prev.y + step)) {
        newY = Math.min(prev.y + step, 4000);
      }
      if (keysPressed.current.has('a') && !isCollidingWithRed(prev.x - step, prev.y)) {
        newX = Math.max(prev.x - step, 0);
      }
      if (keysPressed.current.has('d') && !isCollidingWithRed(prev.x + step, prev.y)) {
        newX = Math.min(prev.x + step, 4000);
      }

      checkYellowCollisions(newX, newY);

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
      </Map>
    </div>
  );
};

export default App;
