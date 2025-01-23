import React, { useEffect, useState } from "react";
import WeaponShop1 from "./Shop/WeaponShop/WShop.tsx";

const BlackSmith = ({
  BlackSmithInterior,
  activeStructure,
  mainWeaponData,
  setMainWeaponData,
  count,
  setCount,
  FullInv,
  SelectedOption,
}: {
  BlackSmithInterior: any;
  activeStructure: string | null;
  mainWeaponData: any;
  setMainWeaponData: any;
  count: any;
  setCount: any;
  FullInv: any;
  SelectedOption: any;
}) => {
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
                  "polygon(12% 45%, 44% 45%, 44% 33%, 63% 33%, 63% 45%, 88% 45%, 88% 89%, 43% 89%, 43% 95%, 43% 97%,12% 97%)",

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
                  ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/BlackSmith/blackSmithWallNoShadow.png"
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
              }}
              draggable="false"
            />
          </React.Fragment>
        )
      )}
    </>
  );
};

export default BlackSmith;
