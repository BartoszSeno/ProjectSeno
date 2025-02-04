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
  targetPosition: { x: number; y: number };
  attackInterval: number;
  isDead: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface Respawn {
  Respawn: number;
}

export const MonsterTimeRespawn: Respawn = {
  Respawn: 3,
};

export const areaPosition: Position = {
  x: 3000,
  y: 3000,
};

const checkMonsterIsDead = (id: number): boolean => {
  const storedRespawn = localStorage.getItem(`monsterRespawn_${id}`);
  let isDead = false;
  if (storedRespawn) {
    const respawnTimestamp = parseInt(storedRespawn, 10);
    if (respawnTimestamp > Date.now()) {
      isDead = true;
    } else {
      localStorage.removeItem(`monsterRespawn_${id}`);
    }
  }
  return isDead;
};

export const generateMonsters = (areaPos: {
  x: number;
  y: number;
}): MonsterData[] => {
  // Losowa pozycja początkowa - można też dla każdego potwora generować osobno
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
      isDead: checkMonsterIsDead(1),
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
      isDead: checkMonsterIsDead(2),
    },
  ];
};
