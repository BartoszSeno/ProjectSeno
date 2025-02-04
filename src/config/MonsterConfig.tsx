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
  isDead: boolean;
  targetPosition: any;
}

export const generateMonsters = (areaPos: {
  x: number;
  y: number;
}): MonsterData[] => {
  const initialPos = {
    x: areaPos.x + (Math.random() * 400 - 200),
    y: areaPos.y + (Math.random() * 400 - 200),
  };
  return [
    {
      id: 1,
      color: "transparent",
      isWithinTolerance: false,
      isAttackActivated: false,
      hp: 10,
      maxHp: 10,
      isMoving: true,
      dmg: 10,
      currentMonsterPosition: initialPos,
      targetPosition: initialPos,
      attackInterval: 1,
      isDead: false,
    },
    {
      id: 2,
      color: "transparent",
      isWithinTolerance: false,
      isAttackActivated: false,
      hp: 10,
      maxHp: 10,
      isMoving: true,
      dmg: 10,
      currentMonsterPosition: initialPos,
      targetPosition: initialPos,
      attackInterval: 1,
      isDead: false,
    },
    {
      id: 3,
      color: "transparent",
      isWithinTolerance: false,
      isAttackActivated: false,
      hp: 10,
      maxHp: 10,
      isMoving: true,
      dmg: 10,
      currentMonsterPosition: initialPos,
      targetPosition: initialPos,
      attackInterval: 1,
      isDead: false,
    },
    {
      id: 4,
      color: "transparent",
      isWithinTolerance: false,
      isAttackActivated: false,
      hp: 10,
      maxHp: 10,
      isMoving: true,
      dmg: 10,
      currentMonsterPosition: initialPos,
      targetPosition: initialPos,
      attackInterval: 1,
      isDead: false,
    },
  ];
};
