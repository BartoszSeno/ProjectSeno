/* eslint-disable array-callback-return */

import React from "react";

function EquipSubWeapon({
  ShieldAndDaggerData,
  setShieldAndDaggerData,
  FullInv,
}: {
  ShieldAndDaggerData: any;
  setShieldAndDaggerData: any;
  FullInv: any;
}) {
  // Load saved item information from local storage
  const savedIdSD = localStorage.getItem("selectedShieldAndDaggerItemIdEquip");

  const handleClick = (selectedItem: any) => {
    // Check if FullInv is true
    if (FullInv === true) {
      // Handle the condition when FullInv is true, e.g. show an error message or return early
      console.log("Cannot use this function when FullInv is true.");
      return;
    }

    const newShieldAndDaggerDatas = [...ShieldAndDaggerData];
    const index = newShieldAndDaggerDatas.findIndex(
      (item) => item.id === selectedItem.id
    );
    newShieldAndDaggerDatas[index].isEquip = false;
    setShieldAndDaggerData(newShieldAndDaggerDatas);
    localStorage.setItem(
      "ShieldAndDaggerImageAndNameAndCost",
      JSON.stringify(newShieldAndDaggerDatas)
    );
    localStorage.removeItem("selectedShieldAndDaggerItemIdEquip");
  };

  return (
    <>
      {Array.isArray(ShieldAndDaggerData) &&
        ShieldAndDaggerData.map((item: any) => {
          if (item.id === Number(savedIdSD)) {
            if (item.isEquip === false) {
              return null; // Jeśli item.isEquip jest ustawione na false, zwracamy null
            } else {
              return (
                <div
                  key={item.id}
                  className={`items-box SubWeapon ${item.tier}B`}
                  onContextMenu={() => handleClick(item)}
                >
                  <div className="selectedItem">
                    <img
                      className="equipmentImgeq"
                      src={
                        item.image
                          ? item.image
                          : "https://raw.githubusercontent.com/BartoszSeno/ClickerZero/main/src/assets/images/default.png"
                      }
                      alt={`${item.name || "No name"} Weapon`}
                    />
                  </div>
                </div>
              );
            }
          } else {
            return null; // Jeśli item.id nie jest równy savedIdMW, zwracamy null (lub inny odpowiedni komponent)
          }
        })}
    </>
  );
}

export default EquipSubWeapon;
