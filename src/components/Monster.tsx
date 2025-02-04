import React, { useState, useEffect, useRef } from "react";

export interface MonsterData {
  id: number;
  color: string;
  isWithinTolerance: boolean;
  isAttackActivated: boolean;
  hp: number;
  maxHp: number;
  isMoving: boolean;
  dmg: number;
  currentMonsterPosition: { x: number; y: number };
  attackInterval: number;
  isDead: boolean;
}

interface MonsterProps {
  position: { x: number; y: number };
  setIsPlayerAttacking: (value: boolean) => void;
  // Uwaga: setPlayerAttack oczekuje tylko URL (string)
  setPlayerAttack: (attackUrl: string) => void;
  areaPosition: { x: number; y: number };
  currentHP: number;
  setCurrentHP: any;
}

interface AttackDirection {
  color: any | string;
  url: string;
  // Możesz dodać inne pola, np. width/height, jeśli zajdzie potrzeba
}

const Monster: React.FC<MonsterProps> = ({
  position,
  setIsPlayerAttacking,
  setPlayerAttack,
  areaPosition,
  currentHP,
  setCurrentHP,
}) => {
  const tolerance = 250;
  const movementAreaSize = { x: 1000, y: 1000 };

  // Funkcja generująca potwory
  const generateMonsters = (areaPos: {
    x: number;
    y: number;
  }): MonsterData[] => {
    return [
      {
        id: 1,
        color: "grey",
        isWithinTolerance: false,
        isAttackActivated: false,
        hp: 10,
        maxHp: 10,
        isMoving: true,
        dmg: 2,
        currentMonsterPosition: {
          x: areaPos.x + (Math.random() * 400 - 200),
          y: areaPos.y + (Math.random() * 400 - 200),
        },
        attackInterval: 1,
        isDead: false,
      },
      {
        id: 2,
        color: "grey",
        isWithinTolerance: false,
        isAttackActivated: false,
        hp: 10,
        maxHp: 10,
        isMoving: true,
        dmg: 2,
        currentMonsterPosition: {
          x: areaPos.x + (Math.random() * 400 - 200),
          y: areaPos.y + (Math.random() * 400 - 200),
        },
        attackInterval: 1,
        isDead: false,
      },
    ];
  };

  const [monsters, setMonsters] = useState<MonsterData[]>(
    generateMonsters(areaPosition)
  );
  const monstersRef = useRef(monsters);
  useEffect(() => {
    monstersRef.current = monsters;
  }, [monsters]);

  const [idMonster, setIdMonster] = useState<number | null>(null);

  // Funkcja, która oblicza animację ataku na podstawie pozycji gracza i potwora
  const computeAttackData = (
    monster: MonsterData,
    playerPos: { x: number; y: number }
  ): AttackDirection => {
    // Ustalamy progi dla podziału na kolumny i wiersze
    const horThreshold = 50;
    const verThreshold = 50;

    // Obliczamy różnice – przyjmujemy, że dodatnia wartość oznacza, że potwór znajduje się dalej w prawo (dla dx)
    // oraz niżej (dla dy). Jednak przy określaniu regionu chcemy wiedzieć, czy gracz jest po lewej czy prawej stronie potwora.
    const dx = monster.currentMonsterPosition.x - playerPos.x;
    const dy = monster.currentMonsterPosition.y - playerPos.y;

    let horizontalRegion: "left" | "center" | "right";
    if (dx > horThreshold) {
      horizontalRegion = "left"; // Gracz jest po lewej stronie potwora
    } else if (dx < -horThreshold) {
      horizontalRegion = "right"; // Gracz jest po prawej stronie potwora
    } else {
      horizontalRegion = "center";
    }

    let verticalRegion: "top" | "center" | "bottom";
    if (dy > verThreshold) {
      verticalRegion = "top"; // Gracz jest powyżej potwora
    } else if (dy < -verThreshold) {
      verticalRegion = "bottom"; // Gracz jest poniżej potwora
    } else {
      verticalRegion = "center";
    }

    // Łączymy regiony – jeżeli któryś z nich to "center" możemy pozostawić sam region pionowy lub poziomy.
    let region: string;
    if (verticalRegion === "center" && horizontalRegion === "center") {
      region = "center";
    } else if (verticalRegion === "center") {
      region = horizontalRegion;
    } else if (horizontalRegion === "center") {
      region = verticalRegion;
    } else {
      region = verticalRegion + "-" + horizontalRegion;
    }

    // Mapa regionów do URL-i animacji
    const regionMap: { [key: string]: string } = {
      "top-left":
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightDownAttack.gif", // 1rząd, lewo-góra (100x100)
      top: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/DownAttack.gif", // 1rząd, góra (100x50)
      "top-right":
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/leftDownAttack.gif", // 1rząd, prawo-góra (100x100)
      left: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightAttack.gif", // 2rząd, lewo (50x100)
      // "center" – w centralnej pozycji nie wykonujemy ataku (można zwrócić pusty string)
      right:
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/leftAttack.gif",
      // 2rząd, prawo (50x100)
      "bottom-left":
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightUpAttack.gif", // 3rząd, lewo-dół (100x100)
      bottom:
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/UpAttack.gif",
      // 3rząd, dół (100x50)
      "bottom-right":
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/LeftUpAttack.gif", // 3rząd, prawo-dół (100x100)
    };

    // Mapa regionów na kolory
    const regionColorMapping: { [key: string]: string } = {
      "top-left": "blue",
      top: "red",
      "top-right": "green",
      left: "purple",
      center: "grey",
      right: "orange",
      "bottom-left": "brown",
      bottom: "pink",
      "bottom-right": "yellow",
    };

    // Jeśli region "center" – np. gracz znajduje się blisko środka potwora – nie wykonujemy animacji ataku
    const url = region === "center" ? "" : regionMap[region] || "";
    const color = regionColorMapping[region] || "grey";

    return { url, color };
  };

  // Ustalanie, czy gracz atakuje – aktywny atak, gdy któryś potwór jest w zasięgu i aktywowany
  useEffect(() => {
    const isAnyMonsterActive = monsters.some(
      (monster) =>
        monster.isWithinTolerance &&
        monster.isAttackActivated &&
        !monster.isDead
    );
    setIsPlayerAttacking(isAnyMonsterActive);
  }, [monsters, setIsPlayerAttacking]);

  // Potwory zadają obrażenia graczowi tylko, gdy atak są aktywne
  useEffect(() => {
    const monsterDamageInterval = setInterval(() => {
      setCurrentHP((prevHP) => {
        const totalDamage = monstersRef.current.reduce((total, monster) => {
          if (
            monster.isWithinTolerance &&
            monster.isAttackActivated &&
            !monster.isDead
          ) {
            return total + monster.dmg;
          }
          return total;
        }, 0);
        if (prevHP - totalDamage <= 0) {
          console.log("Gracz umarł");
          return 0;
        }
        return prevHP - totalDamage;
      });
    }, 1000);
    return () => clearInterval(monsterDamageInterval);
  }, [setCurrentHP]);

  // Gracz zadaje obrażenia potworom
  useEffect(() => {
    const damageInterval = setInterval(() => {
      setMonsters((prevMonsters) => {
        const updatedMonsters = prevMonsters.map((monster) => {
          if (
            monster.isWithinTolerance &&
            monster.isAttackActivated &&
            !monster.isDead
          ) {
            if (monster.hp <= 1) {
              console.log("Potwór umarł");
              return { ...monster, hp: 0, isMoving: false, isDead: true };
            }
            return { ...monster, hp: monster.hp - 1 };
          }
          return monster;
        });
        monstersRef.current = updatedMonsters;
        return updatedMonsters;
      });
    }, 1000);
    return () => clearInterval(damageInterval);
  }, []);

  // Ruch potworów
  useEffect(() => {
    const movementInterval = setInterval(() => {
      setMonsters((prevMonsters) => {
        const updatedMonsters = prevMonsters.map((monster) => {
          if (!monster.isMoving || monster.isDead) return monster;
          const newX =
            monster.currentMonsterPosition.x + (Math.random() * 100 - 50);
          const newY =
            monster.currentMonsterPosition.y + (Math.random() * 100 - 50);
          const boundedX = Math.max(
            areaPosition.x - movementAreaSize.x / 2,
            Math.min(newX, areaPosition.x + movementAreaSize.x / 2)
          );
          const boundedY = Math.max(
            areaPosition.y - movementAreaSize.y / 2,
            Math.min(newY, areaPosition.y + movementAreaSize.y / 2)
          );
          return {
            ...monster,
            currentMonsterPosition: { x: boundedX, y: boundedY },
          };
        });
        monstersRef.current = updatedMonsters;
        return updatedMonsters;
      });
    }, 1000);
    return () => clearInterval(movementInterval);
  }, [areaPosition]);

  // Aktualizacja informacji, czy potwory znajdują się w zasięgu gracza
  useEffect(() => {
    setMonsters((prevMonsters) => {
      const updatedMonsters = prevMonsters.map((monster) => {
        const dx = monster.currentMonsterPosition.x - position.x;
        const dy = monster.currentMonsterPosition.y - position.y;
        const withinTolerance =
          Math.abs(dx) <= tolerance && Math.abs(dy) <= tolerance;
        return {
          ...monster,
          isWithinTolerance: withinTolerance,
          isMoving: withinTolerance ? !monster.isAttackActivated : true,
        };
      });
      monstersRef.current = updatedMonsters;
      return updatedMonsters;
    });
  }, [position]);

  useEffect(() => {
    // Aktualizujemy kolor dla potworów, które są aktywowane (czyli atakowanych)
    setMonsters((prevMonsters) =>
      prevMonsters.map((monster) => {
        if (
          monster.isAttackActivated &&
          !monster.isDead &&
          monster.isWithinTolerance
        ) {
          const attackData = computeAttackData(monster, position);
          return {
            ...monster,
            color: attackData.color, // nowy kolor wynikający z aktualnej pozycji gracza
          };
        }
        return monster;
      })
    );
  }, [position]); // uruchamia się przy każdej zmianie pozycji gracza

  // useEffect – aktualizacja animacji ataku (przy zmianie pozycji)
  useEffect(() => {
    if (idMonster === null) return;
    const monster = monsters.find((m) => m.id === idMonster);
    if (!monster) return;
    const attackData = computeAttackData(monster, position);
    // Przekazujemy tylko URL
    setPlayerAttack(attackData.url);
  }, [position, idMonster, monsters, setPlayerAttack]);

  // Obsługa kliknięcia – ustawiamy stan ataku i od razu obliczamy animację (tylko URL)
  const handleClick = (id: number) => {
    setMonsters((prevMonsters) =>
      prevMonsters.map((monster) => {
        if (monster.id === id && monster.isWithinTolerance && !monster.isDead) {
          setIdMonster(id);
          setIsPlayerAttacking(true);
          const attackData = computeAttackData(monster, position);
          // Przekazujemy tylko URL do setPlayerAttack
          setPlayerAttack(attackData.url);
          return {
            ...monster,
            isAttackActivated: true,
            // Ustawiamy kolor potwora zgodnie z obliczeniem
            color: attackData.color,
            isMoving: false,
          };
        }
        return monster;
      })
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        top: areaPosition.y - movementAreaSize.y / 2,
        left: areaPosition.x - movementAreaSize.x / 2,
        width: `${movementAreaSize.x}px`,
        height: `${movementAreaSize.y}px`,
        border: "2px dashed rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
      }}
    >
      {monsters.map(
        (monster) =>
          !monster.isDead && (
            <div
              key={monster.id}
              style={{
                position: "absolute",
                top: `${
                  monster.currentMonsterPosition.y -
                  areaPosition.y +
                  movementAreaSize.y / 2
                }px`,
                left: `${
                  monster.currentMonsterPosition.x -
                  areaPosition.x +
                  movementAreaSize.x / 2
                }px`,
                transform: "translate(-50%, -50%)",
                borderRadius: "8px",
              }}
            >
              {/* Pasek HP */}
              <div
                style={{
                  width: "60px",
                  height: "6px",
                  backgroundColor: "red",
                  position: "absolute",
                  top: "-52px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(monster.hp / monster.maxHp) * 100}%`,
                    height: "100%",
                    backgroundColor: "green",
                    transition: "width 0.3s",
                  }}
                ></div>
              </div>

              {/* Potwór */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: monster.color,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor:
                    monster.isWithinTolerance && !monster.isDead
                      ? "pointer"
                      : "not-allowed",
                }}
                onClick={() => handleClick(monster.id)}
              ></div>
            </div>
          )
      )}
    </div>
  );
};

export default Monster;
