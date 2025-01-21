import React from "react";

const ShowWeapon = ({
  mainWeaponData,
  count,
  setCount,
  idWeapon,
  MainWeaponDmg,
  handleClick,
  NoR,
  setNoR,
  FullInv,
}: {
  mainWeaponData: any;
  count: number;
  setCount: any;
  idWeapon: any;
  MainWeaponDmg: any;
  handleClick: any;
  NoR: any;
  setNoR: any;
  FullInv: any;
}) => {
  return (
    <>
      {idWeapon === undefined ? null : (
        <div id="ShowStatsWeapon">
          <div className="WeaponInfo">
            <div>
              Here is{" "}
              <span className={`${mainWeaponData[Number(idWeapon)].tier}C`}>
                {mainWeaponData[Number(idWeapon)].name}
              </span>
              , a mighty sword capable of dealing up to{" "}
              <span
                style={{
                  color:
                    mainWeaponData[Number(idWeapon)].dmgLvl0 > MainWeaponDmg
                      ? "#33CC33"
                      : "#EA0001",
                }}
              >
                {mainWeaponData[Number(idWeapon)].dmgLvl0}
              </span>{" "}
              points of damage! It is one of my works. The price of this sword
              is{" "}
              <span
                style={{
                  color:
                    mainWeaponData[Number(idWeapon)].cost <= count
                      ? "#33CC33"
                      : "#EA0001",
                }}
              >
                Cost: {mainWeaponData[Number(idWeapon)].cost}
              </span>{" "}
              coins.
            </div>
          </div>
          <button
            onClick={(e) => {
              handleClick(mainWeaponData[Number(idWeapon)]);
              setCount(count - mainWeaponData[Number(idWeapon)].cost);
            }}
            disabled={
              count < mainWeaponData[Number(idWeapon)].cost ||
              FullInv === true ||
              mainWeaponData[Number(idWeapon)].isBought === true
            }
          >
            Purchase
          </button>
          <button
            className="ChatBoxClose"
            style={{
              border: "2px solid black",
              height: "42px",
              width: "42px",
              marginLeft: "290px",
              marginTop: "-325px",
              display: "flex", // Ustawienie flexboxa
              justifyContent: "center", // Wyśrodkowanie w poziomie
              alignItems: "center", // Wyśrodkowanie w pionie
              paddingTop: "0px", // Dostosowanie odległości tekstu od góry
              backgroundColor: "#b31d12",
            }}
            onClick={(e) => {
              setNoR(null);
            }}
          >
            x
          </button>
        </div>
      )}
    </>
  );
};

export default ShowWeapon;
