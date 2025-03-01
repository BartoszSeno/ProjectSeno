/* eslint-disable no-lone-blocks */

import React from "react";
import { getSavedDefShieldAndDagger } from "../../../../../enchant/index.tsx";

const DefenceShieldAndDagger = ({
  ShieldAndDaggerData,
  selectedShieldAndDaggerItem,
}: {
  ShieldAndDaggerData: any;
  selectedShieldAndDaggerItem: any;
}) => {
  return (
    <>
      {ShieldAndDaggerData.map((data: any, index: any) => {
        if (index + 5000 === selectedShieldAndDaggerItem) {
          const itemSavedDefMainKey = `selectedItemDefForEnchant_${data.name}`;
          const savedDefMain = getSavedDefShieldAndDagger(itemSavedDefMainKey);
          const selectedShieldAndDaggerItemData = ShieldAndDaggerData.find(
            (data: any) => data.id === Number(selectedShieldAndDaggerItem)
          );

          return (
            <div key={`${data.id}_${index}`}>
              {selectedShieldAndDaggerItemData && (
                <div>
                  <span className="statsShieldAndDaggerDefHiden">
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

export default DefenceShieldAndDagger;
