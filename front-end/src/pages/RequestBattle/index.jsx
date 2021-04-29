import React, { useState } from "react";

import "./RequestBattle.css";
import grassMonster from "../../assets/monstro_de_grama_escuro.png";
import searchIcon from "../../assets/lupa.png";
import swordIcon from "../../assets/espadas.png";
import Card from "../../components/Card";
import { useCryptures } from "../../context/cryptures";

const RequestBattle = () => {
  const { cryptures } = useCryptures();

  const [selectedCrypture, setSelectedCrypture] = useState();

  const selectCrypture = (id) => {
    console.log(id);
    let crypture = cryptures.find((crypture) => crypture.id === id);
    setSelectedCrypture({ ...crypture });
  };

  return (
    <>
      <div id="battle-cryptures">
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Digite o endereço do adversário"
          />
          <img src={searchIcon} alt="Lupa"></img>
        </div>
        <div className="battle-cryptures-content">
          <div className="battle-cryptures-options">
            {cryptures.map((crypture) => (
              <div key={crypture.id}>
                <Card className="battle-cryptures-options-card">
                  <span>#{crypture.id}</span>
                  <img
                    className="left-crypture"
                    src={crypture.image}
                    onClick={() => selectCrypture(crypture.id)}
                    alt="crypture"
                  />
                </Card>
              </div>
            ))}
          </div>
          <Card className="battle-display">
            {selectedCrypture ? (
              <div className="battle-display-side" style={{ marginLeft: 20 }}>
                <div className="title">
                  <span>{selectedCrypture.name}</span>
                  <span>#{selectedCrypture.id}</span>
                </div>
                <img
                  className="left-crypture"
                  src={selectedCrypture.image}
                  alt="crypture"
                />
                <div className="level">
                  <span>Level {selectedCrypture.level}</span>
                </div>
              </div>
            ) : (
              <div className="helper">
                <h2>Escolha uma das sua cryptures para batalhar</h2>
              </div>
            )}
            <div className="battle-display-center" style={{ marginRight: 20 }}>
              <img src={swordIcon} alt="espadas" />
              <button>Enviar pedido</button>
            </div>
            <div className="battle-display-side">
              <div className="title">
                <span>Bulbasaur</span>
                <span>#000</span>
              </div>
              <img src={grassMonster} alt="crypture" />
              <div className="level">
                <span>Level 2</span>
              </div>
            </div>
          </Card>
          {/* <ul className="battle-cryptures-options">
            <li className="battle-cryptures-options-card">
              <span>#003</span>
              <img src={grassMonster} alt="crypture" />
            </li>
            <li className="battle-cryptures-options-card">
              <span>#004</span>
              <img src={grassMonster} alt="crypture" />
            </li>
            <li className="battle-cryptures-options-card">
              <span>#005</span>
              <img src={grassMonster} alt="crypture" />
            </li>
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default RequestBattle;
