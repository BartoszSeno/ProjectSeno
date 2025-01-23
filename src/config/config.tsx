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
  const baseX = 2040;
  const baseY = 300;

  return [
    {
      id: 1,
      x: baseX,
      y: baseY,
      width: 1820,
      height: 1218,
      isColliding: false,
      name: "BlackSmith",
      url: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopInterior3_1.gif",
      polygon: [
        "2% 42%",
        "32% 42%",
        "32% 53%",
        "71% 53%",
        "71% 42%",
        "98% 42%",
        "98% 95%",
        "71% 95%",
        "71% 85%",
        "31% 85%",
        "32% 99%",
        "2% 99%",
      ],
      borders: [
        { id: 1, x: baseX + 20, y: baseY + 510, width: 40, height: 700 }, // sciana duża lewo lewo
        { id: 2, x: baseX + 20, y: baseY + 510, width: 570, height: 185 }, // sciana duza lewo góra
        { id: 5, x: baseX + 20, y: baseY + 1195, width: 350, height: 20 }, //podłoga lewo dół lewo
        { id: 6, x: baseX + 470, y: baseY + 1195, width: 130, height: 20 }, //podłoga lewo dół prawo
        { id: 7, x: baseX + 559, y: baseY + 1045, width: 40, height: 150 }, //sciana dół prawo
        { id: 9, x: baseX + 560, y: baseY + 1020, width: 730, height: 20 }, // podłoga prawo dół
        { id: 10, x: baseX + 585, y: baseY + 645, width: 600, height: 25 }, //sciana duża góra
        { id: 11, x: baseX + 1260, y: baseY + 1025, width: 40, height: 135 }, //sciana prawo prawo
        { id: 12, x: baseX + 570, y: baseY + 675, width: 110, height: 115 }, //sciana srodek
        { id: 13, x: baseX + 60, y: baseY + 1140, width: 135, height: 65 }, //safka
        { id: 14, x: baseX + 490, y: baseY + 1140, width: 65, height: 65 }, //box i beczka
        { id: 16, x: baseX + 1080, y: baseY + 970, width: 175, height: 65 }, // pułka z bronią
        { id: 17, x: baseX + 1070, y: baseY + 660, width: 125, height: 55 }, // box pod scianą
        { id: 18, x: baseX + 1270, y: baseY + 1135, width: 520, height: 25 }, // podłoga lewo
        { id: 19, x: baseX + 1270, y: baseY + 500, width: 520, height: 25 }, // sciana duza lewo
        { id: 20, x: baseX + 1180, y: baseY + 500, width: 120, height: 240 }, // sciana lewo / lewo
        { id: 21, x: baseX + 1760, y: baseY + 500, width: 40, height: 660 }, // sciana prawo / lewo

        //
        { id: 22, x: baseX + 570, y: baseY + 1030, width: 230, height: 115 }, // namiot 1
        { id: 23, x: baseX + 780, y: baseY + 1045, width: 100, height: 60 }, // namiot 1.2
        { id: 24, x: baseX + 1500, y: baseY + 575, width: 183, height: 115 }, // rare1
        { id: 25, x: baseX + 1500, y: baseY + 795, width: 183, height: 115 }, // rare2
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
  { id: 3, x: 3000, y: 2100, width: 70, height: 50 },
];

export const BordersWS = Interiors.flatMap(
  (interior) => interior.borders || []
);

function BlackSmith(): InteriorStructures[] {
  const baseX = 40;
  const baseY = 0;

  return [
    {
      id: 1,
      x: baseX,
      y: baseY,
      width: 1820,
      height: 1218,
      isColliding: false,
      name: "BlackSmith",
      url: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/BlackSmith/blackSmithInterior.png",
      polygon: [
        "12% 45%",
        "44% 45%",
        "44% 33%",
        "63% 33%",
        "63% 45%",
        "88% 45%",
        "88% 89%",
        "43% 89%",
        "43% 95%",
        "43% 97%",
        "12% 97%",
      ],
      borders: [
        { id: 1, x: baseX + 200, y: baseY + 540, width: 45, height: 650 }, // sciana duża lewo lewo
        { id: 2, x: baseX + 200, y: baseY + 540, width: 570, height: 40 }, // sciana duza lewo góra
        { id: 3, x: baseX + 200, y: baseY + 1175, width: 160, height: 20 }, //podłoga lewo dół lewo
        { id: 4, x: baseX + 650, y: baseY + 1175, width: 160, height: 20 }, //podłoga lewo dół prawo
        { id: 5, x: baseX + 760, y: baseY + 830, width: 50, height: 360 }, //sciana dół prawo
        { id: 6, x: baseX + 760, y: baseY + 1070, width: 310, height: 20 }, // podłoga prawo dół
        { id: 7, x: baseX + 760, y: baseY + 390, width: 50, height: 335 }, //sciana duża góra
        { id: 26, x: baseX + 760, y: baseY + 390, width: 420, height: 45 }, //sciana duża góra
        { id: 27, x: baseX + 760, y: baseY + 390, width: 80, height: 270 }, //sciana duża góra
        { id: 28, x: baseX + 1130, y: baseY + 390, width: 50, height: 120 }, //sciana duża góra
        { id: 8, x: baseX + 1000, y: baseY + 505, width: 180, height: 200 }, //sciana srodek
        { id: 9, x: baseX + 1180, y: baseY + 1070, width: 440, height: 25 }, // podłoga lewo
        { id: 10, x: baseX + 1065, y: baseY + 540, width: 550, height: 220 }, // sciana duza lewo
        { id: 11, x: baseX + 1570, y: baseY + 540, width: 50, height: 550 }, // sciana prawo / lewo

        //
        { id: 13, x: baseX + 1230, y: baseY + 940, width: 380, height: 150 }, // sciana prawo / lewo
        { id: 14, x: baseX + 800, y: baseY + 830, width: 130, height: 250 }, // sciana prawo / lewo
        { id: 15, x: baseX + 390, y: baseY + 740, width: 215, height: 85 }, // sciana prawo / lewo
        { id: 16, x: baseX + 550, y: baseY + 540, width: 215, height: 85 }, // sciana prawo / lewo

        //ouside
        { id: 17, x: baseX + 970, y: baseY + 1120, width: 35, height: 25 }, // sciana prawo / lewo
        { id: 18, x: baseX + 1250, y: baseY + 1120, width: 35, height: 25 }, // sciana prawo / lewo
        { id: 19, x: baseX + 1535, y: baseY + 1120, width: 35, height: 25 }, // sciana prawo / lewo
        { id: 20, x: baseX + 1595, y: baseY + 1040, width: 60, height: 90 }, // sciana prawo / lewo
        { id: 21, x: baseX + 1595, y: baseY + 540, width: 210, height: 540 }, // sciana prawo / lewo
        { id: 22, x: baseX + 900, y: baseY + 1120, width: 35, height: 25 }, // sciana prawo / lewo
        { id: 23, x: baseX + 850, y: baseY + 1160, width: 35, height: 25 }, // sciana prawo / lewo
        { id: 24, x: baseX + 0, y: baseY + 760, width: 240, height: 400 }, // sciana prawo / lewo
        { id: 25, x: baseX + 80, y: baseY + 1160, width: 50, height: 60 }, // sciana prawo / lewo
      ],
    },
  ];
}

export const BlackSmithInteriors = BlackSmith();
