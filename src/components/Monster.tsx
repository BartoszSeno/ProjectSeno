import React, { useState, useEffect } from "react";

const Monster = ({
  position,
  monsterPosition,
  setIsPlayerAttacking,
  setPlayerAttack,
  currentHP,
  setCurrentHP,
}: {
  position: { x: number; y: number };
  monsterPosition: { x: number; y: number };
  setIsPlayerAttacking: any;
  setPlayerAttack: any;
  currentHP: any;
  setCurrentHP: any;
}) => {
  const [color, setColor] = useState("grey"); // Domyślny kolor
  const [isWithinTolerance, setIsWithinTolerance] = useState(false); // Czy gracz jest w tolerancji
  const [isAttackActivated, setIsAttackActivated] = useState(false); // Czy atak został aktywowany kliknięciem
  const [hp, setHp] = useState(10); // Punkty życia potwora
  const [attackInterval, setAttackInterval] = useState(1); // Interwał atakowania w sekundach
  const [isMonsterAlive, setIsMonsterAlive] = useState<boolean>(true);

  const tolerance = 200; // Tolerancja dla detekcji osi

  // Obserwowanie pozycji gracza w stosunku do potwora
  useEffect(() => {
    const dx = monsterPosition.x - position.x;
    const dy = monsterPosition.y - position.y;

    const withinTolerance =
      Math.abs(dx) <= tolerance && Math.abs(dy) <= tolerance;

    setIsWithinTolerance(withinTolerance);

    // Jeśli gracz wyjdzie poza tolerancję, resetujemy atak
    if (!withinTolerance) {
      setPlayerAttack(""); // Usunięcie ataku
      setIsAttackActivated(false); // Reset aktywacji ataku
      setIsPlayerAttacking(false); // Resetujemy atak gracza
    } else if (withinTolerance && isAttackActivated) {
      // Automatyczna zmiana ataku, gdy gracz zmienia pozycję w tolerancji i atak jest aktywowany
      if (position.x < monsterPosition.x && position.y < monsterPosition.y) {
        setColor("red"); // Lewy górny róg
        setPlayerAttack(
          "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightDownAttack.gif"
        );
      } else if (
        position.x > monsterPosition.x &&
        position.y < monsterPosition.y
      ) {
        setColor("green"); // Prawy górny róg
        setPlayerAttack(
          "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/leftDownAttack.gif"
        );
      } else if (
        position.x < monsterPosition.x &&
        position.y > monsterPosition.y
      ) {
        setColor("purple"); // Lewy dolny róg
        setPlayerAttack(
          "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightUpAttack.gif"
        );
      } else if (
        position.x > monsterPosition.x &&
        position.y > monsterPosition.y
      ) {
        setColor("orange"); // Prawy dolny róg
        setPlayerAttack(
          "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/LeftUpAttack.gif"
        );
      }
    }
  }, [
    position,
    monsterPosition,
    tolerance,
    setPlayerAttack,
    setIsPlayerAttacking,
    isAttackActivated,
  ]);

  // Zadawanie obrażeń co określony interwał czasu, gdy gracz jest w tolerancji i atak jest aktywny
  useEffect(() => {
    let monsterDamageInterval: NodeJS.Timeout | null = null;
    let playerDamageInterval: NodeJS.Timeout | null = null;

    // Sprawdzamy, czy gracz jest w tolerancji i atak jest aktywowany
    if (isWithinTolerance && isAttackActivated && hp > 0) {
      monsterDamageInterval = setInterval(() => {
        setHp((prevHp) => {
          const newHp = Math.max(prevHp - 1, 0);
          if (newHp === 0) {
            console.log("monster has killed");
            setIsMonsterAlive(false);
            setIsPlayerAttacking(false);
            // Tu możesz dodać, że potwór zginął
          }
          return newHp;
        });
      }, attackInterval * 1000); // Co atakInterval sekund

      // Atak potwora na gracza
      playerDamageInterval = setInterval(() => {
        setCurrentHP((prevHP) => {
          const newHP = prevHP - 10; // Potwór zadaje 10 obrażeń na sekundę
          if (newHP <= 0) {
            console.log("Player has died");
            // Tu możesz dodać, że gracz zginął
          }
          return newHP;
        });
      }, 1000); // Co sekundę atak potwora na gracza
    } else {
      // Gdy gracz nie jest w tolerancji lub atak nie jest aktywowany
      if (monsterDamageInterval) clearInterval(monsterDamageInterval);
      if (playerDamageInterval) clearInterval(playerDamageInterval);
    }

    // Czyszczenie interwałów przy zakończeniu
    return () => {
      if (monsterDamageInterval) clearInterval(monsterDamageInterval);
      if (playerDamageInterval) clearInterval(playerDamageInterval);
    };
  }, [isWithinTolerance, isAttackActivated, attackInterval, hp, currentHP]);

  // Funkcja wywoływana po kliknięciu
  const handleClick = () => {
    if (isWithinTolerance) {
      setIsAttackActivated(true); // Aktywujemy atak po kliknięciu
      setIsPlayerAttacking(true); // Atak ustawiony na true po kliknięciu

      // Ustawienie koloru i animacji ataku
      if (position.x < monsterPosition.x && position.y < monsterPosition.y) {
        setColor("red"); // Lewy górny róg
        setPlayerAttack(
          "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightDownAttack.gif"
        );
      } else if (
        position.x > monsterPosition.x &&
        position.y < monsterPosition.y
      ) {
        setColor("green"); // Prawy górny róg
        setPlayerAttack(
          "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/leftDownAttack.gif"
        );
      } else if (
        position.x < monsterPosition.x &&
        position.y > monsterPosition.y
      ) {
        setColor("purple"); // Lewy dolny róg
        setPlayerAttack(
          "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightUpAttack.gif"
        );
      } else if (
        position.x > monsterPosition.x &&
        position.y > monsterPosition.y
      ) {
        setColor("orange"); // Prawy dolny róg
        setPlayerAttack(
          "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/LeftUpAttack.gif"
        );
      }
    }
  };

  // Obliczanie szerokości zielonej i czerwonej części paska życia
  const greenWidth = (hp / 10) * 100; // Szerokość zielonej części (w %)
  const redWidth = 100 - greenWidth; // Szerokość czerwonej części (w %)

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

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: `${isMonsterAlive ? "flex" : "none"}`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Pasek życia */}
        <div
          style={{
            width: "80px", // Szerokość paska życia
            height: "6px", // Wysokość paska życia
            marginBottom: "80px", // Odstęp od głównego diva
            display: "flex",
          }}
        >
          {/* Zielona część paska */}
          <div
            style={{
              width: `${greenWidth}%`,
              height: "100%",
              backgroundColor: "green",
              transition: "width 0.5s ease", // Animacja zmniejszania paska
            }}
          ></div>
          {/* Czerwona część paska */}
          <div
            style={{
              width: `${redWidth}%`,
              height: "100%",
              backgroundColor: "red",
              transition: "width 0.5s ease", // Animacja zwiększania czerwonej części
            }}
          ></div>
        </div>
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
            cursor: isWithinTolerance ? "pointer" : "not-allowed",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Monster;
