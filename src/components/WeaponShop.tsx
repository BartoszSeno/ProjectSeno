import React, { useEffect, useState } from "react";
import WeaponShop1 from "./Shop/WeaponShop/WShop.tsx";

const WeaponShop = ({
  interior,
  activeStructure,
  mainWeaponData,
  setMainWeaponData,
  count,
  setCount,
  FullInv,
  SelectedOption,
  position,
}: {
  interior: any;
  activeStructure: string | null;
  mainWeaponData: any;
  setMainWeaponData: any;
  count: any;
  setCount: any;
  FullInv: any;
  SelectedOption: any;
  position: any;
}) => {
  return (
    <>
      {interior.map(
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
                  "polygon(2% 42%, 32% 42%, 32% 53%, 71% 53%, 71% 40%, 98% 40%,  98% 93%, 71% 93%, 71% 83%, 31% 83%, 32% 97%,2% 97%)",

                position: "relative",
                width: `${div.width}px`,
                height: `${div.height}px`,
                top: `${div.y}px`,
                left: `${div.x}px`,
                border: "2px solid black",
                zIndex: `${position.y} `, // Specjalny div będzie nad innymi
                opacity: 0.5,
                pointerEvents: "none",
              }}
            ></div>
            {/* Pierwszy obrazek z wnętrzem*/}
            <img
              src={
                div.isColliding
                  ? div.url
                  : "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopExterior3.png"
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
                  ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopWallNoShade3.png"
                  : undefined
              }
              alt="WeaponShop"
              style={{
                position: "absolute", // Ustawienie pozycji
                top: `${div.y}px`,
                left: `${div.x}px`,
                width: `${div.width}px`,
                height: `${div.height}px`,
                zIndex: `${position.y + 100} `, // Wyższy z-index dla drugiego obrazka
                pointerEvents: "none",
                display: div.isColliding ? "block" : "none",
              }}
              draggable="false"
            />
            {/* Trzeci obrazek z cieniem ściany */}
            <img
              src={
                div.isColliding
                  ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopWallWithShade3.png"
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
                zIndex: `${position.y + 100}`, // Wyższy z-index dla drugiego obrazka
                pointerEvents: "none",
                display: div.isColliding ? "block" : "none",
              }}
              draggable="false"
            />
            <div
              style={{
                position: "absolute", // Ustawienie pozycji
                top: `${div.y}px`,
                left: `${div.x}px`,
                width: `${div.width}px`,
                height: `${div.height}px`,
                zIndex: 1000, // Wyższy z-index dla drugiego obrazka
                display: div.isColliding ? "block" : "none",
                pointerEvents: "auto",
              }}
            >
              <WeaponShop1
                mainWeaponData={mainWeaponData}
                setMainWeaponData={setMainWeaponData}
                count={count}
                setCount={setCount}
                SelectedOption={SelectedOption}
                FullInv={FullInv}
              />
            </div>
          </React.Fragment>
        )
      )}
    </>
  );
};

export default WeaponShop;
