/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MainWeaponImageAndNameAndCost } from "../../../data/Sword.tsx";
import { ArmorImageAndNameAndCost } from "../../../data/Armor.tsx";
import { HelmetImageAndNameAndCost } from "../../../data/Helmet.tsx";
import { ShoesImageAndNameAndCost } from "../../../data/Shoes.tsx";
import { GlovesImageAndNameAndCost } from "../../../data/Gloves.tsx";
import { ShieldAndDaggerImageAndNameAndCost } from "../../../data/SubWeapon.tsx";
import React from "react";
import { getSavedDmgMain } from "../../enchant/index.tsx";
import { getSavedDmgShieldAndDagger } from "../../enchant/index.tsx";
import { getSavedDefShoes } from "../../enchant/index.tsx";
import { getSavedDefGloves } from "../../enchant/index.tsx";
import { getSavedDefHelmet } from "../../enchant/index.tsx";
import { getSavedDefArmor } from "../../enchant/index.tsx";

const EnchantSucces = ({
  upgradedValue,
  selectedItemIndex,
  savedImage,
  savedName,
  UpgradedDmgMainWeapon,
  setUpgradedDmgMainWeapon,
  selectedArmorItemIndex,
  savedArmorImage,
  savedArmorName,
  setUpgradedDefArmor,
  UpgradedDefArmor,
  itsMainWeapon,
  itsArmor,
  UpgradedDefHelmet,
  selectedHelmetItemIndex,
  savedHelmetImage,
  savedHelmetName,
  setUpgradedDefHelmet,
  itsHelmet,
  UpgradedDefShoes,
  selectedShoesItemIndex,
  savedShoesImage,
  setUpgradedDefShoes,
  itsShoes,
  UpgradedDefGloves,
  selectedGlovesItemIndex,
  savedGlovesImage,
  setUpgradedDefGloves,
  itsGloves,
  UpgradedDefShieldAndDagger,
  selectedShieldAndDaggerItemIndex,
  savedShieldAndDaggerImage,
  setUpgradedDefShieldAndDagger,
  itsShieldAndDagger,
  setUpgradedDmgShieldAndDagger,
  UpgradedDmgShieldAndDagger,
  Close,
  mainWeaponData,
  ShieldAndDaggerData,
  ShoesData,
  GlovesData,
  HelmetData,
  ArmorData,
}: {
  upgradedValue: any;
  selectedItemIndex: any;
  savedImage: any;
  savedName: any;
  UpgradedDmgMainWeapon: any;
  setUpgradedDmgMainWeapon: any;
  selectedArmorItemIndex: any;
  savedArmorImage: any;
  savedArmorName: any;
  setUpgradedDefArmor: any;
  UpgradedDefArmor: any;
  itsMainWeapon: any;
  itsArmor: any;
  UpgradedDefHelmet: any;
  selectedHelmetItemIndex: any;
  savedHelmetImage: any;
  savedHelmetName: any;
  setUpgradedDefHelmet: any;
  itsHelmet: any;
  UpgradedDefShoes: any;
  selectedShoesItemIndex: any;
  savedShoesImage: any;
  setUpgradedDefShoes: any;
  itsShoes: any;
  UpgradedDefGloves: any;
  selectedGlovesItemIndex: any;
  savedGlovesImage: any;
  setUpgradedDefGloves: any;
  itsGloves: any;
  UpgradedDefShieldAndDagger: any;
  selectedShieldAndDaggerItemIndex: any;
  savedShieldAndDaggerImage: any;
  setUpgradedDefShieldAndDagger: any;
  itsShieldAndDagger: any;
  setUpgradedDmgShieldAndDagger: any;
  UpgradedDmgShieldAndDagger: any;
  Close: any;
  mainWeaponData: any;
  ShieldAndDaggerData: any;
  ShoesData: any;
  GlovesData: any;
  HelmetData: any;
  ArmorData: any;
}) => {
  const [CurrentValueUpgrade, setCurrentValueUpgrade] = useState<number>(0);
  // Declare state to save upgraded item name, initialized with an empty string
  const [UpgradedName, setUpgradedName] = useState<string>("");
  //armor
  const [UpgradedArmorName, setUpgradedArmorName] = useState<string>("");
  //helmet
  const [UpgradedHelmetName, setUpgradedHelmetName] = useState<string>("");
  //Shoes
  const [UpgradedShoesName, setUpgradedShoesName] = useState<string>("");
  //Gloves
  const [UpgradedGlovesName, setUpgradedGlovesName] = useState<string>("");
  //ShieldAndDagger
  const [UpgradedShieldAndDaggerName, setUpgradedShieldAndDaggerName] =
    useState<string>("");
  // Function to show item name on hover
  function ShowNameOnHover(index: any) {
    // Get item from the list of weapon images and names at specified index
    const item = MainWeaponImageAndNameAndCost[index];

    // Create name of upgrade based on item name
    const itemUpgradeName = `${item.name}`;

    // Load saved upgrade value from local storage or set it to 0
    const savedItemUpgradeFromLocalStorage =
      localStorage.getItem(itemUpgradeName);
    const savedItemUpgradeValue = savedItemUpgradeFromLocalStorage
      ? Number(savedItemUpgradeFromLocalStorage)
      : 0;

    setCurrentValueUpgrade(Number(savedItemUpgradeFromLocalStorage));
    // Set upgraded item name based on upgrade value, or set it to empty string if upgrade value is 15 or greater
    if (savedItemUpgradeValue < 15) {
      const itemName = `+${savedItemUpgradeValue + 1} ${item.name}`;
      setUpgradedName(itemName);
    } else {
      const itemName = ""; // Set itemName to an empty string
      setUpgradedName(itemName);
    }

    // Set upgraded damage value for the selected item, multiplying it by 2
    const itemSavedDmgMainKey = `selectedItemDmgForEnchant_${item.name}`;
    let newSavedDmgMain = Number(
      localStorage.getItem(itemSavedDmgMainKey) || item.dmgLvl0
    );
    if (item.tier === "green") {
      newSavedDmgMain *= 1.2;
    } else if (item.tier === "blue") {
      newSavedDmgMain *= 1.7;
    } else if (item.tier === "yellow") {
      newSavedDmgMain *= 2.7;
    } else if (item.tier === "red") {
      newSavedDmgMain *= 3.4;
    } else if (item.tier === "purple") {
      newSavedDmgMain *= 5;
    }

    setUpgradedDmgMainWeapon(newSavedDmgMain);
  }

  //armor======
  function ShowNameOnHoverForArmor(armorIndex: any) {
    // Get item from the list of weapon images and names at specified index
    const armor = ArmorImageAndNameAndCost[armorIndex];

    // Create name of upgrade based on item name
    const ArmorItemUpgradeName = `${armor.name}`;

    // Load saved upgrade value from local storage or set it to 0
    const savedArmorItemUpgradeFromLocalStorage =
      localStorage.getItem(ArmorItemUpgradeName);
    const savedArmorItemUpgradeValue = savedArmorItemUpgradeFromLocalStorage
      ? Number(savedArmorItemUpgradeFromLocalStorage)
      : 0;
    setCurrentValueUpgrade(Number(savedArmorItemUpgradeFromLocalStorage));

    // Set upgraded item name based on upgrade value, or set it to empty string if upgrade value is 15 or greater
    if (savedArmorItemUpgradeValue < 15) {
      const ArmorItemName = `+${savedArmorItemUpgradeValue + 1} ${armor.name}`;
      setUpgradedArmorName(ArmorItemName);
    } else {
      const ArmorItemName = ""; // Set ArmorItemName to an empty string
      setUpgradedArmorName(ArmorItemName);
    }

    // Set upgraded damage value for the selected item, multiplying it by 2
    const itemSavedDefArmorKey = `selectedItemDefForEnchant_${armor.name}`;
    let newSavedDefArmor = Number(
      localStorage.getItem(itemSavedDefArmorKey) || armor.defLvl0
    );
    newSavedDefArmor *= 2;
    setUpgradedDefArmor(newSavedDefArmor);
  }

  function ShowNameOnHoverForHelmet(HelmetIndex: any) {
    // Get item from the list of weapon images and names at specified index
    const Helmet = HelmetImageAndNameAndCost[HelmetIndex];

    // Create name of upgrade based on item name
    const HelmetItemUpgradeName = `${Helmet.name}`;

    // Load saved upgrade value from local storage or set it to 0
    const savedHelmetItemUpgradeFromLocalStorage = localStorage.getItem(
      HelmetItemUpgradeName
    );
    const savedHelmetItemUpgradeValue = savedHelmetItemUpgradeFromLocalStorage
      ? Number(savedHelmetItemUpgradeFromLocalStorage)
      : 0;
    setCurrentValueUpgrade(Number(savedHelmetItemUpgradeFromLocalStorage));

    // Set upgraded item name based on upgrade value, or set it to empty string if upgrade value is 15 or greater
    if (savedHelmetItemUpgradeValue < 15) {
      const HelmetItemName = `+${savedHelmetItemUpgradeValue + 1} ${
        Helmet.name
      }`;
      setUpgradedHelmetName(HelmetItemName);
    } else {
      const HelmetItemName = ""; // Set HelmetItemName to an empty string
      setUpgradedHelmetName(HelmetItemName);
    }

    // Set upgraded damage value for the selected item, multiplying it by 2
    const itemSavedDefHelmetKey = `selectedItemDefForEnchant_${Helmet.name}`;
    let newSavedDefHelmet = Number(
      localStorage.getItem(itemSavedDefHelmetKey) || Helmet.defLvl0
    );
    newSavedDefHelmet *= 2;
    setUpgradedDefHelmet(newSavedDefHelmet);
  }

  function ShowNameOnHoverForShoes(ShoesIndex: any) {
    // Get item from the list of weapon images and names at specified index
    const Shoes = ShoesImageAndNameAndCost[ShoesIndex];

    // Create name of upgrade based on item name
    const ShoesItemUpgradeName = `${Shoes.name}`;

    // Load saved upgrade value from local storage or set it to 0
    const savedShoesItemUpgradeFromLocalStorage =
      localStorage.getItem(ShoesItemUpgradeName);
    const savedShoesItemUpgradeValue = savedShoesItemUpgradeFromLocalStorage
      ? Number(savedShoesItemUpgradeFromLocalStorage)
      : 0;
    setCurrentValueUpgrade(Number(savedShoesItemUpgradeFromLocalStorage));

    // Set upgraded item name based on upgrade value, or set it to empty string if upgrade value is 15 or greater
    if (savedShoesItemUpgradeValue < 15) {
      const ShoesItemName = `+${savedShoesItemUpgradeValue + 1} ${Shoes.name}`;
      setUpgradedShoesName(ShoesItemName);
    } else {
      const ShoesItemName = ""; // Set ShoesItemName to an empty string
      setUpgradedShoesName(ShoesItemName);
    }

    // Set upgraded damage value for the selected item, multiplying it by 2
    const itemSavedDefShoesKey = `selectedItemDefForEnchant_${Shoes.name}`;
    let newSavedDefShoes = Number(
      localStorage.getItem(itemSavedDefShoesKey) || Shoes.defLvl0
    );
    newSavedDefShoes *= 2;
    setUpgradedDefShoes(newSavedDefShoes);
  }

  function ShowNameOnHoverForGloves(GlovesIndex: any) {
    // Get item from the list of weapon images and names at specified index
    const Gloves = GlovesImageAndNameAndCost[GlovesIndex];

    // Create name of upgrade based on item name
    const GlovesItemUpgradeName = `${Gloves.name}`;

    // Load saved upgrade value from local storage or set it to 0
    const savedGlovesItemUpgradeFromLocalStorage = localStorage.getItem(
      GlovesItemUpgradeName
    );
    const savedGlovesItemUpgradeValue = savedGlovesItemUpgradeFromLocalStorage
      ? Number(savedGlovesItemUpgradeFromLocalStorage)
      : 0;
    setCurrentValueUpgrade(Number(savedGlovesItemUpgradeFromLocalStorage));

    // Set upgraded item name based on upgrade value, or set it to empty string if upgrade value is 15 or greater
    if (savedGlovesItemUpgradeValue < 15) {
      const GlovesItemName = `+${savedGlovesItemUpgradeValue + 1} ${
        Gloves.name
      }`;
      setUpgradedGlovesName(GlovesItemName);
    } else {
      const GlovesItemName = ""; // Set GlovesItemName to an empty string
      setUpgradedGlovesName(GlovesItemName);
    }

    // Set upgraded damage value for the selected item, multiplying it by 2
    const itemSavedDefGlovesKey = `selectedItemDefForEnchant_${Gloves.name}`;
    let newSavedDefGloves = Number(
      localStorage.getItem(itemSavedDefGlovesKey) || Gloves.defLvl0
    );
    newSavedDefGloves *= 2;
    setUpgradedDefGloves(newSavedDefGloves);
  }

  function ShowNameOnHoverForShieldAndDagger(ShieldAndDaggerIndex: any) {
    // Get item from the list of weapon images and names at specified index
    const ShieldAndDagger =
      ShieldAndDaggerImageAndNameAndCost[ShieldAndDaggerIndex];

    // Create name of upgrade based on item name
    const ShieldAndDaggerItemUpgradeName = `${ShieldAndDagger.name}`;

    // Load saved upgrade value from local storage or set it to 0
    const savedShieldAndDaggerItemUpgradeFromLocalStorage =
      localStorage.getItem(ShieldAndDaggerItemUpgradeName);
    const savedShieldAndDaggerItemUpgradeValue =
      savedShieldAndDaggerItemUpgradeFromLocalStorage
        ? Number(savedShieldAndDaggerItemUpgradeFromLocalStorage)
        : 0;
    setCurrentValueUpgrade(
      Number(savedShieldAndDaggerItemUpgradeFromLocalStorage)
    );

    // Set upgraded item name based on upgrade value, or set it to empty string if upgrade value is 15 or greater
    if (savedShieldAndDaggerItemUpgradeValue < 15) {
      const ShieldAndDaggerItemName = `+${
        savedShieldAndDaggerItemUpgradeValue + 1
      } ${ShieldAndDagger.name}`;
      setUpgradedShieldAndDaggerName(ShieldAndDaggerItemName);
    } else {
      const ShieldAndDaggerItemName = ""; // Set ShieldAndDaggerItemName to an empty string
      setUpgradedShieldAndDaggerName(ShieldAndDaggerItemName);
    }

    // Set upgraded defence value for the selected item, multiplying it by 2
    const itemSavedDefShieldAndDaggerKey = `selectedItemDefForEnchant_${ShieldAndDagger.name}`;
    let newSavedDefShieldAndDagger = Number(
      localStorage.getItem(itemSavedDefShieldAndDaggerKey) ||
        ShieldAndDagger.defLvl0
    );
    newSavedDefShieldAndDagger *= 2;
    setUpgradedDefShieldAndDagger(newSavedDefShieldAndDagger);
    // Set upgraded damage value for the selected item, multiplying it by 2
    const itemSavedDmgShieldAndDaggerKey = `selectedItemDmgForEnchant_${ShieldAndDagger.name}`;
    let newSavedDmgShieldAndDagger = Number(
      localStorage.getItem(itemSavedDmgShieldAndDaggerKey) ||
        ShieldAndDagger.dmgLvl0
    );
    newSavedDmgShieldAndDagger *= 2;
    setUpgradedDmgShieldAndDagger(newSavedDmgShieldAndDagger);
  }

  useEffect(() => {
    if (itsMainWeapon === true) {
      ShowNameOnHover(selectedItemIndex);
    } else if (itsArmor === true) {
      ShowNameOnHoverForArmor(selectedArmorItemIndex);
    } else if (itsHelmet === true) {
      ShowNameOnHoverForHelmet(selectedHelmetItemIndex);
    } else if (itsShoes === true) {
      ShowNameOnHoverForShoes(selectedShoesItemIndex);
    } else if (itsGloves === true) {
      ShowNameOnHoverForGloves(selectedGlovesItemIndex);
    } else if (itsShieldAndDagger === true) {
      ShowNameOnHoverForShieldAndDagger(selectedShieldAndDaggerItemIndex);
    }
  });

  const UpgradeImage =
    "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/BlackSmith/showWeaponStats2.png";

  // Sword
  const selectedItemIdForEnchantSword = localStorage.getItem(
    "selectedItemIdForEnchant"
  );
  const itemIndexSword = Number(selectedItemIdForEnchantSword);
  const selectedItemDataSword = mainWeaponData.find(
    (data: any) => data.id === itemIndexSword
  );
  const itemSavedDmgSword = `selectedItemDmgForEnchant_${selectedItemDataSword.name}`;
  const savedDmgSword = getSavedDmgMain(itemSavedDmgSword);

  // dagger
  //----------------------------------------------------------------------------------------
  const selectedItemIdForEnchantDager = localStorage.getItem(
    "selectedShieldAndDaggerItemIdForEnchant"
  );

  const itemIndexDager = Number(selectedItemIdForEnchantDager);
  const selectedItemDataDagger = ShieldAndDaggerData.find(
    (data: any) => data.id === itemIndexDager
  );

  const itemSavedDmgDager = `selectedItemDmgForEnchant_${
    selectedItemDataDagger?.name || ""
  }`;

  const savedDmgDager = getSavedDmgShieldAndDagger(itemSavedDmgDager);

  // shield
  //----------------------------------------------------------------------------------------
  const selectedItemIdForEnchantShield = localStorage.getItem(
    "selectedShieldAndDaggerItemIdForEnchant"
  );

  const itemIndexShield = Number(selectedItemIdForEnchantShield);
  const selectedItemDataShield = ShieldAndDaggerData.find(
    (data: any) => data.id === itemIndexShield
  );

  const itemSavedDmgShield = `selectedItemDefForEnchant_${
    selectedItemDataShield?.name || ""
  }`;

  const savedDefShield = getSavedDmgShieldAndDagger(itemSavedDmgShield);

  // shoes
  //----------------------------------------------------------------------------------------
  const selectedItemIdForEnchantShoes = localStorage.getItem(
    "selectedShoesItemIdForEnchant"
  );

  const itemIndexShoes = Number(selectedItemIdForEnchantShoes);
  const selectedItemDataShoes = ShoesData.find(
    (data: any) => data.id === itemIndexShoes
  );

  const itemSavedDmgShoes = `selectedItemDefForEnchant_${
    selectedItemDataShoes?.name || ""
  }`;

  const savedDefShoes = getSavedDefShoes(itemSavedDmgShoes);

  // gloves
  //----------------------------------------------------------------------------------------

  const selectedItemIdForEnchantGloves = localStorage.getItem(
    "selectedGlovesItemIdForEnchant"
  );

  const itemIndexGloves = Number(selectedItemIdForEnchantGloves);
  const selectedItemDataGloves = GlovesData.find(
    (data: any) => data.id === itemIndexGloves
  );

  const itemSavedDmgGloves = `selectedItemDefForEnchant_${
    selectedItemDataGloves?.name || ""
  }`;

  const savedDefGloves = getSavedDefGloves(itemSavedDmgGloves);

  // helmet
  //----------------------------------------------------------------------------------------
  const selectedItemIdForEnchantHelmet = localStorage.getItem(
    "selectedHelmetItemIdForEnchant"
  );

  const itemIndexHelmet = Number(selectedItemIdForEnchantHelmet);
  const selectedItemDataHelmet = HelmetData.find(
    (data: any) => data.id === itemIndexHelmet
  );

  const itemSavedDmgHelmet = `selectedItemDefForEnchant_${
    selectedItemDataHelmet?.name || ""
  }`;

  const savedDefHelmet = getSavedDefHelmet(itemSavedDmgHelmet);

  // armor
  //----------------------------------------------------------------------------------------
  const selectedItemIdForEnchantArmor = localStorage.getItem(
    "selectedArmorItemIdForEnchant"
  );

  const itemIndexArmor = Number(selectedItemIdForEnchantArmor);
  const selectedItemDataArmor = ArmorData.find(
    (data: any) => data.id === itemIndexArmor
  );

  const itemSavedDmgArmor = `selectedItemDefForEnchant_${
    selectedItemDataArmor?.name || ""
  }`;

  const savedDefArmor = getSavedDefArmor(itemSavedDmgArmor);

  return (
    <>
      <>
        <div
          className="infoEnchant"
          style={{
            display: Close ? "block" : "none",
            backgroundImage: `url(${
              CurrentValueUpgrade >= 15
                ? null
                : itsMainWeapon
                ? UpgradeImage
                : itsArmor
                ? UpgradeImage
                : itsHelmet
                ? UpgradeImage
                : itsShoes
                ? UpgradeImage
                : itsGloves
                ? UpgradeImage
                : itsShieldAndDagger
                ? UpgradeImage
                : "https://raw.githubusercontent.com/BartoszSeno/ClickerZero/main/src/assets/images/default.png"
            })`,
          }}
        >
          <div
            className="UpgradeImgs"
            style={{
              backgroundImage: `url(${
                CurrentValueUpgrade >= 15
                  ? null
                  : itsMainWeapon
                  ? savedImage
                  : itsArmor
                  ? savedArmorImage
                  : itsHelmet
                  ? savedHelmetImage
                  : itsShoes
                  ? savedShoesImage
                  : itsGloves
                  ? savedGlovesImage
                  : itsShieldAndDagger
                  ? savedShieldAndDaggerImage
                  : "https://raw.githubusercontent.com/BartoszSeno/ClickerZero/main/src/assets/images/default.png"
              })`,
              backgroundSize: itsMainWeapon
                ? "30px"
                : savedShieldAndDaggerImage
                ? "60px"
                : "",
              transform: itsMainWeapon ? "rotate(45deg)" : "",
            }}
          />
          <span className="UpgradeDmg">
            <span className="UpgradeName">
              {CurrentValueUpgrade >= 15
                ? null
                : itsMainWeapon
                ? UpgradedName
                : itsArmor
                ? UpgradedArmorName
                : itsHelmet
                ? UpgradedHelmetName
                : itsShoes
                ? UpgradedShoesName
                : itsGloves
                ? UpgradedGlovesName
                : itsShieldAndDagger
                ? UpgradedShieldAndDaggerName
                : ""}
            </span>
            <span className="UpgradeDmgTitle">
              {CurrentValueUpgrade >= 15
                ? null
                : itsMainWeapon
                ? "Dmg: "
                : itsArmor
                ? "Def: "
                : itsHelmet
                ? "Def: "
                : itsShoes
                ? "Def: "
                : itsGloves
                ? "Def: "
                : itsShieldAndDagger ===
                    selectedShieldAndDaggerItemIndex > 15 &&
                  selectedShieldAndDaggerItemIndex != 0
                ? "Dmg: "
                : itsShieldAndDagger === selectedShieldAndDaggerItemIndex < 15
                ? "Def: "
                : ""}
              <div
                className="ActualStats"
                style={{
                  color: "green",
                }}
              >
                &nbsp;
                {CurrentValueUpgrade >= 15
                  ? null
                  : itsMainWeapon
                  ? savedDmgSword || selectedItemDataSword.dmgLvl0
                  : itsArmor
                  ? savedDefArmor || selectedItemDataArmor.defLvl0
                  : itsHelmet
                  ? savedDefHelmet || selectedItemDataHelmet.defLvl0
                  : itsShoes
                  ? savedDefShoes || selectedItemDataShoes.defLvl0
                  : itsGloves
                  ? savedDefGloves || selectedItemDataGloves.defLvl0
                  : itsShieldAndDagger
                  ? savedDmgDager || selectedItemDataDagger.dmgLvl0
                  : itsShieldAndDagger
                  ? savedDefShield || selectedItemDataDagger.defLvl0
                  : ""}
              </div>
              <p>
                {CurrentValueUpgrade >= 15 ? null : (
                  <span
                    dangerouslySetInnerHTML={{ __html: "&nbsp; → &nbsp" }}
                  />
                )}
              </p>
              <div
                className="UpgradeStats"
                style={{
                  color: "red",
                }}
              >
                {CurrentValueUpgrade >= 15
                  ? null
                  : itsMainWeapon
                  ? UpgradedDmgMainWeapon
                  : itsArmor
                  ? UpgradedDefArmor
                  : itsHelmet
                  ? UpgradedDefHelmet
                  : itsShoes
                  ? UpgradedDefShoes
                  : itsGloves
                  ? UpgradedDefGloves
                  : itsShieldAndDagger ===
                      selectedShieldAndDaggerItemIndex > 15 &&
                    selectedShieldAndDaggerItemIndex != 0
                  ? UpgradedDmgShieldAndDagger
                  : itsShieldAndDagger === selectedShieldAndDaggerItemIndex < 15
                  ? UpgradedDefShieldAndDagger
                  : ""}
              </div>
            </span>
          </span>
        </div>
      </>
    </>
  );
};

export default EnchantSucces;
