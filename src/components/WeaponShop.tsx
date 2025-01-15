import React, { useEffect, useState } from "react";

const WeaponShop = ({ interior }: { interior: any }) => {
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
                  "polygon(0% 22%,  42% 22%, 42% 37%, 100% 38%, 100% 84.2%, 42% 84%,  42% 100%, 0 100%)",

                position: "relative",
                width: `${div.width}px`,
                height: `${div.height}px`,
                top: `${div.y}px`,
                left: `${div.x}px`,
                border: "2px solid black",
                zIndex: 200, // Specjalny div będzie nad innymi
              }}
            ></div>
            {/* Pierwszy obrazek z wnętrzem*/}
            <img
              src={
                div.isColliding
                  ? div.url
                  : "https://raw.githubusercontent.com/BartoszSeno/learn/refs/heads/master/WeaponShop.gif"
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
              }}
              draggable="false"
            />
            {/* Drugi obrazek ze ścianą */}
            <img
              src={
                div.isColliding
                  ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopWallNoShade.png"
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
              }}
              draggable="false"
            />
            {/* Trzeci obrazek z cieniem ściany */}
            <img
              src={
                div.isColliding
                  ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopWallWithShade.png"
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
              }}
              draggable="false"
            />
          </React.Fragment>
        )
      )}
    </>
  );
};

export default WeaponShop;
