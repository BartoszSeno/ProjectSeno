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
  const baseX = 1560;
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
      url: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopInterior.gif",
      polygon: [
        "0% 22%",
        "42% 22%",
        "42% 37%",
        "100% 38%",
        "100% 84.2%",
        "42% 84%",
        "42% 100%",
        "0 100%",
      ],
      borders: [
        { id: 1, x: baseX + 0, y: baseY + 190, width: 40, height: 674 }, // sciana duża lewo lewo
        { id: 2, x: baseX + 0, y: baseY + 190, width: 570, height: 185 }, // sciana duza lewo góra
        { id: 5, x: baseX + 0, y: baseY + 857, width: 345, height: 20 }, //podłoga lewo dół lewo
        { id: 6, x: baseX + 440, y: baseY + 857, width: 135, height: 20 }, //podłoga lewo dół prawo
        { id: 7, x: baseX + 535, y: baseY + 719, width: 40, height: 150 }, //sciana dół prawo
        { id: 9, x: baseX + 535, y: baseY + 720, width: 810, height: 20 }, // podłoga prawo dół
        { id: 10, x: baseX + 535, y: baseY + 325, width: 800, height: 25 }, //sciana duża góra
        { id: 11, x: baseX + 1320, y: baseY + 330, width: 40, height: 405 }, //sciana prawo prawo
        { id: 12, x: baseX + 535, y: baseY + 345, width: 110, height: 115 }, //sciana srodek
        { id: 13, x: baseX + 40, y: baseY + 795, width: 135, height: 65 }, //safka
        { id: 14, x: baseX + 470, y: baseY + 795, width: 65, height: 65 }, //box i beczka
        { id: 15, x: baseX + 600, y: baseY + 655, width: 135, height: 65 }, //2 boxy
        { id: 16, x: baseX + 1150, y: baseY + 675, width: 175, height: 65 }, // pułka z bronią
        { id: 17, x: baseX + 1210, y: baseY + 330, width: 125, height: 55 }, // box pod scianą
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
