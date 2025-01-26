import React, { useEffect, useState } from "react";
import WeaponShop1 from "./Shop/WeaponShop/WShop.tsx";
import Enchant from "./enchant/index.tsx";

const BlackSmith = ({
  BlackSmithInterior,
  //enchant
  mainWeaponData,
  setUpgradedNamesMainWeapon,
  UpgradedNamesMainWeapon,
  setUpgradedDmgMainWeapon,
  UpgradedDmgMainWeapon,
  UpgradedDefArmor,
  setUpgradedDefArmor,
  ArmorData,
  setUpgradedNamesArmor,
  UpgradedNamesArmor,
  HelmetData,
  UpgradedNamesHelmet,
  setUpgradedNamesHelmet,
  setUpgradedDefHelmet,
  UpgradedDefHelmet,
  ShoesData,
  UpgradedNamesShoes,
  setUpgradedNamesShoes,
  setUpgradedDefShoes,
  UpgradedDefShoes,

  GlovesData,
  UpgradedNamesGloves,
  setUpgradedNamesGloves,
  setUpgradedDefGloves,
  UpgradedDefGloves,

  ShieldAndDaggerData,
  UpgradedNamesShieldAndDagger,
  setUpgradedNamesShieldAndDagger,
  setUpgradedDefShieldAndDagger,
  UpgradedDefShieldAndDagger,
  setUpgradedDmgShieldAndDagger,
  UpgradedDmgShieldAndDagger,

  OpenCloseEqinEnchant,
  //loop

  //2
  itsMainWeapon,
  selectedArmorItemIndex,
  itsArmor,
  itsHelmet,
  selectedHelmetItemIndex,
  itsShoes,
  selectedShoesItemIndex,
  itsGloves,
  selectedGlovesItemIndex,
  itsShieldAndDagger,
  selectedShieldAndDaggerItemIndex,

  selectedItemIndex,
  Close,
  setClose,
}: {
  BlackSmithInterior: any;
  //enchant
  mainWeaponData: any;
  setUpgradedNamesMainWeapon: any;
  UpgradedNamesMainWeapon: any;
  setUpgradedDmgMainWeapon: any;
  UpgradedDmgMainWeapon: any;
  UpgradedDefArmor: any;
  setUpgradedDefArmor: any;
  ArmorData: any;
  setUpgradedNamesArmor: any;
  UpgradedNamesArmor: any;
  HelmetData: any;
  UpgradedNamesHelmet: any;
  setUpgradedNamesHelmet: any;
  setUpgradedDefHelmet: any;
  UpgradedDefHelmet: any;
  ShoesData: any;
  UpgradedNamesShoes: any;
  setUpgradedNamesShoes: any;
  setUpgradedDefShoes: any;
  UpgradedDefShoes: any;
  GlovesData: any;
  UpgradedNamesGloves: any;
  setUpgradedNamesGloves: any;
  setUpgradedDefGloves: any;
  UpgradedDefGloves: any;

  ShieldAndDaggerData: any;
  UpgradedNamesShieldAndDagger: any;
  setUpgradedNamesShieldAndDagger: any;
  setUpgradedDefShieldAndDagger: any;
  UpgradedDefShieldAndDagger: any;
  setUpgradedDmgShieldAndDagger: any;
  UpgradedDmgShieldAndDagger: any;

  OpenCloseEqinEnchant: any;
  //loop

  //2
  itsMainWeapon: any;
  selectedArmorItemIndex: any;
  itsArmor: any;
  itsHelmet: any;
  selectedHelmetItemIndex: any;
  itsShoes: any;
  selectedShoesItemIndex: any;
  itsGloves: any;
  selectedGlovesItemIndex: any;
  itsShieldAndDagger: any;
  selectedShieldAndDaggerItemIndex: any;

  selectedItemIndex: any;
  Close: any;
  setClose: any;
}) => {
  //======================================================================
  //========================= FOR ENCHANT ================================
  //======================================================================

  //MAIN WEAPON
  /// load image form localstorage
  const savedImage = localStorage.getItem("selectedItemImgForEnchant");
  const savedName = localStorage.getItem("selectedItemNameForEnchant");
  // Declare state to save selected damage value, initialized with null
  const [, setSavedDmgMains] = useState<number | null>(null);

  // Load selected damage value from local storage when component mounts
  useEffect(() => {
    const savedDmgMainFromLocalStorage = localStorage.getItem(
      "selectedItemDmgForEnchant"
    );
    if (savedDmgMainFromLocalStorage) {
      setSavedDmgMains(Number(savedDmgMainFromLocalStorage));
    }
  }, []);

  // Declare state to save saved item upgrade value, initialized with 0
  const [savedItemUpgrade] = useState<number>(0);

  // its weapon or armor ?

  const savedUpgradedValue = localStorage.getItem("upgradedValue");
  const upgradedValue = savedUpgradedValue ? Number(savedUpgradedValue) : 0;

  // to check the enchantment level
  //armor
  const savedArmorUpgradedValue = localStorage.getItem("ArmorUpgradedValue");
  const ArmorupgradedValue = savedArmorUpgradedValue
    ? Number(savedArmorUpgradedValue)
    : 0;
  //helmet
  const savedHelmetUpgradedValue = localStorage.getItem("HelmetUpgradedValue");
  const HelmetupgradedValue = savedHelmetUpgradedValue
    ? Number(savedHelmetUpgradedValue)
    : 0;
  //Shoes
  const savedShoesUpgradedValue = localStorage.getItem("ShoesUpgradedValue");
  const ShoesupgradedValue = savedShoesUpgradedValue
    ? Number(savedShoesUpgradedValue)
    : 0;
  //gloves
  const savedGlovesUpgradedValue = localStorage.getItem("GlovesUpgradedValue");
  const GlovesupgradedValue = savedGlovesUpgradedValue
    ? Number(savedGlovesUpgradedValue)
    : 0;
  //gloves
  const savedShieldAndDaggerUpgradedValue = localStorage.getItem(
    "ShieldAndDaggerUpgradedValue"
  );
  const ShieldAndDaggerupgradedValue = savedShieldAndDaggerUpgradedValue
    ? Number(savedShieldAndDaggerUpgradedValue)
    : 0;
  //=================================================================================
  //ARMOR
  /// load image form localstorage
  const savedArmorImage = localStorage.getItem(
    "selectedArmorItemImgForEnchant"
  );
  const savedArmorName = localStorage.getItem(
    "selectedArmorItemNameForEnchant"
  );

  // Declare state to save selected damage value, initialized with null
  const [, setSavedDefArmor] = useState<number | null>(null);

  // Load selected damage value from local storage when component mounts
  useEffect(() => {
    const savedDefArmorFromLocalStorage = localStorage.getItem(
      "selectedItemDefForEnchant"
    );
    if (savedDefArmorFromLocalStorage) {
      setSavedDefArmor(Number(savedDefArmorFromLocalStorage));
    }
  }, []);

  // Declare state to save saved item upgrade value, initialized with 0
  const [savedArmorItemUpgrade] = useState<number>(0);

  //=================================================================================
  //HELMET
  /// load image form localstorage
  const savedHelmetImage = localStorage.getItem(
    "selectedHelmetItemImgForEnchant"
  );
  const savedHelmetName = localStorage.getItem(
    "selectedHelmetItemNameForEnchant"
  );

  // Declare state to save selected damage value, initialized with null
  const [, setSavedDefHelmet] = useState<number | null>(null);

  // Load selected damage value from local storage when component mounts
  useEffect(() => {
    const savedDefHelmetFromLocalStorage = localStorage.getItem(
      "selectedItemDefForEnchant"
    );
    if (savedDefHelmetFromLocalStorage) {
      setSavedDefHelmet(Number(savedDefHelmetFromLocalStorage));
    }
  }, []);

  // Declare state to save saved item upgrade value, initialized with 0
  const [savedHelmetItemUpgrade] = useState<number>(0);

  //=================================================================================
  //SHOES
  /// load image form localstorage
  const savedShoesImage = localStorage.getItem(
    "selectedShoesItemImgForEnchant"
  );
  const savedShoesName = localStorage.getItem(
    "selectedShoesItemNameForEnchant"
  );

  // Declare state to save selected damage value, initialized with null
  const [, setSavedDefShoes] = useState<number | null>(null);

  // Load selected damage value from local storage when component mounts
  useEffect(() => {
    const savedDefShoesFromLocalStorage = localStorage.getItem(
      "selectedItemDefForEnchant"
    );
    if (savedDefShoesFromLocalStorage) {
      setSavedDefShoes(Number(savedDefShoesFromLocalStorage));
    }
  }, []);

  // Declare state to save saved item upgrade value, initialized with 0
  const [savedShoesItemUpgrade] = useState<number>(0);

  //=================================================================================
  //ShieldAndDagger
  /// load image form localstorage
  const savedShieldAndDaggerImage = localStorage.getItem(
    "selectedShieldAndDaggerItemImgForEnchant"
  );
  const savedShieldAndDaggerName = localStorage.getItem(
    "selectedShieldAndDaggerItemNameForEnchant"
  );
  // Declare state to save selected damage value, initialized with null
  const [, setSavedDefShieldAndDagger] = useState<number | null>(null);

  // Load selected damage value from local storage when component mounts
  useEffect(() => {
    const savedDefShieldAndDaggerFromLocalStorage = localStorage.getItem(
      "selectedItemDefForEnchant"
    );
    if (savedDefShieldAndDaggerFromLocalStorage) {
      setSavedDefShieldAndDagger(
        Number(savedDefShieldAndDaggerFromLocalStorage)
      );
    }
  }, []);
  // Declare state to save selected damage value, initialized with null
  const [, setSavedDmgShieldAndDagger] = useState<number | null>(null);

  // Load selected damage value from local storage when component mounts
  useEffect(() => {
    const savedDmgShieldAndDaggerFromLocalStorage = localStorage.getItem(
      "selectedItemDmgForEnchant"
    );
    if (savedDmgShieldAndDaggerFromLocalStorage) {
      setSavedDmgShieldAndDagger(
        Number(savedDmgShieldAndDaggerFromLocalStorage)
      );
    }
  }, []);

  // Declare state to save saved item upgrade value, initialized with 0
  const [savedShieldAndDaggerItemUpgrade] = useState<number>(0);

  //=================================================================================
  //Gloves
  /// load image form localstorage
  const savedGlovesImage = localStorage.getItem(
    "selectedGlovesItemImgForEnchant"
  );
  const savedGlovesName = localStorage.getItem(
    "selectedGlovesItemNameForEnchant"
  );

  // Declare state to save selected damage value, initialized with null
  const [, setSavedDefGloves] = useState<number | null>(null);

  // Load selected damage value from local storage when component mounts
  useEffect(() => {
    const savedDefGlovesFromLocalStorage = localStorage.getItem(
      "selectedItemDefForEnchant"
    );
    if (savedDefGlovesFromLocalStorage) {
      setSavedDefGloves(Number(savedDefGlovesFromLocalStorage));
    }
  }, []);

  // Declare state to save saved item upgrade value, initialized with 0
  const [savedGlovesItemUpgrade] = useState<number>(0);

  const [savePontsForUpgrade, setsavePontsForUpgrade] = useState<number>(
    Number(localStorage.getItem("savePontsForUpgrade")) || 0
  );

  return (
    <>
      {BlackSmithInterior.map(
        (div: {
          url: string;
          id: React.Key | null | undefined;
          isColliding: any;
          name: string | undefined;
          width: any;
          height: any;
          y: any;
          x: any;
        }) => (
          <React.Fragment key={div.id}>
            {/* Główny div */}
            <div
              style={{
                clipPath:
                  "polygon(12% 44%, 44% 44%, 44% 33%, 63% 33%, 63% 45%, 88% 45%, 88% 88%, 43% 88%, 43% 95%, 43% 96%,12% 96%)",

                position: "absolute",
                width: `${div.width}px`,
                height: `${div.height}px`,
                top: `${div.y}px`,
                left: `${div.x}px`,
                border: "2px solid black",
                zIndex: 200, // Specjalny div będzie nad innymi
                opacity: 0.5,
                pointerEvents: "none",
              }}
            ></div>
            {/* Pierwszy obrazek z wnętrzem*/}
            <img
              src={
                div.isColliding
                  ? div.url
                  : "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/BlackSmith/blackSmithExterior.png"
              }
              alt="WeaponShop"
              style={{
                display: "block", // Usuwa odstępy wynikające z inline
                top: `${div.y}px`,
                left: `${div.x}px`,
                width: `${div.width}px`,
                height: `${div.height}px`,
                position: "absolute", // Ustawienie pozycji
                zIndex: div.isColliding ? 100 : 1000, // Niższy z-index dla pierwszego obrazka
                pointerEvents: "none",
              }}
              draggable="false"
            />
            {/* Drugi obrazek ze ścianą */}
            <img
              src={
                div.isColliding
                  ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/BlackSmith/blackSmithWallNoShadow2.png"
                  : undefined
              }
              alt="WeaponShop"
              style={{
                position: "absolute", // Ustawienie pozycji
                top: `${div.y}px`,
                left: `${div.x}px`,
                width: `${div.width}px`,
                height: `${div.height}px`,
                zIndex: 1000, // Wyższy z-index dla drugiego obrazka
                pointerEvents: "none",
                display: div.isColliding ? "block" : "none",
              }}
              draggable="false"
            />
            {/* Trzeci obrazek z cieniem ściany */}
            <img
              src={
                div.isColliding
                  ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/BlackSmith/blackSmithWallWithShadow.png"
                  : undefined
              }
              alt="WeaponShop"
              style={{
                opacity: 0.5,
                position: "absolute", // Ustawienie pozycji
                top: `${div.y}px`,
                left: `${div.x}px`,
                width: `${div.width}px`,
                height: `${div.height}px`,
                zIndex: 1000, // Wyższy z-index dla drugiego obrazka
                pointerEvents: "none",
                display: div.isColliding ? "block" : "none",
              }}
              draggable="false"
            />
            <span
              style={{
                position: "absolute", // Ustawienie pozycji
                top: `${div.y + 584}px`,
                left: `${div.x + 213}px`,
                width: `${div.width}px`,
                height: `${div.height}px`,
                zIndex: 1000, // Wyższy z-index dla drugiego obrazka
                display: div.isColliding ? "block" : "none",
                pointerEvents: "auto",
              }}
            >
              <Enchant
                UpgradedDmgMainWeapon={UpgradedDmgMainWeapon}
                setUpgradedDmgMainWeapon={setUpgradedDmgMainWeapon}
                mainWeaponData={mainWeaponData}
                setUpgradedNamesMainWeapon={setUpgradedNamesMainWeapon}
                UpgradedNamesMainWeapon={UpgradedNamesMainWeapon}
                UpgradedDefArmor={UpgradedDefArmor}
                setUpgradedDefArmor={setUpgradedDefArmor}
                ArmorData={ArmorData}
                setUpgradedNamesArmor={setUpgradedNamesArmor}
                UpgradedNamesArmor={UpgradedNamesArmor}
                HelmetData={HelmetData}
                UpgradedNamesHelmet={UpgradedNamesHelmet}
                setUpgradedNamesHelmet={setUpgradedNamesHelmet}
                setUpgradedDefHelmet={setUpgradedDefHelmet}
                UpgradedDefHelmet={UpgradedDefHelmet}
                ShoesData={ShoesData}
                UpgradedNamesShoes={UpgradedNamesShoes}
                setUpgradedNamesShoes={setUpgradedNamesShoes}
                setUpgradedDefShoes={setUpgradedDefShoes}
                UpgradedDefShoes={UpgradedDefShoes}
                GlovesData={GlovesData}
                UpgradedNamesGloves={UpgradedNamesGloves}
                setUpgradedNamesGloves={setUpgradedNamesGloves}
                setUpgradedDefGloves={setUpgradedDefGloves}
                UpgradedDefGloves={UpgradedDefGloves}
                ShieldAndDaggerData={ShieldAndDaggerData}
                UpgradedNamesShieldAndDagger={UpgradedNamesShieldAndDagger}
                setUpgradedDefShieldAndDagger={setUpgradedDefShieldAndDagger}
                UpgradedDefShieldAndDagger={UpgradedDefShieldAndDagger}
                setUpgradedNamesShieldAndDagger={
                  setUpgradedNamesShieldAndDagger
                }
                setUpgradedDmgShieldAndDagger={setUpgradedDmgShieldAndDagger}
                UpgradedDmgShieldAndDagger={UpgradedDmgShieldAndDagger}
                OpenCloseEqinEnchant={OpenCloseEqinEnchant}
                itsMainWeapon={itsMainWeapon}
                selectedArmorItemIndex={selectedArmorItemIndex}
                itsArmor={itsArmor}
                itsHelmet={itsHelmet}
                selectedHelmetItemIndex={selectedHelmetItemIndex}
                itsShoes={itsShoes}
                selectedShoesItemIndex={selectedShoesItemIndex}
                itsGloves={itsGloves}
                selectedGlovesItemIndex={selectedGlovesItemIndex}
                itsShieldAndDagger={itsShieldAndDagger}
                selectedShieldAndDaggerItemIndex={
                  selectedShieldAndDaggerItemIndex
                }
                savedImage={savedImage}
                savedName={savedName}
                savedArmorImage={savedArmorImage}
                savedArmorName={savedArmorName}
                savedHelmetImage={savedHelmetImage}
                savedHelmetName={savedHelmetName}
                savedGlovesImage={savedGlovesImage}
                savedShieldAndDaggerImage={savedShieldAndDaggerImage}
                upgradedValue={upgradedValue}
                selectedItemIndex={selectedItemIndex}
                savedShoesImage={savedShoesImage}
                Close={Close}
                setClose={setClose}
              />
            </span>
          </React.Fragment>
        )
      )}
    </>
  );
};

export default BlackSmith;
