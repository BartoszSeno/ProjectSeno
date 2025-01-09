import React, { useEffect, useState } from 'react';

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

const Structuress = ({ building, activeStructure }:{ building: any; activeStructure: string | null}) => {



  return (
    <>
      {building.map((div) => (
        <React.Fragment key={div.id}>
          { activeStructure === 'BlackSmith' && (
            <div
              style={{
                position: 'absolute',
                top: `690px`,
                left: `1445px`,
                border: '2px solid black',
                zIndex: 10, // Specjalny div będzie nad innymi
              }}
            >
              <img
                src="https://raw.githubusercontent.com/BartoszSeno/ClickerZero/refs/heads/main/src/assets/MainImg/WeaponShop.gif"
                alt="BlackSmith"
                style={{
                  display: 'block', // Usuwa odstępy wynikające z inline
                  width: 'auto', // Automatyczna szerokość
                  height: 'auto', // Automatyczna wysokość
                  maxWidth: '100%', // Opcjonalne ograniczenie szerokości
                  maxHeight: '100%', // Opcjonalne ograniczenie wysokości
                }}
              />
       </div>
       
          )}

          {div.isColliding && div.name === 'Hotel' && (
            <div
              style={{
                width: `${div.width * 1.5}px`,
                height: `${div.height * 1.5}px`,
                backgroundColor: 'red',
                position: 'absolute',
                top: `${div.y - div.height }px`,
                left: `${div.x - div.width * 0.25}px`,
                border: '2px solid black',
                zIndex: 10,
              }}
            >
              Special Inn Info
            </div>
          )}

          {div.isColliding && div.name === 'ArmorShop' && (
            <div
              style={{
                width: `${div.width * 1.5}px`,
                height: `${div.height * 1.5}px`,
                backgroundColor: 'green',
                position: 'absolute',
                top: `${div.y - div.height * 0.5}px`,
                left: `${div.x - div.width * 0.25}px`,
                border: '2px solid black',
                zIndex: 10,
              }}
            >
              Special Hotel Info
            </div>
          )}

          {/* Główny div */}
          <div
          key={div.id}
          id={div.isColliding ? div.name : undefined}
          style={{
            width: `${div.width}px`,
            height: `${div.height}px`,
            backgroundColor: div.isColliding ? 'gray' : 'yellow',
            position: 'absolute',
            top: `${div.y}px`,
            left: `${div.x}px`,
            border: '2px solid black',
          }}
          onClick={() => {
            if (div.isColliding) {
              console.log(activeStructure)
            }else{
              console.log(activeStructure)

            }
          }}
            
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default Structuress;
