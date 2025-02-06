import React, { useState } from "react";

interface Leveling {
  playerLevel: any;
  playerExp: any;
  requiredExp: any;
  playerState: any;
}

const Lvl: React.FC<Leveling> = ({
  playerLevel,
  playerExp,
  requiredExp,
  playerState,
}) => {
  return (
    <div>
      {/* Pasek EXP umieszczony na dole ekranu */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "40px",
          backgroundColor: "#333",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 9999,
          cursor: "pointer",
        }}
        title={`EXP: ${playerState.exp} / ${requiredExp}`}
      >
        {/* Poziom gracza po lewej stronie */}
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          {playerState.level}
        </div>

        {/* Pasek EXP zajmujący resztę szerokości */}
        <div
          style={{
            flex: 1,
            marginLeft: "20px",
            height: "10px",
            backgroundColor: "#555",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(playerState.exp / requiredExp) * 100}%`,
              height: "100%",
              backgroundColor: "limegreen",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Lvl;
