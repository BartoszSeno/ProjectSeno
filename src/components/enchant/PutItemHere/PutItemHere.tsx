import React from "react";

const PutItemHere = ({
  savedImage,
  savedName,
  itsMainWeapon,
  savedArmorImage,
  savedArmorName,
  itsArmor,
  savedHelmetImage,
  savedHelmetName,
  itsHelmet,
  savedShoesImage,
  itsShoes,
  savedGlovesImage,
  itsGloves,
  savedShieldAndDaggerImage,
  itsShieldAndDagger,
  OpenCloseEqinEnchant,
  setOpenAndCloseEqinEnchant,
  setClose,
  Close,
}: {
  savedImage: any;
  savedName: any;
  itsMainWeapon: any;
  savedArmorImage: any;
  savedArmorName: any;
  itsArmor: any;
  savedHelmetImage: any;
  savedHelmetName: any;
  itsHelmet: any;
  savedShoesImage: any;
  itsShoes: any;
  savedGlovesImage: any;
  itsGloves: any;
  savedShieldAndDaggerImage: any;
  itsShieldAndDagger: any;
  OpenCloseEqinEnchant: any;
  setOpenAndCloseEqinEnchant: any;
  setClose: any;
  Close: any;
}) => {
  return (
    <>
      <div
        className="putItemThere"
        onClick={() => {
          OpenCloseEqinEnchant();
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setClose(false);
          console.log("test");
        }}
      >
        <img
          className="mainWeaponImg"
          style={{
            display: Close ? "block" : "none",
            transform:
              itsMainWeapon === true
                ? "rotate(90deg)"
                : itsArmor === true
                ? "rotate(90deg)"
                : itsShieldAndDagger === true
                ? "rotate(90deg)"
                : itsGloves === true
                ? "rotate(-35deg)"
                : "",
            height:
              itsMainWeapon === true
                ? "90px"
                : itsArmor === true
                ? "50px"
                : itsShieldAndDagger === true
                ? "50px"
                : itsGloves === true
                ? "50px"
                : itsShoes === true
                ? "50px"
                : itsHelmet === true
                ? "54px"
                : "",
            marginTop:
              itsShoes === true ? "-20px" : itsHelmet === true ? "-20px" : "",
          }}
          src={
            itsMainWeapon
              ? savedImage
              : itsArmor
              ? savedArmorImage
              : itsHelmet
              ? savedHelmetImage
              : itsShoes
              ? savedShoesImage
              : itsGloves
              ? savedGlovesImage
              : itsShieldAndDagger
              ? savedShieldAndDaggerImage
              : "https://raw.githubusercontent.com/BartoszSeno/ClickerZero/main/src/assets/images/default.png"
          }
          alt={`${
            itsMainWeapon
              ? savedName
              : itsArmor
              ? savedArmorName
              : itsHelmet
              ? savedHelmetName
              : itsShoes
              ? savedShoesImage
              : itsGloves
              ? savedGlovesImage
              : itsShieldAndDagger
              ? savedShieldAndDaggerImage
              : "No name weapon"
          }`}
        />
      </div>
    </>
  );
};

export default PutItemHere;
