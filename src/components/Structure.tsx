import React, { useEffect, useState } from "react";
import WeaponShop from "./WeaponShop.tsx";

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
}: {
  building: any;
  activeStructure: string | null;
  interior: any;
}) => {
  return (
    <>
      <WeaponShop interior={interior} />
    </>
  );
};

export default Structuress;
