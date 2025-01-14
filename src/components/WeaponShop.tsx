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
                  "polygon(0 0, 42% 0, 42% 29%, 45% 29%, 45% 10.5%, 100% 10.5%, 100% 84.2%, 42% 84%,  42% 100%, 0 100%)",
                width: `${div.width}px`,
                height: `${div.height}px`,
                backgroundColor: div.isColliding ? "gray" : "yellow",
                position: "absolute",
                top: `${div.y}px`,
                left: `${div.x}px`,
                border: "2px solid black",
                zIndex: 10, // Specjalny div będzie nad innymi
              }}
            >
              {/* Pierwszy obrazek */}
              <img
                src={
                  div.isColliding
                    ? div.url
                    : "https://raw.githubusercontent.com/BartoszSeno/learn/refs/heads/master/WeaponShop.gif"
                }
                alt="WeaponShop"
                style={{
                  display: "block", // Usuwa odstępy wynikające z inline
                  width: "auto", // Automatyczna szerokość
                  height: "auto", // Automatyczna wysokość
                  maxWidth: "100%", // Opcjonalne ograniczenie szerokości
                  maxHeight: "100%", // Opcjonalne ograniczenie wysokości
                  position: "absolute", // Ustawienie pozycji
                  zIndex: 10, // Niższy z-index dla pierwszego obrazka
                }}
              />
              {/* Drugi obrazek */}
              <img
                src={
                  div.isColliding
                    ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/WeaponShop/WeaponShopWallNoShade.png"
                    : undefined
                }
                alt="WeaponShop"
                style={{
                  position: "absolute", // Ustawienie pozycji
                  top: 0, // Dopasowanie do kontenera
                  left: 0, // Dopasowanie do kontenera
                  width: "100%", // Dopasowanie do szerokości kontenera
                  height: "100%", // Dopasowanie do wysokości kontenera
                  zIndex: 1000, // Wyższy z-index dla drugiego obrazka
                }}
              />
              {/* Trzeci obrazek */}
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
                  top: 0, // Dopasowanie do kontenera
                  left: 0, // Dopasowanie do kontenera
                  width: "100%", // Dopasowanie do szerokości kontenera
                  height: "100%", // Dopasowanie do wysokości kontenera
                  zIndex: 1000, // Wyższy z-index dla drugiego obrazka
                }}
              />
            </div>
          </React.Fragment>
        )
      )}
    </>
  );
};

export default WeaponShop;
