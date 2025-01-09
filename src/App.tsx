import React, { useState, useEffect, useRef } from 'react';
import Map from './components/Map.tsx';
import Player from './components/Player.tsx';
import Structuress from './components/Structure.tsx';
import Borders from './components/Border.tsx';
import Trees from './components/Tree.tsx';
import { initialPosition, buildings, noEntry, noEntryOnTree } from './config/config.tsx';


const App  = () => {
  const [position, setPosition] = useState(initialPosition);
  const [building, setBuilding] = useState(buildings);
    const [activeStructure, setActiveStructure] = useState<string | null>(null);
    const isMoving = useRef<boolean>(false);
    const [isKeyPressed, setIsKeyPressed] = useState(false); // Stan do śledzenia, czy klawisz jest wciśnięty

  const step = 10;
  const keysPressed = useRef<Set<string>>(new Set());

  const handleKeyDown = (event: KeyboardEvent) => {
    keysPressed.current.add(event.key.toLowerCase());
    setIsKeyPressed(true); // Ustawiamy stan na true, gdy klawisz jest wciśnięty
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    keysPressed.current.delete(event.key.toLowerCase());
    if (keysPressed.current.size === 0) {
      setIsKeyPressed(false); // Ustawiamy stan na false, gdy żaden klawisz nie jest wciśnięty
    }
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
    let collisionDetected = false;
    setBuilding((prevDivs) => {
      return prevDivs.map((div) => {
        const isColliding =
          playerX + 25 > div.x &&
          playerX - 25 < div.x + div.width &&
          playerY + 25 > div.y &&
          playerY - 25 < div.y + div.height;

        // Jeśli kolizja, zaktualizuj isColliding i ustaw aktywną strukturę
        if (isColliding && !collisionDetected) {
          setActiveStructure(div.name); // Ustawienie aktywnej struktury
          collisionDetected = true;
        }
        
        return { ...div, isColliding }; // Zwróć zaktualizowaną strukturę
      });
    });
    
    // Jeśli nie ma kolizji, ustaw aktywną strukturę na null
    if (!collisionDetected) {
      setActiveStructure(null);
    }
  };

  const updatePosition = () => {
console.log("test")
setPosition((prev) => {

      let newX = prev.x;
      let newY = prev.y;

      const canMove = (x: number, y: number) =>
        !isCollidingWithBorder(x, y) && !isCollidingWithTree(x, y);

      let moved = false;

      if (keysPressed.current.has('w') && canMove(prev.x, prev.y - step)) {
        newY = Math.max(prev.y - step, 0); // Góra
        moved = true;
      }
      if (keysPressed.current.has('s') && canMove(prev.x, prev.y + step)) {
        newY = Math.min(prev.y + step, 4000); // Dół
        moved = true;
      }
      if (keysPressed.current.has('a') && canMove(prev.x - step, prev.y)) {
        newX = Math.max(prev.x - step, 0); // Lewo
        moved = true;
      }
      if (keysPressed.current.has('d') && canMove(prev.x + step, prev.y)) {
        newX = Math.min(prev.x + step, 4000); // Prawo
        moved = true;
      }

      // Jeśli gracz się porusza, sprawdzamy kolizję
      if (moved) {
        checkStructureCollisions(newX, newY);
        isMoving.current = true;
      } else {
        isMoving.current = false;
      }

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    let interval: NodeJS.Timeout;

    if (isKeyPressed) {
      interval = setInterval(updatePosition, 16); // Uruchomienie interwału, gdy klawisz jest wciśnięty
    } 

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(interval); // Sprzątanie po zakończeniu komponentu
    };
  }, [isKeyPressed]); 

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
        <Structuress building={building} activeStructure={activeStructure}/>
        <Borders noEntry={noEntry} />
        <Trees noEntryOnTree={noEntryOnTree} />
      </Map>
    </div>
  );
};

export default App;
