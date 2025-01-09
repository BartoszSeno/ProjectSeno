export const initialPosition = { x: 2000, y: 2000 };

export interface Structures {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isColliding: boolean;
  name: string;
}

export const buildings: Structures[] = [
  { id: 1, x: 1800, y: 1500, width: 100, height: 100, isColliding: false, name: 'BlackSmith' },
  { id: 2, x: 2200, y: 1700, width: 100, height: 100, isColliding: false, name: 'Hotel' },
  { id: 3, x: 2500, y: 2000, width: 100, height: 100, isColliding: false, name: 'ArmorShop' },
];

export interface Border {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const noEntry: Border[] = [
  { id: 1, x: 1000, y: 1800, width: 200, height: 200 },
  { id: 2, x: 2300, y: 2100, width: 150, height: 150 },
];

export const noEntryOnTree: Border[] = [
  { id: 1, x: 1300, y: 2000, width: 70, height: 50 },
  { id: 2, x: 2700, y: 2100, width: 70, height: 50 },
];
