import React from "react";

import "./Monsters.css";
import MonsterCard from "../../components/MonsterCard";
import grassMonster from "../../assets/monstro_de_grama.png";

const Monsters = () => {
  return (
    <>
      <MonsterCard
        style={{
          background: "linear-gradient(180deg, #54AF79 0%, #68CBBA 100%)",
        }}
      >
        <div className="monster">
          <p className="monster-title">Nome #000</p>
          <p className="monster-type">Tipo</p>
          <img src={grassMonster} alt="green monster  "></img>
        </div>
      </MonsterCard>
    </>
  );
};

export default Monsters;
