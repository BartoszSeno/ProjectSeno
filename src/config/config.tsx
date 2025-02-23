export const initialPosition = { x: 2000, y: 2000 };

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

export const keysToColors: Record<
  string,
  { pressed: string; released: string }
> = {
  w: {
    pressed:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Walk/UpWalk.gif",
    released:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Idle/UpIdle.gif",
  },
  a: {
    pressed:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Walk/leftWalk.gif",
    released:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Idle/leftIdle.gif",
  },
  s: {
    pressed:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Walk/DownWalk.gif",
    released:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Idle/DownIdle.gif",
  },
  d: {
    pressed:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Walk/RightWalk.gif",
    released:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Idle/RightIdle.gif",
  },
  aw: {
    pressed:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Walk/LeftUpWalk.gif",
    released:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Idle/LeftUpIdle.gif",
  },
  dw: {
    pressed:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Walk/RightUpWalk.gif",
    released:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Idle/RightUpIdle.gif",
  },
  ds: {
    pressed:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Walk/RightDownWalk.gif",
    released:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Idle/RightDownIdle.gif",
  },
  as: {
    pressed:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Walk/leftDownWalk.gif",
    released:
      "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Player/Idle/leftDownIdle.gif",
  },
};

function createInteriors(): InteriorStructures[] {
  const baseX = 2540;
  const baseY = 300;

  return [
    {
      id: 1,
      x: baseX,
      y: baseY,
      width: 1820,
      height: 1218,
      isColliding: false,
      name: "WeaponShop",
      url: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopInterior3_1.gif",
      polygon: [
        "2% 42%",
        "32% 42%",
        "32% 53%",
        "71% 53%",
        "71% 40%",
        "98% 40%",
        "98% 93%",
        "71% 93%",
        "71% 83%",
        "31% 83%",
        "32% 97%",
        "2% 97%",
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

export const noEntryOnTree: Border[] = [
  { id: 1, x: 1300, y: 2000, width: 70, height: 50 },
  { id: 2, x: 2700, y: 2100, width: 70, height: 50 },
  { id: 3, x: 3000, y: 2100, width: 70, height: 50 },
];

function BlackSmith(): InteriorStructures[] {
  const baseX = 40;
  const baseY = 2500;

  return [
    {
      id: 1,
      x: baseX,
      y: baseY,
      width: 1569,
      height: 1281,
      isColliding: false,
      name: "BlackSmith",
      url: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/BlackSmith/blackSmithInterior2.png",
      polygon: [
        "12% 43%",
        "44% 43%",
        "44% 33%",
        "63% 33%",
        "63% 45%",
        "88% 45%",
        "88% 88%",
        "43% 88%",
        "43% 95%",
        "43% 96%",
        "12% 96%",
      ],
      borders: [
        { id: 1, x: baseX + 170, y: baseY + 560, width: 45, height: 695 }, // sciana duża lewo lewo
        { id: 2, x: baseX + 170, y: baseY + 540, width: 540, height: 40 }, // sciana duza lewo góra
        { id: 3, x: baseX + 170, y: baseY + 1235, width: 135, height: 20 }, //podłoga lewo dół lewo
        { id: 4, x: baseX + 560, y: baseY + 1235, width: 135, height: 20 }, //podłoga lewo dół prawo
        { id: 5, x: baseX + 655, y: baseY + 870, width: 50, height: 385 }, //sciana dół prawo
        { id: 6, x: baseX + 680, y: baseY + 1130, width: 242, height: 20 }, // podłoga prawo dół
        { id: 7, x: baseX + 655, y: baseY + 405, width: 40, height: 355 }, //sciana duża góra
        { id: 26, x: baseX + 655, y: baseY + 390, width: 350, height: 60 }, //sciana duża góra
        { id: 27, x: baseX + 680, y: baseY + 390, width: 40, height: 305 }, //sciana duża góra
        { id: 28, x: baseX + 975, y: baseY + 390, width: 40, height: 190 }, //sciana duża góra
        { id: 8, x: baseX + 860, y: baseY + 525, width: 150, height: 210 }, //sciana srodek
        { id: 9, x: baseX + 1015, y: baseY + 1125, width: 400, height: 25 }, // podłoga lewo
        { id: 10, x: baseX + 915, y: baseY + 570, width: 550, height: 220 }, // sciana duza lewo
        { id: 11, x: baseX + 1350, y: baseY + 570, width: 40, height: 580 }, // sciana prawo / lewo

        //
        { id: 13, x: baseX + 1060, y: baseY + 1020, width: 380, height: 120 }, // sciana prawo / lewo
        { id: 14, x: baseX + 690, y: baseY + 870, width: 110, height: 250 }, // sciana prawo / lewo
        { id: 15, x: baseX + 335, y: baseY + 790, width: 187, height: 65 }, // sciana prawo / lewo
        { id: 16, x: baseX + 470, y: baseY + 570, width: 215, height: 85 }, // sciana prawo / lewo

        //ouside
        { id: 17, x: baseX + 835, y: baseY + 1180, width: 30, height: 25 }, // słupek 1
        { id: 18, x: baseX + 1078, y: baseY + 1180, width: 30, height: 25 }, // słupek 2
        { id: 19, x: baseX + 1320, y: baseY + 1180, width: 30, height: 25 }, // słupek 3
        { id: 20, x: baseX + 1365, y: baseY + 1090, width: 60, height: 90 }, // beczka
        { id: 21, x: baseX + 1355, y: baseY + 540, width: 200, height: 540 }, // butka prawo
        { id: 22, x: baseX + 780, y: baseY + 1180, width: 35, height: 25 }, // log
        { id: 23, x: baseX + 725, y: baseY + 1220, width: 35, height: 25 }, // log
        { id: 24, x: baseX + 0, y: baseY + 770, width: 200, height: 400 }, // butka lewo
        { id: 25, x: baseX + 60, y: baseY + 1160, width: 50, height: 120 }, // wood cuter
      ],
    },
  ];
}

export const BlackSmithInteriors = BlackSmith();

function Inn(): InteriorStructures[] {
  const baseX = 1500;
  const baseY = 2000;

  return [
    {
      id: 1,
      x: baseX,
      y: baseY,
      width: 2504,
      height: 1906,
      isColliding: false,
      name: "Inn",
      url: "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Inn/InnInterior.png",
      polygon: [
        "6% 32%",
        "18% 32%",
        "28% 23%",
        "31% 23%",
        "31% 35%",
        "34% 35%",
        "34% 25%",
        "68% 25%",
        "68% 36%",
        "71% 36%",
        "71% 22%",
        "75% 22%",
        "82% 33%",
        "94% 33%",
        "94% 61%",
        "71% 61%",
        "71% 55%",
        "31% 55%",
        "31% 94%",
        "6% 94%",
      ],
      borders: [
        { id: 1, x: baseX + 175, y: baseY + 600, width: 45, height: 1210 },
        { id: 2, x: baseX + 175, y: baseY + 570, width: 350, height: 45 },
        { id: 3, x: baseX + 750, y: baseY + 1050, width: 40, height: 760 },
        { id: 4, x: baseX + 175, y: baseY + 1790, width: 615, height: 25 },
        { id: 5, x: baseX + 175, y: baseY + 620, width: 280, height: 45 }, //bookshelf - left
        { id: 6, x: baseX + 175, y: baseY + 670, width: 110, height: 75 }, //bookshelf - left
        { id: 7, x: baseX + 505, y: baseY + 540, width: 45, height: 45 }, //stairs - left
        { id: 8, x: baseX + 530, y: baseY + 515, width: 45, height: 45 }, //stairs - left
        { id: 9, x: baseX + 555, y: baseY + 490, width: 45, height: 45 }, //stairs - left
        { id: 10, x: baseX + 580, y: baseY + 465, width: 45, height: 45 }, //stairs - left
        { id: 11, x: baseX + 605, y: baseY + 447, width: 45, height: 45 }, //stairs - left
        { id: 12, x: baseX + 630, y: baseY + 420, width: 45, height: 45 }, //stairs - left
        { id: 13, x: baseX + 655, y: baseY + 415, width: 120, height: 40 }, //stairs - left
        { id: 14, x: baseX + 750, y: baseY + 415, width: 25, height: 310 }, //stairs - left
        { id: 15, x: baseX + 560, y: baseY + 685, width: 300, height: 20 }, //stairs - left
        { id: 16, x: baseX + 580, y: baseY + 660, width: 25, height: 25 }, //stairs - left
        { id: 17, x: baseX + 605, y: baseY + 635, width: 25, height: 25 }, //stairs - left
        { id: 18, x: baseX + 630, y: baseY + 615, width: 25, height: 25 }, //stairs - left
        { id: 19, x: baseX + 656, y: baseY + 590, width: 25, height: 25 }, //stairs - left
        { id: 20, x: baseX + 680, y: baseY + 560, width: 90, height: 25 }, //stairs - left
        { id: 21, x: baseX + 820, y: baseY + 440, width: 905, height: 85 }, // kitchen
        { id: 22, x: baseX + 820, y: baseY + 440, width: 90, height: 320 }, // kitchen
        { id: 23, x: baseX + 860, y: baseY + 440, width: 90, height: 230 }, // kitchen
        { id: 24, x: baseX + 860, y: baseY + 625, width: 320, height: 85 }, // kitchen
        { id: 25, x: baseX + 1680, y: baseY + 500, width: 45, height: 210 }, // kitchen
        { id: 26, x: baseX + 1450, y: baseY + 690, width: 345, height: 20 }, // kitchen
        { id: 27, x: baseX + 1130, y: baseY + 690, width: 243, height: 20 }, // kitchen
        { id: 28, x: baseX + 750, y: baseY + 1045, width: 285, height: 25 }, // mid room
        { id: 29, x: baseX + 1115, y: baseY + 1045, width: 680, height: 25 }, // mid room
        { id: 30, x: baseX + 860, y: baseY + 700, width: 345, height: 80 }, // mid room
        { id: 31, x: baseX + 1760, y: baseY + 1045, width: 40, height: 140 }, // right room
        { id: 32, x: baseX + 1760, y: baseY + 1165, width: 605, height: 25 }, // right room
        { id: 33, x: baseX + 2330, y: baseY + 600, width: 35, height: 580 }, // right room
        { id: 34, x: baseX + 2035, y: baseY + 605, width: 310, height: 30 }, // right room
        { id: 35, x: baseX + 1765, y: baseY + 415, width: 35, height: 295 }, // stairs - right
        { id: 36, x: baseX + 1765, y: baseY + 415, width: 140, height: 30 }, // stairs - right
        { id: 37, x: baseX + 1875, y: baseY + 435, width: 30, height: 30 }, // stairs - right
        { id: 38, x: baseX + 1900, y: baseY + 460, width: 30, height: 30 }, // stairs - right
        { id: 39, x: baseX + 1925, y: baseY + 480, width: 30, height: 30 }, // stairs - right
        { id: 40, x: baseX + 1950, y: baseY + 505, width: 30, height: 30 }, // stairs - right
        { id: 41, x: baseX + 1973, y: baseY + 532, width: 30, height: 30 }, // stairs - right
        { id: 42, x: baseX + 1997, y: baseY + 555, width: 30, height: 30 }, // stairs - right
        { id: 43, x: baseX + 2020, y: baseY + 585, width: 30, height: 30 }, // stairs - right
        { id: 44, x: baseX + 1800, y: baseY + 685, width: 190, height: 20 }, // stairs - right
        { id: 45, x: baseX + 1800, y: baseY + 560, width: 70, height: 20 }, // stairs - right
        { id: 46, x: baseX + 1875, y: baseY + 585, width: 20, height: 20 }, // stairs - right
        { id: 47, x: baseX + 1900, y: baseY + 610, width: 20, height: 20 }, // stairs - right
        { id: 48, x: baseX + 1925, y: baseY + 635, width: 20, height: 20 }, // stairs - right
        { id: 49, x: baseX + 1950, y: baseY + 660, width: 20, height: 20 }, // stairs - right

        { id: 50, x: baseX + 200, y: baseY + 815, width: 160, height: 160 }, // left room furnuture
        { id: 51, x: baseX + 200, y: baseY + 1075, width: 160, height: 160 }, // left room furnuture
        { id: 52, x: baseX + 360, y: baseY + 1120, width: 60, height: 60 }, // left room furnuture
        { id: 53, x: baseX + 200, y: baseY + 1345, width: 160, height: 160 }, // left room furnuture
        { id: 54, x: baseX + 200, y: baseY + 1600, width: 160, height: 160 }, // left room furnuture
        { id: 55, x: baseX + 610, y: baseY + 1075, width: 160, height: 160 }, // left room furnuture
        { id: 56, x: baseX + 610, y: baseY + 1345, width: 160, height: 160 }, // left room furnuture
        { id: 57, x: baseX + 570, y: baseY + 1385, width: 60, height: 60 }, // left room furnuture
        { id: 58, x: baseX + 610, y: baseY + 1600, width: 160, height: 160 }, // left room furnuture

        { id: 59, x: baseX + 2110, y: baseY + 620, width: 220, height: 60 }, // right room furnuture
        { id: 60, x: baseX + 1960, y: baseY + 780, width: 205, height: 320 }, // right room furnuture
        { id: 61, x: baseX + 1920, y: baseY + 830, width: 295, height: 200 }, // right room furnuture
      ],
    },
  ];
}

export const InnInteriors = Inn();
