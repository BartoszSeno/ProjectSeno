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

export interface InteriorStructures {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isColliding: boolean;
  name: string;
  url: string;
  polygon: any;
}

export const buildings: Structures[] = [
  {
    id: 1,
    x: 1800,
    y: 1500,
    width: 100,
    height: 100,
    isColliding: false,
    name: "BlackSmith",
  },
  {
    id: 2,
    x: 2200,
    y: 1700,
    width: 100,
    height: 100,
    isColliding: false,
    name: "Hotel",
  },
  {
    id: 3,
    x: 2500,
    y: 2000,
    width: 100,
    height: 100,
    isColliding: false,
    name: "ArmorShop",
  },
];

export const Interiors: InteriorStructures[] = [
  {
    id: 1,
    x: 1360,
    y: 900,
    width: 1360,
    height: 874,
    isColliding: false,
    name: "BlackSmith",
    url: "https://raw.githubusercontent.com/BartoszSeno/ClickerZero/refs/heads/main/src/assets/MainImg/WeaponShop.gif",
    polygon: [
      "0% 0%",
      "42% 0%",
      "42% 29%",
      "45% 29%",
      "45% 10.5%",
      "100% 10.5%",
      "100% 84.2%",
      "44.5% 84%",
      "44.5% 66.5%",
      "42.3% 66.5%",
      "42.2% 100%",
      "0% 100%",
    ],
  },
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
