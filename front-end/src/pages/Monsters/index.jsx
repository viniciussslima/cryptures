import React from "react";
import { useHistory } from "react-router-dom";

import "./Monsters.css";
import MonsterCard from "../../components/MonsterCard";
import { useCryptures } from "../../context/cryptures";

const Monsters = () => {
  const history = useHistory();
  const { cryptures } = useCryptures();

  return (
    <>
      {cryptures.map((crypture) => (
        <MonsterCard
          key={crypture.id}
          style={{
            background:
              crypture.type === "Grass"
                ? "linear-gradient(180deg, #54AF79 0%, #68CBBA 100%)"
                : crypture.type === "Fire"
                ? "linear-gradient(rgb(178, 69, 34) 0%, rgb(208, 135, 0) 100%)"
                : "linear-gradient(rgb(57, 128, 184) 0%, rgb(63, 172, 201) 100%)",
          }}
        >
          <div className="monster">
            <p className="monster-title">
              {crypture.name} #{crypture.id}
            </p>
            <p className="monster-type">{crypture.type}</p>
            <img
              src={crypture.image}
              alt="green monster"
              onClick={() => history.push(`/crypture/${crypture.id}`)}
            ></img>
          </div>
        </MonsterCard>
      ))}
    </>
  );
};

export default Monsters;
