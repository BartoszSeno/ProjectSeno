import { useState } from "react";
import MainWeaponShop from "./Items/MainWeaponShop.tsx";
import MainWeaponShopTwo from "./Items/MwShop2.tsx";
import RedAndPurpleMainWeaponShop from "./Items/RedAndPurpleWeapon.tsx";
import React from "react";
import "../../../assets/css/shop.css";

const WeaponShop1 = ({
  mainWeaponData,
  setMainWeaponData,
  count,
  setCount,
  SelectedOption,
  FullInv,
}: {
  mainWeaponData: any;
  setMainWeaponData: any;
  count: any;
  setCount: any;
  SelectedOption: any;
  FullInv: any;
}) => {
  const [ShopIsOpen, setShopIsOpen] = useState(true);

  const [NoR, setNoR] = useState<any>();

  return (
    <>
      <div
        className="MainWeaponShop"
        onClick={(e) => {
          e.stopPropagation();
          setNoR(null);
        }}
      >
        <div
          id="weapon-shop-container"
          style={{ display: ShopIsOpen ? "flex" : "none" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className="WeaponWall">
            <MainWeaponShop
              mainWeaponData={mainWeaponData}
              setMainWeaponData={setMainWeaponData}
              count={count}
              setCount={setCount}
              SelectedOption={SelectedOption}
              FullInv={FullInv}
              setNoR={setNoR}
              NoR={NoR}
            />
          </span>
          <span className="WeaponWall2">
            <MainWeaponShopTwo
              mainWeaponData={mainWeaponData}
              setMainWeaponData={setMainWeaponData}
              count={count}
              setCount={setCount}
              SelectedOption={SelectedOption}
              FullInv={FullInv}
              setNoR={setNoR}
              NoR={NoR}
            />
          </span>
          <span className="RedAndPurple">
            <RedAndPurpleMainWeaponShop
              mainWeaponData={mainWeaponData}
              setMainWeaponData={setMainWeaponData}
              count={count}
              setCount={setCount}
              SelectedOption={SelectedOption}
              FullInv={FullInv}
              setNoR={setNoR}
              NoR={NoR}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default WeaponShop1;
