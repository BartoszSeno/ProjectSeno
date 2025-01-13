import React, { useState, useEffect, useRef } from "react";
import Map from "./components/Map.tsx";
import Player from "./components/Player.tsx";
import Structuress from "./components/Structure.tsx";
import Borders from "./components/Border.tsx";
import Trees from "./components/Tree.tsx";
import {
  initialPosition as defaultInitialPosition,
  buildings,
  noEntry,
  noEntryOnTree,
  Interiors,
} from "./config/config.tsx";
import { BordersWS } from "./config/config.tsx";

const App = () => {
  // Sprawdź localStorage i ustaw pozycję początkową gracza
  const savedPosition = JSON.parse(
    localStorage.getItem("playerPosition") || "null"
  );
  const [position, setPosition] = useState(
    savedPosition || defaultInitialPosition
  );
  const [building, setBuilding] = useState(buildings);
  const [activeStructure, setActiveStructure] = useState<string | null>(null);
  const isMoving = useRef<boolean>(false);
  const [isKeyPressed, setIsKeyPressed] = useState(false); // Stan do śledzenia, czy klawisz jest wciśnięty
  const [interior, setInterior] = useState(Interiors);

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

  const isColliding = (playerX: number, playerY: number, elements: any[]) =>
    elements.some(
      (div) =>
        playerX + 25 > div.x &&
        playerX - 25 < div.x + div.width &&
        playerY + 25 > div.y &&
        playerY - 25 < div.y + div.height
    );

  const isCollidingWithBorder = (playerX: number, playerY: number) =>
    isColliding(playerX, playerY, noEntry);

  const isCollidingWithTree = (playerX: number, playerY: number) =>
    isColliding(playerX, playerY, noEntryOnTree);

  const allBorders = Interiors.flatMap((interior) => interior.borders || []);

  const isCollidingTest = (playerX: number, playerY: number) =>
    isColliding(playerX, playerY, allBorders);

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
    }
  };
  console.log(interior[0].isColliding);

  const checkInteriorsCollisions = (playerX: number, playerY: number) => {
    setInterior((prevDivs) =>
      prevDivs.map((div) => {
        let isColliding = false;

        if (div.polygon) {
          // Przelicz punkty zapisane w procentach na rzeczywiste współrzędne
          const absolutePolygon = div.polygon.map((point) => {
            const [px, py] = point.split(" ").map((p) => parseFloat(p) / 100);
            return {
              x: div.x + px * div.width,
              y: div.y + py * div.height,
            };
          });

          // Sprawdź, czy gracz jest wewnątrz wielokąta
          isColliding = isPointInPolygon(
            { x: playerX, y: playerY },
            absolutePolygon
          );
        } else {
          // Sprawdzanie kolizji dla prostokąta
          isColliding =
            playerX + 25 > div.x &&
            playerX - 25 < div.x + div.width &&
            playerY + 25 > div.y &&
            playerY - 25 < div.y + div.height;
        }

        return { ...div, isColliding }; // Zwróć zaktualizowaną strukturę
      })
    );
  };

  const isPointInPolygon = (
    point: { x: number; y: number },
    polygon: { x: number; y: number }[]
  ) => {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x,
        yi = polygon[i].y;
      const xj = polygon[j].x,
        yj = polygon[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

      if (intersect) isInside = !isInside;
    }
    return isInside;
  };

  const updatePosition = () => {
    console.log(allBorders);
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      const canMove = (x: number, y: number) =>
        !isCollidingWithBorder(x, y) &&
        !isCollidingWithTree(x, y) &&
        !isCollidingTest(x, y);

      let moved = false;

      if (keysPressed.current.has("w") && canMove(prev.x, prev.y - step)) {
        newY = Math.max(prev.y - step, 0); // Góra
        moved = true;
      }
      if (keysPressed.current.has("s") && canMove(prev.x, prev.y + step)) {
        newY = Math.min(prev.y + step, 4000); // Dół
        moved = true;
      }
      if (keysPressed.current.has("a") && canMove(prev.x - step, prev.y)) {
        newX = Math.max(prev.x - step, 0); // Lewo
        moved = true;
      }
      if (keysPressed.current.has("d") && canMove(prev.x + step, prev.y)) {
        newX = Math.min(prev.x + step, 4000); // Prawo
        moved = true;
      }

      // Jeśli gracz się porusza, sprawdzamy kolizję
      if (moved) {
        checkStructureCollisions(newX, newY);
        checkInteriorsCollisions(newX, newY);
        isMoving.current = true;
        const newPosition = { x: newX, y: newY };
        localStorage.setItem("playerPosition", JSON.stringify(newPosition));
      } else {
        isMoving.current = false;
      }

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    let interval: NodeJS.Timeout;

    if (isKeyPressed) {
      interval = setInterval(updatePosition, 16); // Uruchomienie interwału, gdy klawisz jest wciśnięty
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval); // Sprzątanie po zakończeniu komponentu
    };
  }, [isKeyPressed]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        border: "2px solid black",
      }}
    >
      <Map position={position}>
        <Player position={position} />
        <Structuress
          building={building}
          activeStructure={activeStructure}
          interior={interior}
        />
        <Borders allBorders={allBorders} />
        <Trees noEntryOnTree={noEntryOnTree} />
      </Map>
    </div>
  );
};

export default App;
