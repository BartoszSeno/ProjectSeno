import React, { useState, useEffect, useRef } from "react";
import {
  generateMonsters,
  areaPosition,
  MonsterTimeRespawn,
  MonsterData,
} from "../config/SkeletonConfig.tsx";

interface MonsterProps {
  position: { x: number; y: number };
  setIsPlayerAttacking: (value: boolean) => void;
  // Uwaga: setPlayerAttack oczekuje tylko URL (string)
  setPlayerAttack: (attackUrl: string) => void;
  currentHP: number;
  setCurrentHP: any;
  addExp: any;
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
  currentHP,
  setCurrentHP,
  addExp,
}) => {
  const tolerance = 250;
  const movementAreaSize = { x: 1000, y: 1000 };

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
      "top-left":
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeLeftIdle.gif",
      top: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeUpIdle.gif",
      "top-right":
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeRightIdle.gif",
      left: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeLeftIdle.gif",
      center:
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeDownIdle.gif",
      right:
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeRightIdle.gif",
      "bottom-left":
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeLeftIdle.gif",
      bottom:
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeDownIdle.gif",
      "bottom-right":
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeRightIdle.gif",
    };

    // Jeśli region "center" – np. gracz znajduje się blisko środka potwora – nie wykonujemy animacji ataku
    const url =
      region === "center"
        ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/UpAttack.gif"
        : regionMap[region] || "";
    const color = regionColorMapping[region] || "transparent";

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
  }, [setIsPlayerAttacking]);

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
            return total + monster.dmg; // tutaj dodać lvl postaci
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
            if (monster.hp <= 1 && !monster.expAdded) {
              console.log("Potwór umarł");
              setIsPlayerAttacking(false);
              setIdMonster(null); // Resetujemy identyfikator atakowanego potwora
              addExp(monster.exp);
              // Ustaw flagę, że EXP zostało już dodane
              monster.expAdded = true;

              // Ustal czas odrodzenia (10 sekund)
              const respawnTime = Date.now() + 10000;
              localStorage.setItem(
                `monsterRespawn_${monster.id}`,
                String(respawnTime)
              );

              // Ustaw timeout odrodzenia, jeśli potwór umiera teraz
              setTimeout(() => {
                setMonsters((prev) =>
                  prev.map((m) =>
                    m.id === monster.id
                      ? {
                          ...m,
                          hp: m.maxHp,
                          isDead: false,
                          isMoving: true,
                          isAttackActivated: false,
                          expAdded: false, // resetujemy flagę przy respawnie
                        }
                      : m
                  )
                );
                localStorage.removeItem(`monsterRespawn_${monster.id}`);
              }, MonsterTimeRespawn.Respawn * 1000);

              return {
                ...monster,
                hp: 0,
                isMoving: false,
                isDead: true,
                expAdded: true,
              };
            }
            return { ...monster, hp: monster.hp - 1 };
          }
          return monster;
        });
        return updatedMonsters;
      });
    }, 1000);
    return () => clearInterval(damageInterval);
  }, []);

  useEffect(() => {
    monsters.forEach((monster) => {
      if (monster.isDead) {
        const storedRespawn = localStorage.getItem(
          `monsterRespawn_${monster.id}`
        );
        if (storedRespawn) {
          const respawnTimestamp = parseInt(storedRespawn, 10);
          const remainingTime = respawnTimestamp - Date.now();
          if (remainingTime > 0) {
            setTimeout(() => {
              setMonsters((prev) =>
                prev.map((m) =>
                  m.id === monster.id
                    ? { ...m, hp: m.maxHp, isDead: false, isMoving: true }
                    : m
                )
              );
              localStorage.removeItem(`monsterRespawn_${monster.id}`);
            }, remainingTime);
          } else {
            // Czas minął, potwór powinien być żywy
            setMonsters((prev) =>
              prev.map((m) =>
                m.id === monster.id
                  ? { ...m, hp: m.maxHp, isDead: false, isMoving: true }
                  : m
              )
            );
            localStorage.removeItem(`monsterRespawn_${monster.id}`);
          }
        }
      }
    });
  }, []);

  // Funkcja pomocnicza do generowania nowego celu dla potwora w obrębie areny
  const generateNewTarget = (currentPos: {
    x: number;
    y: number;
  }): { x: number; y: number } => {
    const randomOffsetX = Math.random() * 400 - 200;
    const randomOffsetY = Math.random() * 400 - 200;
    const newX = currentPos.x + randomOffsetX;
    const newY = currentPos.y + randomOffsetY;
    const boundedX = Math.max(
      areaPosition.x - movementAreaSize.x / 2,
      Math.min(newX, areaPosition.x + movementAreaSize.x / 2)
    );
    const boundedY = Math.max(
      areaPosition.y - movementAreaSize.y / 2,
      Math.min(newY, areaPosition.y + movementAreaSize.y / 2)
    );
    return { x: boundedX, y: boundedY };
  };

  // Funkcja pomocnicza do wyliczania koloru na podstawie kąta ruchu (0-360°)
  // const getColorByAngle = (angle: number): string => {
  // Przykładowe przypisania – dostosuj według swoich upodobań:
  //   if (angle >= 337.5 || angle < 22.5) return "red"; // ruch w prawo
  //   if (angle >= 22.5 && angle < 67.5) return "orange"; // prawy dół (dolnoprawy)
  //   if (angle >= 67.5 && angle < 112.5) return "yellow"; // ruch w dół
  //   if (angle >= 112.5 && angle < 157.5) return "green"; // lewy dół (dolnolewy)
  //   if (angle >= 157.5 && angle < 202.5) return "blue"; // ruch w lewo
  //   if (angle >= 202.5 && angle < 247.5) return "indigo"; // lewy góra (górnolewy)
  //   if (angle >= 247.5 && angle < 292.5) return "violet"; // ruch w górę
  //   if (angle >= 292.5 && angle < 337.5) return "magenta"; // prawy góra (górnoprawy)
  //   return "grey";
  // };

  const getColorByAngle = (angle: number): string => {
    if (angle >= 315 || angle < 45)
      return "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeRight.gif"; // ruch w prawo
    if (angle >= 45 && angle < 135)
      return "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeDown.gif"; // ruch w dół
    if (angle >= 135 && angle < 225)
      return "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeLeft.gif"; // ruch w lewo
    if (angle >= 225 && angle < 315)
      return "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Monster/Skeleton/SkeUp.gif"; // ruch w górę
    return "transparent";
  };

  // Ruch potworów
  useEffect(() => {
    let animationFrameId: number;
    const speed = 1; // Prędkość ruchu – możesz dostosować tę wartość

    const animate = () => {
      setMonsters((prevMonsters) => {
        const updatedMonsters = prevMonsters.map((monster) => {
          if (!monster.isMoving || monster.isDead) return monster;

          const { x: currX, y: currY } = monster.currentMonsterPosition;
          const { x: targetX, y: targetY } = monster.targetPosition;

          const dx = targetX - currX;
          const dy = targetY - currY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Jeśli jesteśmy blisko celu, generujemy nowy cel
          if (distance < 1) {
            return {
              ...monster,
              targetPosition: generateNewTarget(monster.currentMonsterPosition),
            };
          }

          // Obliczamy krok ruchu
          const stepX = (dx / distance) * speed;
          const stepY = (dy / distance) * speed;

          // Obliczamy kąt ruchu w stopniach (0° oznacza ruch w prawo, 90° - w dół, itd.)
          let angle = Math.atan2(stepY, stepX) * (180 / Math.PI);
          if (angle < 0) angle += 360;

          // Pobieramy kolor w zależności od kąta
          const newColor = getColorByAngle(angle);

          return {
            ...monster,
            currentMonsterPosition: {
              x: currX + stepX,
              y: currY + stepY,
            },
            color: newColor, // aktualizujemy kolor na bieżąco
          };
        });
        monstersRef.current = updatedMonsters;
        return updatedMonsters;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [areaPosition]);

  // Aktualizacja informacji, czy potwory znajdują się w zasięgu gracza
  useEffect(() => {
    const toleranceInterval = setInterval(() => {
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
        return updatedMonsters;
      });
    }, 500); // Aktualizuj co 500 ms
    return () => clearInterval(toleranceInterval);
  }, [position, tolerance]);

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
          !(monster.isDead || monster.hp === 0) && (
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
                  top: "-62px",
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
                  width: "60px",
                  height: "93px",
                  backgroundColor: monster.color,
                  backgroundImage: `url(${monster.color})`,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                // Przykładowa obsługa kliknięcia – możesz tu zachować swoją logikę ataku
                onClick={() => handleClick(monster.id)}
              ></div>
            </div>
          )
      )}
    </div>
  );
};

export default Monster;
