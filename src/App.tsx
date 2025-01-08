import React, { useState, useEffect, useRef } from 'react';

interface YellowDiv {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isColliding: boolean;
  name: string;
}

interface RedDiv {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 2000, y: 2000 });
  const [yellowDivs, setYellowDivs] = useState<YellowDiv[]>([
    { id: 1, x: 1800, y: 1500, width: 100, height: 100, isColliding: false, name: 'BlackSmith' },
    { id: 2, x: 2200, y: 1700, width: 100, height: 100, isColliding: false, name: 'Hotel' },
    { id: 3, x: 2500, y: 2000, width: 100, height: 100, isColliding: false, name: 'ArmorShop' },
  ]);

  const [redDivs] = useState<RedDiv[]>([
    { id: 1, x: 1000, y: 1800, width: 200, height: 200 },
    { id: 2, x: 2300, y: 2100, width: 150, height: 150 },
  ]);

  const step = 10; // Prędkość poruszania się postaci
  const keysPressed = useRef<Set<string>>(new Set());

  const handleKeyDown = (event: KeyboardEvent) => {
    keysPressed.current.add(event.key.toLowerCase());
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    keysPressed.current.delete(event.key.toLowerCase());
  };

  // Funkcja sprawdzająca kolizję z czerwonym divem
  const isCollidingWithRed = (playerX: number, playerY: number): boolean => {
    return redDivs.some(
      (div) =>
        playerX + 25 > div.x &&
        playerX - 25 < div.x + div.width &&
        playerY + 25 > div.y &&
        playerY - 25 < div.y + div.height
    );
  };

  // Sprawdzenie kolizji z żółtymi divami
  const checkYellowCollisions = (playerX: number, playerY: number) => {
    setYellowDivs((prevDivs) =>
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

  // Ruch postaci i sprawdzanie kolizji
  const updatePosition = () => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      // Sprawdź każdy kierunek niezależnie
      if (keysPressed.current.has('w') && !isCollidingWithRed(prev.x, prev.y - step)) {
        newY = Math.max(prev.y - step, 0); // Góra
      }
      if (keysPressed.current.has('s') && !isCollidingWithRed(prev.x, prev.y + step)) {
        newY = Math.min(prev.y + step, 4000); // Dół
      }
      if (keysPressed.current.has('a') && !isCollidingWithRed(prev.x - step, prev.y)) {
        newX = Math.max(prev.x - step, 0); // Lewo
      }
      if (keysPressed.current.has('d') && !isCollidingWithRed(prev.x + step, prev.y)) {
        newX = Math.min(prev.x + step, 4000); // Prawo
      }

      // Sprawdź kolizje z żółtymi divami
      checkYellowCollisions(newX, newY);

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const interval = setInterval(updatePosition, 16); // 60 FPS

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
      {/* Mapa */}
      <div
        style={{
          width: '4000px',
          height: '4000px',
          background: 'linear-gradient(135deg, #2c3e50, #34495e)',
          position: 'absolute',
          top: `calc(50% - ${position.y}px)`,
          left: `calc(50% - ${position.x}px)`,
        }}
      >
        {/* Postać */}
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'blue',
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        />

        {/* Żółte divy */}
        {yellowDivs.map((div) => (
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

        {/* Czerwone divy */}
        {redDivs.map((div) => (
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
      </div>
    </div>
  );
};

export default App;
