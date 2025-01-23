import React, { useEffect, useState } from "react";
import WeaponShop from "./WeaponShop.tsx";
import BlackSmith from "./BlackSmith.tsx";

export interface Structures {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isColliding: boolean;
  name: string;
}

interface StructuressProps {
  building: Structures[];
}

const Structuress = ({
  building,
  activeStructure,
  interior,
  mainWeaponData,
  setMainWeaponData,
  count,
  setCount,
  FullInv,
  BlackSmithInterior,
}: {
  building: any;
  activeStructure: string | null;
  interior: any;
  mainWeaponData: any;
  setMainWeaponData: any;
  count: any;
  setCount: any;
  FullInv: any;
  BlackSmithInterior: any;
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
      />
      <BlackSmith
        BlackSmithInterior={BlackSmithInterior}
        mainWeaponData={mainWeaponData}
        setMainWeaponData={setMainWeaponData}
        count={count}
        setCount={setCount}
        SelectedOption={SelectedOption}
        FullInv={FullInv}
        activeStructure={activeStructure}
      />
    </>
  );
};

export default Structuress;
