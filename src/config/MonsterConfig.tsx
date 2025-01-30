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
}

export const generateMonsters = (areaPosition: {
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
      dmg: 10,
      currentMonsterPosition: {
        x: areaPosition.x + (Math.random() * 400 - 200),
        y: areaPosition.y + (Math.random() * 400 - 200),
      },
      attackInterval: 1,
    },
    {
      id: 2,
      color: "grey",
      isWithinTolerance: false,
      isAttackActivated: false,
      hp: 10,
      maxHp: 10,
      isMoving: true,
      dmg: 10,
      currentMonsterPosition: {
        x: areaPosition.x + (Math.random() * 400 - 200),
        y: areaPosition.y + (Math.random() * 400 - 200),
      },
      attackInterval: 1,
    },
  ];
};
