import React, { useState, useEffect } from "react";

const Monster = ({
  position,
  setIsPlayerAttacking,
  setPlayerAttack,
  areaPosition,
  setAreaPosition,
  currentHP,
  setCurrentHP,
}) => {
  const [monsters, setMonsters] = useState(
    Array.from({ length: 3 }).map(() => ({
      id: Math.random(),
      color: "grey",
      isWithinTolerance: false,
      isAttackActivated: false,
      hp: 10,
      currentMonsterPosition: {
        x: areaPosition.x + (Math.random() * 400 - 200),
        y: areaPosition.y + (Math.random() * 400 - 200),
      },
    }))
  );

  const tolerance = 200;
  const movementAreaSize = { x: 1000, y: 1000 };

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
          isAttackActivated: withinTolerance
            ? monster.isAttackActivated
            : false,
        };
      })
    );
  }, [position]);

  useEffect(() => {
    const moveMonsters = () => {
      setMonsters((prevMonsters) =>
        prevMonsters.map((monster) => ({
          ...monster,
          currentMonsterPosition: {
            x: Math.max(
              Math.min(
                monster.currentMonsterPosition.x + (Math.random() * 200 - 100),
                areaPosition.x + movementAreaSize.x / 2
              ),
              areaPosition.x - movementAreaSize.x / 2
            ),
            y: Math.max(
              Math.min(
                monster.currentMonsterPosition.y + (Math.random() * 200 - 100),
                areaPosition.y + movementAreaSize.y / 2
              ),
              areaPosition.y - movementAreaSize.y / 2
            ),
          },
        }))
      );
    };

    const interval = setInterval(moveMonsters, 1000);
    return () => clearInterval(interval);
  }, [areaPosition]);

  const handleClick = (id) => {
    setMonsters((prevMonsters) =>
      prevMonsters.map((monster) => {
        if (monster.id === id && monster.isWithinTolerance) {
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
          return { ...monster, isAttackActivated: true, color: attackColor };
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
      {monsters.map((monster) => (
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
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: monster.color,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              cursor: monster.isWithinTolerance ? "pointer" : "not-allowed",
            }}
            onClick={() => handleClick(monster.id)}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Monster;
