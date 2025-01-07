import React, { useState, useEffect, useRef } from 'react';

interface YellowDiv {
  id: number;         // Unikalny identyfikator diva
  x: number;          // Pozycja X na mapie
  y: number;          // Pozycja Y na mapie
  width: number;      // Szerokość diva
  height: number;     // Wysokość diva
  isColliding: boolean; // Czy postać dotyka tego diva
}

const App: React.FC = () => {
 // Stan pozycji postaci
 const [position, setPosition] = useState({ x: 2000, y: 2000 });
 const [yellowDivs, setYellowDivs] = useState<YellowDiv[]>([
   { id: 1, x: 1800, y: 1500, width: 100, height: 100, isColliding: false },
   { id: 2, x: 2200, y: 1700, width: 100, height: 100, isColliding: false },
   { id: 3, x: 2500, y: 2000, width: 100, height: 100, isColliding: false },
 ]);

 const step = 10; // Prędkość poruszania się postaci

 const keysPressed = useRef<Set<string>>(new Set());

 const handleKeyDown = (event: KeyboardEvent) => {
   keysPressed.current.add(event.key.toLowerCase());
 };

 const handleKeyUp = (event: KeyboardEvent) => {
   keysPressed.current.delete(event.key.toLowerCase());
 };

 // Sprawdzenie kolizji z każdym żółtym divem
 const checkCollisions = (playerX: number, playerY: number) => {
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

     if (keysPressed.current.has('w')) newY = Math.max(prev.y - step, 0); // Góra
     if (keysPressed.current.has('s')) newY = Math.min(prev.y + step, 4000); // Dół
     if (keysPressed.current.has('a')) newX = Math.max(prev.x - step, 0); // Lewo
     if (keysPressed.current.has('d')) newX = Math.min(prev.x + step, 4000); // Prawo

     // Sprawdzenie kolizji
     checkCollisions(newX, newY);

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
     </div>
   </div>
 );
};

export default App;
