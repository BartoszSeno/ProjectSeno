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
  setPlayerAttack: (url: string) => void;
  areaPosition: { x: number; y: number };
  currentHP: number;
  setCurrentHP: any;
}

const Monster: React.FC<MonsterProps> = ({
  position,
  setIsPlayerAttacking,
  setPlayerAttack,
  areaPosition,
  currentHP,
  setCurrentHP,
}) => {
  const tolerance = 200;
  const movementAreaSize = { x: 1000, y: 1000 };

  // Inicjalizacja potworów
  const generateMonsters = (areaPosition: {
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
          x: areaPosition.x + (Math.random() * 400 - 200),
          y: areaPosition.y + (Math.random() * 400 - 200),
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
          x: areaPosition.x + (Math.random() * 400 - 200),
          y: areaPosition.y + (Math.random() * 400 - 200),
        },
        attackInterval: 1,
        isDead: false,
      },
    ];
  };

  const [monsters, setMonsters] = useState<MonsterData[]>(
    generateMonsters(areaPosition)
  );
  // Ref do aktualnego stanu potworów – przydatny w interwałach aby mieć najnowszy stan
  const monstersRef = useRef(monsters);
  useEffect(() => {
    monstersRef.current = monsters;
  }, [monsters]);

  const [idMonster, setIdMonster] = useState<number | null>(null);
  const [attackDirection, setAttackDirection] = useState<{
    color: string;
    url: string;
  } | null>(null);

  // Ustalanie czy gracz atakuje – sprawdzamy, czy którykolwiek potwór w zasięgu ataku
  useEffect(() => {
    const isAnyMonsterWithinTolerance = monsters.some(
      (monster) =>
        monster.isWithinTolerance &&
        monster.isAttackActivated &&
        !monster.isDead
    );
    setIsPlayerAttacking(isAnyMonsterWithinTolerance);
  }, [monsters, setIsPlayerAttacking]);

  // *** INTERWAŁ - GRACZ ZADAJE OBRAŻENIA POTWOROM ***
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
  }, []); // Uruchom tylko raz

  // *** INTERWAŁ - POTWORY ZADAJĄ OBRAŻENIA GRACZOWI ***
  useEffect(() => {
    const monsterDamageInterval = setInterval(() => {
      setCurrentHP((prevHP) => {
        const totalDamage = monstersRef.current.reduce((total, monster) => {
          // Gracz otrzymuje obrażenia tylko od aktywnych potworów
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

  // *** INTERWAŁ - RUCH POTWORÓW ***
  useEffect(() => {
    const movementInterval = setInterval(() => {
      setMonsters((prevMonsters) => {
        const updatedMonsters = prevMonsters.map((monster) => {
          if (!monster.isMoving || monster.isDead) return monster;
          // Oblicz nową pozycję z losowym przesunięciem
          const newX =
            monster.currentMonsterPosition.x + (Math.random() * 100 - 50);
          const newY =
            monster.currentMonsterPosition.y + (Math.random() * 100 - 50);
          // Upewnij się, że potwór pozostaje w obrębie areny
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

  // *** AKTUALIZACJA ZASIĘGU POTWORA WZGLĘDEM POZYCJI GRACZA ***
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

  // *** USTAWIENIE KIERUNKU ATAKU GRACZA WZGLĘDEM WYBRANEGO POTWORA ***
  useEffect(() => {
    if (idMonster === null) return;
    const monster = monsters.find((m) => m.id === idMonster);
    if (!monster) return;
    let newAttackUrl = "";
    let newAttackColor = "grey";

    if (
      position.x < monster.currentMonsterPosition.x &&
      position.y < monster.currentMonsterPosition.y
    ) {
      newAttackColor = "red";
      newAttackUrl =
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightDownAttack.gif";
    } else if (
      position.x > monster.currentMonsterPosition.x &&
      position.y < monster.currentMonsterPosition.y
    ) {
      newAttackColor = "green";
      newAttackUrl =
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/leftDownAttack.gif";
    } else if (
      position.x < monster.currentMonsterPosition.x &&
      position.y > monster.currentMonsterPosition.y
    ) {
      newAttackColor = "purple";
      newAttackUrl =
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightUpAttack.gif";
    } else if (
      position.x > monster.currentMonsterPosition.x &&
      position.y > monster.currentMonsterPosition.y
    ) {
      newAttackColor = "orange";
      newAttackUrl =
        "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/LeftUpAttack.gif";
    }
    setAttackDirection({ color: newAttackColor, url: newAttackUrl });
    setPlayerAttack(newAttackUrl);
  }, [position, idMonster, monsters, setPlayerAttack]);

  // *** OBSŁUGA KLIKU NA POTWORA ***
  const handleClick = (id: number) => {
    setMonsters((prevMonsters) =>
      prevMonsters.map((monster) => {
        if (monster.id === id && monster.isWithinTolerance && !monster.isDead) {
          setIdMonster(id);
          setIsPlayerAttacking(true);
          let attackUrl = "";
          let attackColor = "grey";

          if (
            position.x < monster.currentMonsterPosition.x &&
            position.y < monster.currentMonsterPosition.y
          ) {
            attackColor = "red";
            attackUrl =
              "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightDownAttack.gif";
          } else if (
            position.x > monster.currentMonsterPosition.x &&
            position.y < monster.currentMonsterPosition.y
          ) {
            attackColor = "green";
            attackUrl =
              "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/leftDownAttack.gif";
          } else if (
            position.x < monster.currentMonsterPosition.x &&
            position.y > monster.currentMonsterPosition.y
          ) {
            attackColor = "purple";
            attackUrl =
              "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/RightUpAttack.gif";
          } else if (
            position.x > monster.currentMonsterPosition.x &&
            position.y > monster.currentMonsterPosition.y
          ) {
            attackColor = "orange";
            attackUrl =
              "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Attack/LeftUpAttack.gif";
          }
          setPlayerAttack(attackUrl);
          return {
            ...monster,
            isAttackActivated: true,
            color: attackColor,
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
