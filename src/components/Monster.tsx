import React, { useState, useEffect } from "react";

export interface MonsterData {
  id: number;
  color: string;
  isWithinTolerance: boolean;
  isAttackActivated: boolean;
  hp: number;
  maxHp: number;
  isMoving: boolean;
  dmg: number;
  currentMonsterPosition: any;
  attackInterval: number;
  isDead: boolean; // Dodajemy stan martwego potwora
}

const Monster = ({
  position,
  setIsPlayerAttacking,
  setPlayerAttack,
  areaPosition,
  currentHP,
  setCurrentHP,
}) => {
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
        dmg: 2, // Przykładowe obrażenia potwora
        currentMonsterPosition: {
          x: areaPosition.x + (Math.random() * 400 - 200),
          y: areaPosition.y + (Math.random() * 400 - 200),
        },
        attackInterval: 1,
        isDead: false, // Potwór nie jest martwy na początku
      },
      {
        id: 2,
        color: "grey",
        isWithinTolerance: false,
        isAttackActivated: false,
        hp: 10,
        maxHp: 10,
        isMoving: true,
        dmg: 2, // Przykładowe obrażenia potwora
        currentMonsterPosition: {
          x: areaPosition.x + (Math.random() * 400 - 200),
          y: areaPosition.y + (Math.random() * 400 - 200),
        },
        attackInterval: 1,
        isDead: false, // Potwór nie jest martwy na początku
      },
    ];
  };

  const [monsters, setMonsters] = useState(generateMonsters(areaPosition));
  const [damageTimer, setDamageTimer] = useState(null);
  const [playerDamageTimer, setPlayerDamageTimer] = useState(null);
  const [idMonster, setIdMonster] = useState<any>(null);
  const [attackDirection, setAttackDirection] = useState<{
    color: string;
    url: string;
  } | null>(null);

  const tolerance = 200;
  const movementAreaSize = { x: 1000, y: 1000 };

  // Nowy stan dla obrażeń gracza
  useEffect(() => {
    const isAnyMonsterWithinTolerance = monsters.some(
      (monster) =>
        monster.isWithinTolerance &&
        monster.isAttackActivated &&
        !monster.isDead
    );
    setIsPlayerAttacking(isAnyMonsterWithinTolerance);
  }, [monsters, setIsPlayerAttacking]);

  // Zadaj obrażenia potworowi co sekundę, gdy gracz wchodzi w zasięg
  useEffect(() => {
    const damageInterval = setInterval(() => {
      setMonsters((prevMonsters) =>
        prevMonsters.map((monster) => {
          if (
            monster.isWithinTolerance &&
            monster.isAttackActivated &&
            !monster.isDead
          ) {
            if (monster.hp <= 1) {
              console.log("Potwór umarł");
              return { ...monster, hp: 0, isMoving: false, isDead: true }; // Potwór umiera
            }
            return {
              ...monster,
              hp: monster.hp - 1, // Gracz zadaje 1 obrażenie na sekundę
            };
          }
          return monster;
        })
      );
    }, 1000); // Obrażenia co 1 sekundę

    return () => clearInterval(damageInterval);
  }, [idMonster]); // Atak działa, dopóki gracz atakuje jakiegokolwiek potwora

  // Zadaj obrażenia graczowi przez potwora
  useEffect(() => {
    const monsterDamageInterval = setInterval(() => {
      setCurrentHP((prevHP) => {
        if (prevHP <= 1) {
          console.log("Gracz umarł");
          return 0; // Gracz umiera
        }

        return (
          prevHP -
          monsters.reduce((totalDmg, monster) => {
            if (monster.isWithinTolerance && !monster.isDead) {
              return totalDmg + monster.dmg;
            }
            return totalDmg;
          }, 0)
        ); // Potwory zadają obrażenia co sekundę
      });
    }, 1000);

    return () => clearInterval(monsterDamageInterval);
  }, [monsters]); // Obrażenia działają ciągle, nawet gdy gracz się porusza

  useEffect(() => {
    const moveMonsters = () => {
      setMonsters((prevMonsters) =>
        prevMonsters.map((monster) => {
          if (!monster.isMoving || monster.isDead) return monster; // Nie ruszaj martwych lub atakujących potworów

          // Nowa losowa pozycja w zakresie areny
          const newX =
            monster.currentMonsterPosition.x + (Math.random() * 100 - 50); // Przesunięcie o max 50px
          const newY =
            monster.currentMonsterPosition.y + (Math.random() * 100 - 50); // Przesunięcie o max 50px

          // Zapewnienie, że potwór pozostanie w arenie
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
        })
      );
    };

    const movementInterval = setInterval(moveMonsters, 1000); // Ruch co 1 sekundę

    return () => clearInterval(movementInterval);
  }, [monsters]); // Odpala się przy zmianie stanu potworów

  useEffect(() => {
    setMonsters((prevMonsters) =>
      prevMonsters.map((monster) => {
        const dx = monster.currentMonsterPosition.x - position.x;
        const dy = monster.currentMonsterPosition.y - position.y;
        const withinTolerance =
          Math.abs(dx) <= tolerance && Math.abs(dy) <= tolerance;

        return {
          ...monster,
          isWithinTolerance: withinTolerance,
          isMoving: withinTolerance ? !monster.isAttackActivated : true,
        };
      })
    );
  }, [position]);

  useEffect(() => {
    if (idMonster === null) return; // Jeśli żaden potwór nie jest atakowany, nic nie rób

    const monster = monsters.find((m) => m.id === idMonster);
    if (!monster) return; // Jeśli potwór nie istnieje, zakończ

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
  }, [position, idMonster, monsters]); // Uruchamia się, gdy zmienia się pozycja gracza, ID potwora lub lista potworów

  const handleClick = (id) => {
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
          !monster.isDead && ( // Ukryj martwego potwora
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
                    backgroundColor: `green`,
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
