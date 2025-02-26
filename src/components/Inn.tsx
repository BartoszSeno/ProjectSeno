import React, { useEffect, useState } from "react";

const Inn = ({
  InnInterior,
  position,
}: {
  InnInterior: any;
  position: any;
}) => {
  console.log(position.x + " x");
  return (
    <>
      {InnInterior.map(
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
                  "polygon(8% 32%,18% 32%, 28% 23%, 31% 23%, 31% 35%, 34% 35%, 34% 25%, 68% 25%, 68% 36%, 71% 36%, 71% 22%,75% 22%, 82% 33%,94% 33%,94% 61%, 71% 61%, 71% 55%, 31% 55%, 31% 95%, 8% 95%)",

                position: "absolute",
                width: `${div.width}px`,
                height: `${div.height}px`,
                top: `${div.y}px`,
                left: `${div.x}px`,
                border: "2px solid black",
                zIndex: `${position.y} `, // Specjalny div będzie nad innymis
                opacity: 0.5,
                pointerEvents: "none",
                //backgroundColor: "yellow",
              }}
            ></div>
            {/* Pierwszy obrazek z wnętrzem*/}
            <img
              src={
                div.isColliding
                  ? div.url
                  : "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Inn/innExterior.png"
              }
              alt="Inn"
              style={{
                display: "block", // Usuwa odstępy wynikające z inline
                top: `${div.y}px`,
                left: `${div.x}px`,
                width: `${div.width}px`,
                height: `${div.height}px`,
                position: "absolute", // Ustawienie pozycji
                zIndex: `${
                  div.isColliding
                    ? 100
                    : position.y < div.y + 1040 ||
                      position.x < div.x + 170 ||
                      position.x > div.x + 2370 // 1290.y
                    ? 10000
                    : position.y > div.y + 1040
                    ? 100
                    : 1000
                }`, // Niższy z-index dla pierwszego obrazka
                pointerEvents: "none",
              }}
              draggable="false"
            />
            {/* Drugi obrazek ze ścianą */}
            <img
              src={
                div.isColliding
                  ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Inn/InnInteriorWall.png"
                  : undefined
              }
              alt="Inn"
              style={{
                position: "absolute", // Ustawienie pozycji
                top: `${div.y}px`,
                left: `${div.x}px`,
                width: `${div.width}px`,
                height: `${div.height}px`,
                zIndex: `${
                  position.y < div.y + 690 || position.x < div.x + 690
                    ? 1000
                    : position.y > div.y + 800 || position.x > div.x + 1790
                    ? position.y + 100
                    : 100
                }`,
                pointerEvents: "none",
                display: div.isColliding ? "block" : "none",
              }}
              draggable="false"
            />
            {/* Trzeci obrazek z cieniem ściany */}
            <img
              src={
                div.isColliding
                  ? "https://raw.githubusercontent.com/BartoszSeno/ProjectSeno/refs/heads/main/src/assets/img/Inn/InnInteriorShadow.png"
                  : undefined
              }
              alt="Inn"
              style={{
                opacity: 0.5,
                position: "absolute", // Ustawienie pozycji
                top: `${div.y}px`,
                left: `${div.x}px`,
                width: `${div.width}px`,
                height: `${div.height}px`,
                zIndex: `${
                  position.y < div.y + 690 || position.x < div.x + 690
                    ? 1000
                    : position.y > div.y + 800 || position.x > div.x + 1790
                    ? position.y + 100
                    : 100
                }`,
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
            ></div>
          </React.Fragment>
        )
      )}
    </>
  );
};

export default Inn;
