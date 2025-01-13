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
                  "polygon(0 0, 42% 0, 42% 29%, 45% 29%, 45% 10.5%, 100% 10.5%, 100% 84.2%, 44.5% 84%, 44.5% 66.5%, 42.3% 66.5%, 42.2% 100%, 0 100%)",
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
