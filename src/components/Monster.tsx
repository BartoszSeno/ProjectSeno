import React, { useState } from "react";

type MonsterProps = {
  position: { x: number; y: number }; // Pozycja gracza
  monsterPosition: { x: number; y: number }; // Pozycja potwora
};

const Monster: React.FC<MonsterProps> = ({ position, monsterPosition }) => {
  const [color, setColor] = useState("grey"); // Domyślny kolor

  const tolerance = 200; // Tolerancja dla detekcji osi

  const handleClick = () => {
    const dx = monsterPosition.x - position.x;
    const dy = monsterPosition.y - position.y;

    // Sprawdzenie, czy gracz znajduje się w obrębie tolerancji
    if (Math.abs(dx) <= tolerance && Math.abs(dy) <= tolerance) {
      // Jeżeli gracz nie jest blisko osi, sprawdzamy czy jest w rogu
      if (position.x < monsterPosition.x && position.y < monsterPosition.y) {
        setColor("red"); // Lewy górny róg
      } else if (
        position.x > monsterPosition.x &&
        position.y < monsterPosition.y
      ) {
        setColor("green"); // Prawy górny róg
      } else if (
        position.x < monsterPosition.x &&
        position.y > monsterPosition.y
      ) {
        setColor("purple"); // Lewy dolny róg
      } else if (
        position.x > monsterPosition.x &&
        position.y > monsterPosition.y
      ) {
        setColor("orange"); // Prawy dolny róg
      }
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${monsterPosition.y}px`,
        left: `${monsterPosition.x}px`,
        transform: "translate(-50%, -50%)",
        borderRadius: "8px",
      }}
    >
      {/* Obramowanie przeniesione do osobnego div */}
      <div
        style={{
          width: `${50 + tolerance * 2}px`, // Dostosowanie szerokości do tolerancji
          height: `${50 + tolerance * 2}px`, // Dostosowanie wysokości do tolerancji
          border: `2px solid rgba(0, 0, 0, 0.2)`,
          borderRadius: "8px",
        }}
      ></div>
      {/* Główny div z kolorowaniem */}
      <div
        onClick={handleClick}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: color,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
        }}
      ></div>
    </div>
  );
};

export default Monster;
