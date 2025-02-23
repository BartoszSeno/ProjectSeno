import React, { useEffect, useState } from "react";
import WeaponShop from "./WeaponShop.tsx";
import BlackSmith from "./BlackSmith.tsx";
import Inn from "./Inn.tsx";

export interface Structures {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isColliding: boolean;
  name: string;
}

const Structuress = ({
  activeStructure,
  interior,
  mainWeaponData,
  setMainWeaponData,
  count,
  setCount,
  FullInv,
  BlackSmithInterior,

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
  position,
  InnInterior,
}: {
  activeStructure: string | null;
  interior: any;
  mainWeaponData: any;
  setMainWeaponData: any;
  count: any;
  setCount: any;
  FullInv: any;
  BlackSmithInterior: any;

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
  position: any;
  InnInterior: any;
}) => {
  const [SelectedOption] = useState<string>("");

  return (
    <>
      <WeaponShop
        interior={interior}
        mainWeaponData={mainWeaponData}
        setMainWeaponData={setMainWeaponData}
        count={count}
        setCount={setCount}
        SelectedOption={SelectedOption}
        FullInv={FullInv}
        activeStructure={activeStructure}
        position={position}
      />
      <BlackSmith
        BlackSmithInterior={BlackSmithInterior}
        mainWeaponData={mainWeaponData}
        UpgradedDmgMainWeapon={UpgradedDmgMainWeapon}
        setUpgradedDmgMainWeapon={setUpgradedDmgMainWeapon}
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
        setUpgradedNamesShieldAndDagger={setUpgradedNamesShieldAndDagger}
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
        selectedShieldAndDaggerItemIndex={selectedShieldAndDaggerItemIndex}
        selectedItemIndex={selectedItemIndex}
        Close={Close}
        setClose={setClose}
        position={position}
      />
      <Inn InnInterior={InnInterior} position={position} />
    </>
  );
};

export default Structuress;
