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

export interface BorderWs {
  id: number;
  xOffset: number; // Przesunięcie względem x wnętrza
  yOffset: number; // Przesunięcie względem y wnętrza
  width: number; // Szerokość granicy
  height: number; // Wysokość granicy
}

export interface Border {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
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
  polygon: string[]; // Tablica punktów wielokąta w formacie procentowym
  borders?: Border[]; // Opcjonalna tablica granic dla wnętrza
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

function createInteriors(): InteriorStructures[] {
  const baseX = 1360;
  const baseY = 900;

  return [
    {
      id: 1,
      x: baseX,
      y: baseY,
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
      borders: [
        { id: 1, x: baseX + 0, y: baseY + 0, width: 40, height: 874 }, // sciana duża lewo lewo
        { id: 2, x: baseX + 0, y: baseY + 0, width: 570, height: 210 }, // sciana duza lewo góra
        { id: 3, x: baseX + 40, y: baseY + 210, width: 55, height: 165 }, //lada lewo
        { id: 4, x: baseX + 90, y: baseY + 285, width: 365, height: 90 }, // lada srodek
        { id: 5, x: baseX + 0, y: baseY + 834, width: 345, height: 40 }, //podłoga lewo dół lewo
        { id: 6, x: baseX + 440, y: baseY + 834, width: 135, height: 40 }, //podłoga lewo dół prawo
        { id: 7, x: baseX + 535, y: baseY + 549, width: 40, height: 300 }, //sciana dół prawo prawo
        { id: 8, x: baseX + 600, y: baseY + 549, width: 40, height: 185 },
        { id: 9, x: baseX + 600, y: baseY + 694, width: 760, height: 40 }, // podłoga prawo dół
        { id: 10, x: baseX + 535, y: baseY + 90, width: 800, height: 255 }, //sciana duża góra
        { id: 11, x: baseX + 1320, y: baseY + 90, width: 40, height: 645 }, //sciana prawo prawo
        { id: 12, x: baseX + 535, y: baseY + 345, width: 110, height: 115 }, //sciana srodek
      ],
    },
  ];
}

export const Interiors = createInteriors();

export const noEntry: Border[] = [
  { id: 1, x: 1000, y: 1800, width: 200, height: 200 },
  { id: 2, x: 2300, y: 2100, width: 150, height: 150 },
];

export const noEntryOnTree: Border[] = [
  { id: 1, x: 1300, y: 2000, width: 70, height: 50 },
  { id: 2, x: 2700, y: 2100, width: 70, height: 50 },
];

export const BordersWS = Interiors.flatMap(
  (interior) => interior.borders || []
);
