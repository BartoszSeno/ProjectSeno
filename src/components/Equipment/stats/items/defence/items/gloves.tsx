/* eslint-disable no-lone-blocks */

import React from "react";
import { getSavedDefGloves } from "../../../../../enchant/index.tsx";

const DefenceGloves = ({
  GlovesData,
  selectedGlovesItem,
}: {
  GlovesData: any;
  selectedGlovesItem: any;
}) => {
  return (
    <>
      {GlovesData.map((data: any, index: any) => {
        if (index + 3000 === selectedGlovesItem) {
          const itemSavedDefMainKey = `selectedItemDefForEnchant_${data.name}`;
          const savedDefMain = getSavedDefGloves(itemSavedDefMainKey);
          const selectedGlovesItemData = GlovesData.find(
            (data: any) => data.id === Number(selectedGlovesItem)
          );

          return (
            <div key={`${data.id}_${index}`}>
              {selectedGlovesItemData && (
                <div>
                  <span className="statsGlovesDefHiden">
                    {savedDefMain ? savedDefMain : data.defLvl0}
                  </span>
                </div>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default DefenceGloves;
