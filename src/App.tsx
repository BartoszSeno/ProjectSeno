import React, { useState, useEffect, useRef } from "react";
import Map from "./components/Map.tsx";
import Player from "./components/Player.tsx";
import Structuress from "./components/Structure.tsx";
import Borders from "./components/Border.tsx";
import Trees from "./components/Tree.tsx";
import {
  initialPosition as defaultInitialPosition,
  buildings,
  noEntry,
  noEntryOnTree,
  Interiors,
} from "./config/config.tsx";
import { BordersWS } from "./config/config.tsx";

import { ShieldAndDaggerImageAndNameAndCost } from "./data/SubWeapon.tsx";
import { GlovesImageAndNameAndCost } from "./data/Gloves.tsx";
import { ShoesImageAndNameAndCost } from "./data/Shoes.tsx";
import { MainWeaponImageAndNameAndCost } from "./data/Sword.tsx";
import { ArmorImageAndNameAndCost } from "./data/Armor.tsx";
import { HelmetImageAndNameAndCost } from "./data/Helmet.tsx";
import { FishArray } from "./data/fish.tsx";
import MainEq from "./components/Equipment/index.tsx";
import WeaponShop from "./components/Shop/WeaponShop/WShop.tsx";

const App = () => {
  // Sprawdź localStorage i ustaw pozycję początkową gracza
  const savedPosition = JSON.parse(
    localStorage.getItem("playerPosition") || "null"
  );
  const [position, setPosition] = useState(
    savedPosition || defaultInitialPosition
  );
  const [building, setBuilding] = useState(buildings);
  const [activeStructure, setActiveStructure] = useState<string | null>(null);
  const isMoving = useRef<boolean>(false);
  const [isKeyPressed, setIsKeyPressed] = useState(false); // Stan do śledzenia, czy klawisz jest wciśnięty
  const [interior, setInterior] = useState(Interiors);

  const step = 10;
  const keysPressed = useRef<Set<string>>(new Set());

  const handleKeyDown = (event: KeyboardEvent) => {
    keysPressed.current.add(event.key.toLowerCase());
    setIsKeyPressed(true); // Ustawiamy stan na true, gdy klawisz jest wciśnięty
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    keysPressed.current.delete(event.key.toLowerCase());
    if (keysPressed.current.size === 0) {
      setIsKeyPressed(false); // Ustawiamy stan na false, gdy żaden klawisz nie jest wciśnięty
    }
  };

  const isColliding = (playerX: number, playerY: number, elements: any[]) =>
    elements.some(
      (div) =>
        playerX + 25 > div.x &&
        playerX - 25 < div.x + div.width &&
        playerY + 25 > div.y &&
        playerY - 25 < div.y + div.height
    );

  const isCollidingWithBorder = (playerX: number, playerY: number) =>
    isColliding(playerX, playerY, noEntry);

  const isCollidingWithTree = (playerX: number, playerY: number) =>
    isColliding(playerX, playerY, noEntryOnTree);

  const allBorders = Interiors.flatMap((interior) => interior.borders || []);

  const isCollidingTest = (playerX: number, playerY: number) =>
    isColliding(playerX, playerY, allBorders);

  const checkStructureCollisions = (playerX: number, playerY: number) => {
    let collisionDetected = false;
    setBuilding((prevDivs) => {
      return prevDivs.map((div) => {
        const isColliding =
          playerX + 25 > div.x &&
          playerX - 25 < div.x + div.width &&
          playerY + 25 > div.y &&
          playerY - 25 < div.y + div.height;

        // Jeśli kolizja, zaktualizuj isColliding i ustaw aktywną strukturę
        if (isColliding && !collisionDetected) {
          setActiveStructure(div.name); // Ustawienie aktywnej struktury
          collisionDetected = true;
        }

        return { ...div, isColliding }; // Zwróć zaktualizowaną strukturę
      });
    });

    // Jeśli nie ma kolizji, ustaw aktywną strukturę na null
    if (!collisionDetected) {
    }
  };
  console.log(interior[0].isColliding);

  const checkInteriorsCollisions = (playerX: number, playerY: number) => {
    setInterior((prevDivs) =>
      prevDivs.map((div) => {
        let isColliding = false;

        if (div.polygon) {
          // Przelicz punkty zapisane w procentach na rzeczywiste współrzędne
          const absolutePolygon = div.polygon.map((point) => {
            const [px, py] = point.split(" ").map((p) => parseFloat(p) / 100);
            return {
              x: div.x + px * div.width,
              y: div.y + py * div.height,
            };
          });

          // Sprawdź, czy gracz jest wewnątrz wielokąta
          isColliding = isPointInPolygon(
            { x: playerX, y: playerY },
            absolutePolygon
          );
        } else {
          // Sprawdzanie kolizji dla prostokąta
          isColliding =
            playerX + 25 > div.x &&
            playerX - 25 < div.x + div.width &&
            playerY + 25 > div.y &&
            playerY - 25 < div.y + div.height;
        }

        return { ...div, isColliding }; // Zwróć zaktualizowaną strukturę
      })
    );
  };

  const isPointInPolygon = (
    point: { x: number; y: number },
    polygon: { x: number; y: number }[]
  ) => {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x,
        yi = polygon[i].y;
      const xj = polygon[j].x,
        yj = polygon[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

      if (intersect) isInside = !isInside;
    }
    return isInside;
  };

  const updatePosition = () => {
    console.log(allBorders);
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      const canMove = (x: number, y: number) =>
        !isCollidingWithBorder(x, y) &&
        !isCollidingWithTree(x, y) &&
        !isCollidingTest(x, y);

      let moved = false;

      if (keysPressed.current.has("w") && canMove(prev.x, prev.y - step)) {
        newY = Math.max(prev.y - step, 0); // Góra
        moved = true;
      }
      if (keysPressed.current.has("s") && canMove(prev.x, prev.y + step)) {
        newY = Math.min(prev.y + step, 4000); // Dół
        moved = true;
      }
      if (keysPressed.current.has("a") && canMove(prev.x - step, prev.y)) {
        newX = Math.max(prev.x - step, 0); // Lewo
        moved = true;
      }
      if (keysPressed.current.has("d") && canMove(prev.x + step, prev.y)) {
        newX = Math.min(prev.x + step, 4000); // Prawo
        moved = true;
      }

      // Jeśli gracz się porusza, sprawdzamy kolizję
      if (moved) {
        checkStructureCollisions(newX, newY);
        checkInteriorsCollisions(newX, newY);
        isMoving.current = true;
        const newPosition = { x: newX, y: newY };
        localStorage.setItem("playerPosition", JSON.stringify(newPosition));
      } else {
        isMoving.current = false;
      }

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    let interval: NodeJS.Timeout;

    if (isKeyPressed) {
      interval = setInterval(updatePosition, 16); // Uruchomienie interwału, gdy klawisz jest wciśnięty
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval); // Sprzątanie po zakończeniu komponentu
    };
  }, [isKeyPressed]);

  //=============================================
  //=============================================

  // FULL NUMBER WHICH SAVES THE COUNT NUMBER OF MAIN POINTS 'count'
  const [count, setCount] = useState<number>(() =>
    Number(localStorage.getItem("count") || 100)
  );
  // ARRAY OF THE ENTIRE ShieldAndDagger
  const [ShieldAndDaggerData, setShieldAndDaggerData] = useState<any>(
    JSON.parse(
      localStorage.getItem("ShieldAndDaggerImageAndNameAndCost") ||
        JSON.stringify(ShieldAndDaggerImageAndNameAndCost)
    )
  );
  //==================
  // GET UPGRADED ShieldAndDagger NAME FROM ENCHANT FUNCTION
  const [UpgradedNamesShieldAndDagger, setUpgradedNamesShieldAndDagger] =
    useState<any>(Array(ShieldAndDaggerData.length).fill(""));

  //FUNCTION TO AUTOMATICALY REFRESH ShieldAndDagger STATS
  // !! useState important for show the value points per click !!
  const [selectedShieldAndDaggerItem, setSelectedShieldAndDaggerItem] =
    useState(null);

  // geting the id on click
  const handleShieldAndDaggerItemSelect = (ShieldAndDaggerIndex: any) => {
    setSelectedShieldAndDaggerItem(ShieldAndDaggerIndex);
  };

  //we get the id of the currently selected item (eq selected) which is saved in localstorage for update statistic DMG
  const savedShieldAndDaggerId = localStorage.getItem(
    "selectedShieldAndDaggerItemIdEquip"
  );

  //we add fake id to the selected item to make it refresh automatically
  useEffect(() => {
    handleShieldAndDaggerItemSelect(Number(savedShieldAndDaggerId));
  }, []);
  // Declare state to save selected item index, initialized with 0
  const [
    selectedShieldAndDaggerItemIndex,
    setSelectedShieldAndDaggerItemIndex,
  ] = useState<number>(0);

  // its weapon or armor ?
  const [itsShieldAndDagger, setitsShieldAndDagger] = useState<boolean>(false);

  //==================
  // SAVES THE TRUE VALUE OF MAIN Gloves DEF
  const [UpgradedDefShieldAndDagger, setUpgradedDefShieldAndDagger] =
    useState<string>("");

  // SAVES THE TRUE VALUE OF MAIN Gloves DMG
  const [UpgradedDmgShieldAndDagger, setUpgradedDmgShieldAndDagger] =
    useState<string>("");

  //===========================GLOVES===============================

  // ARRAY OF THE ENTIRE Gloves
  const [GlovesData, setGlovesData] = useState<any>(
    JSON.parse(
      localStorage.getItem("GlovesImageAndNameAndCost") ||
        JSON.stringify(GlovesImageAndNameAndCost)
    )
  );
  //==================
  // GET UPGRADED Gloves NAME FROM ENCHANT FUNCTION
  const [UpgradedNamesGloves, setUpgradedNamesGloves] = useState<any>(
    Array(GlovesData.length).fill("")
  );

  //FUNCTION TO AUTOMATICALY REFRESH Gloves STATS
  // !! useState important for show the value points per click !!
  const [selectedGlovesItem, setSelectedGlovesItem] = useState(null);

  // geting the id on click
  const handleGlovesItemSelect = (GlovesIndex: any) => {
    setSelectedGlovesItem(GlovesIndex);
  };

  //we get the id of the currently selected item (eq selected) which is saved in localstorage for update statistic DMG
  const savedGlovesId = localStorage.getItem("selectedGlovesItemIdEquip");

  //we add fake id to the selected item to make it refresh automatically
  useEffect(() => {
    handleGlovesItemSelect(Number(savedGlovesId));
  }, []);
  // Declare state to save selected item index, initialized with 0
  const [selectedGlovesItemIndex, setSelectedGlovesItemIndex] =
    useState<number>(0);
  // its weapon or armor ?
  const [itsGloves, setitsGloves] = useState<boolean>(false);

  //==================
  // SAVES THE TRUE VALUE OF MAIN Gloves DEF
  const [UpgradedDefGloves, setUpgradedDefGloves] = useState<string>("");

  //=====================SHOES============================

  // ARRAY OF THE ENTIRE Shoes
  const [ShoesData, setShoesData] = useState<any>(
    JSON.parse(
      localStorage.getItem("ShoesImageAndNameAndCost") ||
        JSON.stringify(ShoesImageAndNameAndCost)
    )
  );
  //==================
  // GET UPGRADED Shoes NAME FROM ENCHANT FUNCTION
  const [UpgradedNamesShoes, setUpgradedNamesShoes] = useState<any>(
    Array(ShoesData.length).fill("")
  );

  //FUNCTION TO AUTOMATICALY REFRESH Shoes STATS
  // !! useState important for show the value points per click !!
  const [selectedShoesItem, setSelectedShoesItem] = useState(null);

  // geting the id on click
  const handleShoesItemSelect = (ShoesIndex: any) => {
    setSelectedShoesItem(ShoesIndex);
  };

  //we get the id of the currently selected item (eq selected) which is saved in localstorage for update statistic DMG
  const savedShoesId = localStorage.getItem("selectedShoesItemIdEquip");

  //we add fake id to the selected item to make it refresh automatically
  useEffect(() => {
    handleShoesItemSelect(Number(savedShoesId));
  }, []);
  // Declare state to save selected item index, initialized with 0
  const [selectedShoesItemIndex, setSelectedShoesItemIndex] =
    useState<number>(0);
  // its weapon or armor ?
  const [itsShoes, setitsShoes] = useState<boolean>(false);
  //==================
  // SAVES THE TRUE VALUE OF MAIN Shoes DEF
  const [UpgradedDefShoes, setUpgradedDefShoes] = useState<string>("");

  //================================HELMET========================

  // ARRAY OF THE ENTIRE Helmet
  const [HelmetData, setHelmetData] = useState<any>(
    JSON.parse(
      localStorage.getItem("HelmetImageAndNameAndCost") ||
        JSON.stringify(HelmetImageAndNameAndCost)
    )
  );
  //==================
  // GET UPGRADED Helmet NAME FROM ENCHANT FUNCTION
  const [UpgradedNamesHelmet, setUpgradedNamesHelmet] = useState<any>(
    Array(HelmetData.length).fill("")
  );

  //==================

  //FUNCTION TO AUTOMATICALY REFRESH Helmet STATS
  // !! useState important for show the value points per click !!
  const [selectedHelmetItem, setSelectedHelmetItem] = useState(null);

  // geting the id on click
  const handleHelmetItemSelect = (HelmetIndex: any) => {
    setSelectedHelmetItem(HelmetIndex);
  };

  //we get the id of the currently selected item (eq selected) which is saved in localstorage for update statistic DMG
  const savedHelmetId = localStorage.getItem("selectedHelmetItemIdEquip");

  //we add fake id to the selected item to make it refresh automatically
  useEffect(() => {
    handleHelmetItemSelect(Number(savedHelmetId));
  }, []);
  // Declare state to save selected item index, initialized with 0
  const [selectedHelmetItemIndex, setSelectedHelmetItemIndex] =
    useState<number>(0);
  // its weapon or armor ?
  const [itsHelmet, setitsHelmet] = useState<boolean>(false);
  //==================
  // SAVES THE TRUE VALUE OF MAIN Helmet DEF
  const [UpgradedDefHelmet, setUpgradedDefHelmet] = useState<string>("");

  //=======================ARMOR===========================

  // ARRAY OF THE ENTIRE ARMOR
  const [ArmorData, setArmorData] = useState<any>(
    JSON.parse(
      localStorage.getItem("ArmorImageAndNameAndCost") ||
        JSON.stringify(ArmorImageAndNameAndCost)
    )
  );
  //==================
  // GET UPGRADED ARMOR NAME FROM ENCHANT FUNCTION
  const [UpgradedNamesArmor, setUpgradedNamesArmor] = useState<any>(
    Array(ArmorData.length).fill("")
  );

  //FUNCTION TO AUTOMATICALY REFRESH ARMOR STATS
  // !! useState important for show the value points per click !!
  const [selectedArmorItem, setSelectedArmorItem] = useState(null);

  // geting the id on click
  const handleArmorItemSelect = (armorIndex: any) => {
    setSelectedArmorItem(armorIndex);
  };

  //we get the id of the currently selected item (eq selected) which is saved in localstorage for update statistic DMG
  const savedArmorId = localStorage.getItem("selectedArmorItemIdEquip");

  //we add fake id to the selected item to make it refresh automatically
  useEffect(() => {
    handleArmorItemSelect(Number(savedArmorId));
  }, []);

  // Declare state to save selected item index, initialized with 0
  const [selectedArmorItemIndex, setSelectedArmorItemIndex] =
    useState<number>(0);

  // its weapon or armor ?
  const [itsArmor, setitsArmor] = useState<boolean>(false);

  //==================
  // SAVES THE TRUE VALUE OF MAIN ARMOR DEF
  const [UpgradedDefArmor, setUpgradedDefArmor] = useState<string>("");

  //===========================MAIN WEAPON=====================

  // ARRAY OF THE ENTIRE MAIN WEAPON
  const [mainWeaponData, setMainWeaponData] = useState<any>(
    JSON.parse(
      localStorage.getItem("MainWeaponImageAndNameAndCost") ||
        JSON.stringify(MainWeaponImageAndNameAndCost)
    )
  );
  //==================
  // SAVES THE TRUE VALUE OF MAIN WEAPON DMG
  const [UpgradedDmgMainWeapon, setUpgradedDmgMainWeapon] =
    useState<string>("");

  //==================
  // GET UPGRADED NAME FROM ENCHANT FUNCTION
  const [UpgradedNamesMainWeapon, setUpgradedNamesMainWeapon] = useState<any>(
    Array(mainWeaponData.length).fill("")
  );

  //===============
  //FUNCTION TO AUTOMATICALY REFRESH MAIN WEAPON STATS
  // !! useState important for show the value points per click !!
  const [selectedItem, setSelectedItem] = useState(null);

  // geting the id on click
  const handleItemSelect = (index: any) => {
    setSelectedItem(index);
  };

  //we get the id of the currently selected item (eq selected) which is saved in localstorage for update statistic DMG
  const savedId = localStorage.getItem("selectedItemIdEquip");

  //we add fake id to the selected item to make it refresh automatically
  useEffect(() => {
    handleItemSelect(Number(savedId));
  }, []);

  // Declare state to save selected item index, initialized with 0
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  const [itsMainWeapon, setitsMainWeapon] = useState<boolean>(false);

  //===================INVENTORY============================
  const [FullInv, setFullInv] = useState<boolean>(false);

  //=========================ENCHANT ================================

  const [OpenAndCloseEqinEnchant, setOpenAndCloseEqinEnchant] =
    useState<boolean>(false);
  function OpenCloseEqinEnchant() {
    setOpenAndCloseEqinEnchant(!OpenAndCloseEqinEnchant);
  }

  //=========================CHARACTER======================
  const [UpgradeCharacters, setUpgradeCharacters] = useState<boolean>(false);

  const [UpgradeVillageAndClicks, setUpgradeVillageAndClicks] =
    useState<boolean>(false);
  //=========================DMG BOOST FOR CHARACTER UPGRADE=======================
  const [DmgBoost, setDmgBoost] = useState<number>(
    Number(localStorage.getItem("DmgBoost")) || 1
  );

  //=========================DEF BOOST FOR CHARACTER UPGRADE=======================
  const [DefBoosts, setDefBoosts] = useState<number>(
    Number(localStorage.getItem("DefBoosts")) || 1
  );
  //=================================================================================
  //==============================DEF AND DMG VALUE==================================
  //=================================================================================
  const [FullDefValue, setFullDefValue] = useState<any>();

  setTimeout(() => {
    // export data from statistic
    const FullDmgFromText = document.querySelector(
      ".statsFullDef"
    ) as HTMLElement;
    //if the data exists, convert it to a text
    const text = FullDmgFromText?.textContent;
    setFullDefValue(text);
  }, 10);
  //==============
  // full Dmg Stats
  const [FullDmgValue, setFullDmgValue] = useState<any>();

  setTimeout(() => {
    // export data from statistic
    const FullDmgFromText = document.querySelector(
      ".statsFullDmg"
    ) as HTMLElement;
    //if the data exists, convert it to a text
    const text = FullDmgFromText?.textContent;
    setFullDmgValue(text);
  }, 10);

  //=============================MAX VALUE DMG + DEF===============================
  // HERE NEW WARIABLES ARE ADDED WHICH ARE USED TO INCREASE POINTS PER CLICK
  const [FullCountPerClick, setFullCountPerClick] = useState<number>(
    (Number(FullDmgValue) || 0) + (Number(FullDefValue) || 0)
  );
  //=================================================================================
  //===================================Leveling======================================
  //=================================================================================

  const [clickCount, setClickCount] = useState(
    Number(localStorage.getItem("clickCount")) || 0
  );
  const [fillCount, setFillCount] = useState(
    Number(localStorage.getItem("fillCount")) || 0
  );
  const [maxClicks, setMaxClicks] = useState(
    Number(localStorage.getItem("maxClicks")) || 50
  );
  const [maxClicksCount, setMaxClicksCount] = useState(
    Number(localStorage.getItem("maxClicksCount")) || 1
  );
  const clickIncrease = FullCountPerClick;

  function handleButtonClick() {
    if (clickCount < maxClicks) {
      setClickCount(clickCount + clickIncrease);
      if (clickCount + clickIncrease >= maxClicks) {
        setFillCount(fillCount + 1);
        setClickCount(0);
        if (fillCount + 1 === maxClicksCount) {
          setMaxClicks(Number(maxClicks) * 1.8342);
          setMaxClicksCount(maxClicksCount + 1);
        }
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("fillCount", fillCount.toString());
    localStorage.setItem("clickCount", clickCount.toString());
    localStorage.setItem("maxClicks", maxClicks.toString());
    localStorage.setItem("maxClicksCount", maxClicksCount.toString());
  }, [fillCount, clickCount, maxClicks, maxClicksCount]);
  //=================================================================================
  //================================TIME AND DAY=====================================
  //=================================================================================
  const [days, setDays] = useState(
    parseInt(localStorage.getItem("days") ?? "") || 0
  );
  const [hours, setHours] = useState(
    parseInt(localStorage.getItem("hours") ?? "") || 0
  );
  const [minutes, setMinutes] = useState(
    parseInt(localStorage.getItem("minutes") ?? "") || 0
  );
  //========================TURN ON / OFF BACKGROUND COLOR===========================

  const [turn, setTurn] = useState<boolean>(true);

  //=================================================================================
  //================================HP BAR===========================================
  //=================================================================================

  const maxHP = (100 + Number(FullDefValue)) * DefBoosts;
  const [currentHP, setCurrentHP] = useState(100); // Inicjalne wartości currentHP
  //=================================================================================
  const [FishData, setFishData] = useState<any>(
    JSON.parse(localStorage.getItem("FishArray") || JSON.stringify(FishArray))
  );

  //====
  const [fishId, setfishId] = useState<number>();
  const [ValueCatch, setValueCatch] = useState(1);

  //=================================================================================
  //=================================================================================

  const [SellFishByCat, setSellFishByCat] = useState<boolean>(false);

  function OpenSellShop() {
    setTimeout(() => {
      setSellFishByCat(true);
    }, 10);
  }

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative", // Tworzy kontekst warstw dla całej mapy
        border: "2px solid black",
        zIndex: 0,
      }}
    >
      <Map position={position}>
        <Structuress
          building={building}
          activeStructure={activeStructure}
          interior={interior}
          mainWeaponData={mainWeaponData}
          setMainWeaponData={setMainWeaponData}
          count={count}
          setCount={setCount}
          FullInv={FullInv}
        />
        <Player position={position} />
        <button
          onClick={clearLocalStorage}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "blue",
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,
            transform: "translate(-50%, -50%)",
            zIndex: 200,
          }}
        >
          {count}
        </button>
        {/* Inne elementy */}
        <Borders allBorders={allBorders} />
        <Trees noEntryOnTree={noEntryOnTree} />
        <MainEq
          SellFishByCat={SellFishByCat}
          setfishId={setfishId}
          mainWeaponData={mainWeaponData}
          UpgradedNamesMainWeapon={UpgradedNamesMainWeapon}
          selectedItem={selectedItem}
          ArmorData={ArmorData}
          UpgradedNamesArmor={UpgradedNamesArmor}
          selectedArmorItem={selectedArmorItem}
          HelmetData={HelmetData}
          UpgradedNamesHelmet={UpgradedNamesHelmet}
          selectedHelmetItem={selectedHelmetItem}
          ShoesData={ShoesData}
          UpgradedNamesShoes={UpgradedNamesShoes}
          selectedShoesItem={selectedShoesItem}
          GlovesData={GlovesData}
          UpgradedNamesGloves={UpgradedNamesGloves}
          selectedGlovesItem={selectedGlovesItem}
          ShieldAndDaggerData={ShieldAndDaggerData}
          UpgradedNamesShieldAndDagger={UpgradedNamesShieldAndDagger}
          selectedShieldAndDaggerItem={selectedShieldAndDaggerItem}
          setGlovesData={setGlovesData}
          setMainWeaponData={setMainWeaponData}
          setArmorData={setArmorData}
          setHelmetData={setHelmetData}
          setShoesData={setShoesData}
          setShieldAndDaggerData={setShieldAndDaggerData}
          setFullInv={setFullInv}
          FullInv={FullInv}
          OpenAndCloseEqinEnchant={OpenAndCloseEqinEnchant}
          setOpenAndCloseEqinEnchant={setOpenAndCloseEqinEnchant}
          setSelectedItemIndex={setSelectedItemIndex}
          setUpgradedDmgMainWeapon={setUpgradedDmgMainWeapon}
          setSelectedArmorItemIndex={setSelectedArmorItemIndex}
          setUpgradedDefArmor={setUpgradedDefArmor}
          setitsMainWeapon={setitsMainWeapon}
          setitsArmor={setitsArmor}
          setSelectedHelmetItemIndex={setSelectedHelmetItemIndex}
          setUpgradedDefHelmet={setUpgradedDefHelmet}
          setitsHelmet={setitsHelmet}
          setSelectedShoesItemIndex={setSelectedShoesItemIndex}
          setUpgradedDefShoes={setUpgradedDefShoes}
          setitsShoes={setitsShoes}
          setSelectedGlovesItemIndex={setSelectedGlovesItemIndex}
          setUpgradedDefGloves={setUpgradedDefGloves}
          setitsGloves={setitsGloves}
          setSelectedShieldAndDaggerItemIndex={
            setSelectedShieldAndDaggerItemIndex
          }
          setUpgradedDefShieldAndDagger={setUpgradedDefShieldAndDagger}
          setitsShieldAndDagger={setitsShieldAndDagger}
          setUpgradedDmgShieldAndDagger={setUpgradedDmgShieldAndDagger}
          setUpgradeCharacters={setUpgradeCharacters}
          setUpgradeVillageAndClicks={setUpgradeVillageAndClicks}
          FishData={FishData}
          setFishData={setFishData}
          setValueCatch={setValueCatch}
          position={position}
          count={count}
        />
      </Map>
    </div>
  );
};

export default App;
