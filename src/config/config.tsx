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
      width: 1820,
      height: 1218,
      isColliding: false,
      name: "BlackSmith",
      url: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopInterior2.gif",
      polygon: [
        "2% 42%",
        "32% 42%",
        "32% 53%",
        "77% 53%",
        "77% 87%",
        "32% 87%",
        "32% 99%",
        "2% 99%",
      ],
      borders: [
        { id: 1, x: baseX + 20, y: baseY + 510, width: 40, height: 700 }, // sciana duża lewo lewo
        { id: 2, x: baseX + 20, y: baseY + 510, width: 570, height: 185 }, // sciana duza lewo góra
        { id: 5, x: baseX + 20, y: baseY + 1195, width: 350, height: 20 }, //podłoga lewo dół lewo
        { id: 6, x: baseX + 470, y: baseY + 1195, width: 130, height: 20 }, //podłoga lewo dół prawo
        { id: 7, x: baseX + 559, y: baseY + 1055, width: 40, height: 150 }, //sciana dół prawo
        { id: 9, x: baseX + 560, y: baseY + 1050, width: 850, height: 20 }, // podłoga prawo dół
        { id: 10, x: baseX + 585, y: baseY + 645, width: 820, height: 25 }, //sciana duża góra
        { id: 11, x: baseX + 1370, y: baseY + 650, width: 40, height: 405 }, //sciana prawo prawo
        { id: 12, x: baseX + 570, y: baseY + 675, width: 110, height: 115 }, //sciana srodek
        { id: 13, x: baseX + 60, y: baseY + 1140, width: 135, height: 65 }, //safka
        { id: 14, x: baseX + 490, y: baseY + 1140, width: 65, height: 65 }, //box i beczka
        { id: 16, x: baseX + 1200, y: baseY + 995, width: 175, height: 65 }, // pułka z bronią
        { id: 17, x: baseX + 1260, y: baseY + 660, width: 125, height: 55 }, // box pod scianą
        //
        { id: 18, x: baseX + 570, y: baseY + 1060, width: 230, height: 115 }, // namiot 1
        { id: 19, x: baseX + 780, y: baseY + 1075, width: 100, height: 60 }, // namiot 1.2
        { id: 20, x: baseX + 1400, y: baseY + 845, width: 145, height: 200 }, // namiot 2
      ],
    },
  ];
}

export const Interiors = createInteriors();

export const noEntry: Border[] = [
  //{ id: 1, x: 1000, y: 1800, width: 200, height: 200 },
  //{ id: 2, x: 2300, y: 2100, width: 150, height: 150 },
];

export const noEntryOnTree: Border[] = [
  { id: 1, x: 1300, y: 2000, width: 70, height: 50 },
  { id: 2, x: 2700, y: 2100, width: 70, height: 50 },
];

export const BordersWS = Interiors.flatMap(
  (interior) => interior.borders || []
);
