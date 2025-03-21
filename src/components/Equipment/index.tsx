/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../assets/css/maineq.css";

import { useEffect, useState } from "react";
import Inventory from "./inventory/index.tsx";
import EquipContainer from "./equipment/index.tsx";
import { MainWeaponImageAndNameAndCost } from "../../data/Sword.tsx";
import { HelmetImageAndNameAndCost } from "../../data/Helmet.tsx";
import { ArmorImageAndNameAndCost } from "../../data/Armor.tsx";
import { ShoesImageAndNameAndCost } from "../../data/Shoes.tsx";
import { GlovesImageAndNameAndCost } from "../../data/Gloves.tsx";
import { ShieldAndDaggerImageAndNameAndCost } from "../../data/SubWeapon.tsx";
import Statistic from "./stats/index.tsx";
import { FishArray } from "../../data/fish.tsx";
import React from "react";

const MainEq = ({
  SellFishByCat,
  mainWeaponData,
  UpgradedNamesMainWeapon,
  selectedItem,
  ArmorData,
  UpgradedNamesArmor,
  selectedArmorItem,
  HelmetData,
  UpgradedNamesHelmet,
  selectedHelmetItem,
  ShoesData,
  UpgradedNamesShoes,
  selectedShoesItem,
  GlovesData,
  UpgradedNamesGloves,
  selectedGlovesItem,
  ShieldAndDaggerData,
  UpgradedNamesShieldAndDagger,
  selectedShieldAndDaggerItem,
  setGlovesData,
  setMainWeaponData,
  setArmorData,
  setHelmetData,
  setShoesData,
  setShieldAndDaggerData,
  setFullInv,
  FullInv,
  OpenAndCloseEqinEnchant,
  setOpenAndCloseEqinEnchant,
  //enchant
  setSelectedItemIndex,
  setUpgradedDmgMainWeapon,
  setSelectedArmorItemIndex,
  setUpgradedDefArmor,
  setitsMainWeapon,
  setitsArmor,
  setSelectedHelmetItemIndex,
  setUpgradedDefHelmet,
  setitsHelmet,
  setSelectedShoesItemIndex,
  setUpgradedDefShoes,
  setitsShoes,
  setSelectedGlovesItemIndex,
  setUpgradedDefGloves,
  setitsGloves,
  setSelectedShieldAndDaggerItemIndex,
  setUpgradedDefShieldAndDagger,
  setitsShieldAndDagger,
  setUpgradedDmgShieldAndDagger,
  setUpgradeCharacters,
  setUpgradeVillageAndClicks,
  FishData,
  setFishData,
  setfishId,
  setValueCatch,
  position,
  count,
  setClose,
}: {
  SellFishByCat: boolean;
  mainWeaponData: any;
  UpgradedNamesMainWeapon: any;
  selectedItem: any;
  ArmorData: any;
  UpgradedNamesArmor: any;
  selectedArmorItem: any;
  HelmetData: any;
  UpgradedNamesHelmet: any;
  selectedHelmetItem: any;
  ShoesData: any;
  UpgradedNamesShoes: any;
  selectedShoesItem: any;
  GlovesData: any;
  UpgradedNamesGloves: any;
  selectedGlovesItem: any;
  ShieldAndDaggerData: any;
  UpgradedNamesShieldAndDagger: any;
  selectedShieldAndDaggerItem: any;
  setGlovesData: any;
  setMainWeaponData: any;
  setArmorData: any;
  setHelmetData: any;
  setShoesData: any;
  setShieldAndDaggerData: any;
  setFullInv: any;
  FullInv: any;
  OpenAndCloseEqinEnchant: boolean;
  setOpenAndCloseEqinEnchant: any;
  //enchant
  setSelectedItemIndex: any;
  setUpgradedDmgMainWeapon: any;
  setSelectedArmorItemIndex: any;
  setUpgradedDefArmor: any;
  setitsMainWeapon: any;
  setitsArmor: any;
  setSelectedHelmetItemIndex: any;
  setUpgradedDefHelmet: any;
  setitsHelmet: any;
  setSelectedShoesItemIndex: any;
  setUpgradedDefShoes: any;
  setitsShoes: any;
  setSelectedGlovesItemIndex: any;
  setUpgradedDefGloves: any;
  setitsGloves: any;
  setSelectedShieldAndDaggerItemIndex: any;
  setUpgradedDefShieldAndDagger: any;
  setitsShieldAndDagger: any;
  setUpgradedDmgShieldAndDagger: any;
  setUpgradeCharacters: any;
  setUpgradeVillageAndClicks: any;
  FishData: any;
  setFishData: any;
  setfishId: any;
  setValueCatch: any;
  position: any;
  count: number;
  setClose: any;
}) => {
  //MAIN WEAPON
  //===========================================================================
  const [, setSelectedItemIdEquip] = useState(null);

  const [whatIsUse, setwhatIsUse] = useState<string>("");
  // Function that gets called when an item is clicked on
  function GetIdPerClickMW(index: any) {
    const item = MainWeaponImageAndNameAndCost[index];
    setSelectedItemIdEquip(index.id);
    // Save item information in local storage for later use
    localStorage.setItem("selectedItemIdEquip", item.id.toString());
    setwhatIsUse("weapon");

    setTimeout(() => {
      setSelectedItemIdEquip(null);
    }, 10);
  }

  //HELMET
  //===========================================================================

  function GetIdPerClickH(index: any) {
    const minus = index - 1000;

    const item = HelmetImageAndNameAndCost[minus];
    setSelectedItemIdEquip(index.id);

    // Save item information in local storage for later use
    localStorage.setItem("selectedHelmetItemIdEquip", item.id.toString());
    setwhatIsUse("helmet");

    setTimeout(() => {
      setSelectedItemIdEquip(null);
    }, 10);
  }
  //Fish
  //===========================================================================

  function GetIdPerClickFish(index: any) {
    const item = FishArray[index];
    setSelectedItemIdEquip(index.id);

    // Save item information in local storage for later use
    localStorage.setItem("selectedFishItemId", item.id.toString());
    setfishId(item.id);
    setwhatIsUse("Fish");

    setTimeout(() => {
      setSelectedItemIdEquip(null);
    }, 10);
  }

  //ARMOR
  //===========================================================================
  function GetIdPerClickA(index: any) {
    const minus = index - 2000;
    const item = ArmorImageAndNameAndCost[minus];

    setSelectedItemIdEquip(index.id);

    // Save item information in local storage for later use
    localStorage.setItem("selectedArmorItemIdEquip", item.id.toString());
    setwhatIsUse("armor");

    setTimeout(() => {
      setSelectedItemIdEquip(null);
    }, 10);
  }

  //SHOES
  //===========================================================================
  function GetIdPerClickS(index: any) {
    const minus = index - 4000;

    const item = ShoesImageAndNameAndCost[minus];
    setSelectedItemIdEquip(index.id);

    // Save item information in local storage for later use
    localStorage.setItem("selectedShoesItemIdEquip", item.id.toString());
    setwhatIsUse("shoes");

    setTimeout(() => {
      setSelectedItemIdEquip(null);
    }, 10);
  }

  //GLOVES
  //===========================================================================
  function GetIdPerClickG(index: any) {
    const minus = index - 3000;

    const item = GlovesImageAndNameAndCost[minus];
    setSelectedItemIdEquip(index.id);

    // Save item information in local storage for later use
    localStorage.setItem("selectedGlovesItemIdEquip", item.id.toString());
    setwhatIsUse("gloves");

    setTimeout(() => {
      setSelectedItemIdEquip(null);
    }, 10);
  }

  //SUB WEAPON
  //===========================================================================
  function GetIdPerClickSW(index: any) {
    const minus = index - 5000;

    const item = ShieldAndDaggerImageAndNameAndCost[minus];
    setSelectedItemIdEquip(index.id);

    // Save item information in local storage for later use
    localStorage.setItem(
      "selectedShieldAndDaggerItemIdEquip",
      item.id.toString()
    );
    const isShield = item.type === "shield"; // Example condition
    setwhatIsUse(isShield ? "shield" : "dagger");

    setTimeout(() => {
      setSelectedItemIdEquip(null);
    }, 10);
  }

  //===========================================================================
  let isKeyPressed = false;

  document.addEventListener("keydown", function (event) {
    if (event.key === "i" && !isKeyPressed) {
      OpenAndCloseInvEq();
      setCe(true);
      setInv(true);
      setUpgradeCharacters(false);
      setUpgradeVillageAndClicks(false);
      isKeyPressed = true;
    }
  });

  const [openInvAndEq, setopenInvAndEq] = useState<boolean>(false);

  function OpenAndCloseInvEq() {
    setopenInvAndEq(!openInvAndEq);
  }

  const inventoryElement = document.querySelector("#EqCharacters");
  if (inventoryElement) {
    inventoryElement.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      return false;
    });
  }

  const [OpenSliderFish, setOpenSliderFish] = useState<boolean>(false);

  function NumberCheckBoxes(index: any) {
    console.log("open box");
    const item = FishData[index - 1];

    setOpenSliderFish(true);
    localStorage.setItem("OSF", JSON.stringify(OpenSliderFish));

    console.log(item.catchCount);

    GetIdPerClickFish(index - 1);
  }

  const handleContextMenu = (e: { preventDefault: () => void }, item: any) => {
    e.preventDefault();
    setValueCatch(1);
    if (item.type === "weapon") {
      //===============
      const newWeaponData = [...mainWeaponData];
      newWeaponData.forEach((Weapon, index) => {
        if (index === item.id) {
          Weapon.isEquip = true;
        } else {
          Weapon.isEquip = false;
        }
      });
      setMainWeaponData(newWeaponData);
      localStorage.setItem(
        "MainWeaponImageAndNameAndCost",
        JSON.stringify(newWeaponData)
      );
      //===============

      GetIdPerClickMW(item.id);
    } else if (item.type === "Fish") {
      NumberCheckBoxes(item.id);
    } else if (item.type === "helmet") {
      //===============
      const newHelmetDatas = [...HelmetData];
      newHelmetDatas.forEach((Helmet, index) => {
        if (index === item.id - 1000) {
          Helmet.isEquip = true;
        } else {
          Helmet.isEquip = false;
        }
      });
      setHelmetData(newHelmetDatas);
      localStorage.setItem(
        "HelmetImageAndNameAndCost",
        JSON.stringify(newHelmetDatas)
      );
      //===============
      GetIdPerClickH(item.id);
    } else if (item.type === "Armor") {
      //===============
      const newArmorDatas = [...ArmorData];
      newArmorDatas.forEach((Armor, index) => {
        if (index === item.id - 2000) {
          Armor.isEquip = true;
        } else {
          Armor.isEquip = false;
        }
      });
      setArmorData(newArmorDatas);
      localStorage.setItem(
        "ArmorImageAndNameAndCost",
        JSON.stringify(newArmorDatas)
      );
      //===============

      GetIdPerClickA(item.id);
    } else if (item.type === "Shoes") {
      //===============
      const newShoesDatas = [...ShoesData];
      newShoesDatas.forEach((Shoes, index) => {
        if (index === item.id - 4000) {
          Shoes.isEquip = true;
        } else {
          Shoes.isEquip = false;
        }
      });
      setShoesData(newShoesDatas);
      localStorage.setItem(
        "ShoesImageAndNameAndCost",
        JSON.stringify(newShoesDatas)
      );
      //===============
      GetIdPerClickS(item.id);
    } else if (item.type === "gloves") {
      //===============
      const newGlovesData = [...GlovesData];
      newGlovesData.forEach((glove, index) => {
        if (index === item.id - 3000) {
          glove.isEquip = true;
        } else {
          glove.isEquip = false;
        }
      });
      setGlovesData(newGlovesData);
      localStorage.setItem(
        "GlovesImageAndNameAndCost",
        JSON.stringify(newGlovesData)
      );
      //===============
      GetIdPerClickG(item.id);
    } else if (item.type === "shield" || "dagger") {
      //===============
      const newShieldAndDaggerDatas = [...ShieldAndDaggerData];
      newShieldAndDaggerDatas.forEach((ShieldDagger, index) => {
        if (index === item.id - 5000) {
          ShieldDagger.isEquip = true;
        } else {
          ShieldDagger.isEquip = false;
        }
      });
      setShieldAndDaggerData(newShieldAndDaggerDatas);
      localStorage.setItem(
        "ShieldAndDaggerImageAndNameAndCost",
        JSON.stringify(newShieldAndDaggerDatas)
      );
      //===============
      GetIdPerClickSW(item.id);
    }
  };

  const [ce, setCe] = useState<boolean>(true);

  function CloseEq(index: any) {
    setCe(!ce);
  }

  const [Inv, setInv] = useState<boolean>(true);

  function CloseInv(index: any) {
    setInv(!Inv);
    setopenInvAndEq(false);
  }

  const HandleItemClick = (itemArray: any[], clickedItemId: string) => {
    const clickedItemIndex = itemArray.findIndex(
      (item) => item.id === Number(clickedItemId)
    );
    if (clickedItemIndex !== -1) {
      if (itemArray === mainWeaponData) {
        setitsMainWeapon(true);
        setitsArmor(false);
        setitsHelmet(false);
        setitsShoes(false);
        setitsGloves(false);
        setitsShieldAndDagger(false);
      } else if (itemArray === ArmorData) {
        setitsArmor(true);
        setitsMainWeapon(false);
        setitsHelmet(false);
        setitsShoes(false);
        setitsGloves(false);
        setitsShieldAndDagger(false);
      } else if (itemArray === HelmetData) {
        setitsHelmet(true);
        setitsArmor(false);
        setitsMainWeapon(false);
        setitsShoes(false);
        setitsGloves(false);
        setitsShieldAndDagger(false);
      } else if (itemArray === ShoesData) {
        setitsShoes(true);
        setitsArmor(false);
        setitsMainWeapon(false);
        setitsHelmet(false);
        setitsGloves(false);
        setitsShieldAndDagger(false);
      } else if (itemArray === GlovesData) {
        setitsGloves(true);
        setitsArmor(false);
        setitsMainWeapon(false);
        setitsHelmet(false);
        setitsShoes(false);
        setitsShieldAndDagger(false);
      } else if (itemArray === ShieldAndDaggerData) {
        setitsShieldAndDagger(true);
        setitsArmor(false);
        setitsMainWeapon(false);
        setitsHelmet(false);
        setitsShoes(false);
        setitsGloves(false);
      }
    } else {
      setitsMainWeapon(false);
      setitsArmor(false);
      setitsHelmet(false);
      setitsShoes(false);
      setitsGloves(false);
      setitsShieldAndDagger(false);
    }
  };

  const Sell = localStorage.getItem("SelIsOpen");
  const [selloc, setselloc] = useState<boolean>();

  useEffect(() => {
    if (Sell === "true") {
      setselloc(true);
    } else {
      setselloc(false);
    }
  }, [Sell]);

  return (
    <>
      <>
        <div
          className="MainEqContainer"
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
            display: OpenAndCloseEqinEnchant
              ? "flex"
              : openInvAndEq && Inv
              ? "flex"
              : "none",
            zIndex: OpenAndCloseEqinEnchant
              ? "10000"
              : SellFishByCat
              ? "10000"
              : "1000",
            marginLeft: OpenAndCloseEqinEnchant ? "-770px" : "",
            marginTop: OpenAndCloseEqinEnchant ? "-30px" : "",
          }}
        >
          <div
            id="option-container"
            style={{
              display: OpenAndCloseEqinEnchant
                ? "flex"
                : openInvAndEq && Inv
                ? "flex"
                : "none",
            }}
          >
            <div className="inventoryTitle">Inventory</div>
            <div
              className="CloseInv"
              onClick={(e) => {
                //e.preventDefault();
                CloseInv(e);
                setOpenAndCloseEqinEnchant();
              }}
            ></div>
            <Inventory
              mainWeaponData={mainWeaponData}
              HelmetData={HelmetData}
              ArmorData={ArmorData}
              ShoesData={ShoesData}
              GlovesData={GlovesData}
              ShieldAndDaggerData={ShieldAndDaggerData}
              handleContextMenu={handleContextMenu}
              setFullInv={setFullInv}
              HandleItemClick={HandleItemClick}
              OpenAndCloseEqinEnchant={OpenAndCloseEqinEnchant}
              setSelectedItemIndex={setSelectedItemIndex}
              setSelectedArmorItemIndex={setSelectedArmorItemIndex}
              setSelectedGlovesItemIndex={setSelectedGlovesItemIndex}
              setSelectedHelmetItemIndex={setSelectedHelmetItemIndex}
              setSelectedShieldAndDaggerItemIndex={
                setSelectedShieldAndDaggerItemIndex
              }
              setSelectedShoesItemIndex={setSelectedShoesItemIndex}
              UpgradedNamesMainWeapon={UpgradedNamesMainWeapon}
              setUpgradedDmgMainWeapon={setUpgradedDmgMainWeapon}
              UpgradedNamesGloves={UpgradedNamesGloves}
              setUpgradedDefGloves={setUpgradedDefGloves}
              UpgradedNamesShieldAndDagger={UpgradedNamesShieldAndDagger}
              setUpgradedDefShieldAndDagger={setUpgradedDefShieldAndDagger}
              setUpgradedDmgShieldAndDagger={setUpgradedDmgShieldAndDagger}
              UpgradedNamesArmor={UpgradedNamesArmor}
              setUpgradedDefArmor={setUpgradedDefArmor}
              UpgradedNamesHelmet={UpgradedNamesHelmet}
              setUpgradedDefHelmet={setUpgradedDefHelmet}
              UpgradedNamesShoes={UpgradedNamesShoes}
              setUpgradedDefShoes={setUpgradedDefShoes}
              FishData={FishData}
              count={count}
              setClose={setClose}
            />
          </div>
          <div
            id="EqCharacters"
            style={{
              display: OpenAndCloseEqinEnchant
                ? "none"
                : SellFishByCat
                ? "none"
                : openInvAndEq && Inv
                ? "flex"
                : "none",
              pointerEvents: ce ? "all" : "none",
              backgroundImage: ce ? "" : "none",
            }}
          >
            <div className="EqTitle" style={{ display: ce ? "flex" : "none" }}>
              Equipment
            </div>
            <div className="CloseEq" onClick={CloseEq}></div>
            <EquipContainer
              mainWeaponData={mainWeaponData}
              HelmetData={HelmetData}
              ArmorData={ArmorData}
              ShoesData={ShoesData}
              GlovesData={GlovesData}
              ShieldAndDaggerData={ShieldAndDaggerData}
              setGlovesData={setGlovesData}
              setMainWeaponData={setMainWeaponData}
              setArmorData={setArmorData}
              setHelmetData={setHelmetData}
              setShoesData={setShoesData}
              setShieldAndDaggerData={setShieldAndDaggerData}
              FullInv={FullInv}
              ce={ce}
            />
          </div>
          <Statistic
            mainWeaponData={mainWeaponData}
            selectedItem={selectedItem}
            ShieldAndDaggerData={ShieldAndDaggerData}
            selectedShieldAndDaggerItem={selectedShieldAndDaggerItem}
            HelmetData={HelmetData}
            selectedHelmetItem={selectedHelmetItem}
            ArmorData={ArmorData}
            selectedArmorItem={selectedArmorItem}
            GlovesData={GlovesData}
            selectedGlovesItem={selectedGlovesItem}
            ShoesData={ShoesData}
            selectedShoesItem={selectedShoesItem}
          />
        </div>
      </>
    </>
  );
};

export default MainEq;
