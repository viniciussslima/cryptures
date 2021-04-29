import React, { useState } from "react";
import { ethers } from "ethers";

import "./RequestBattle.css";
import grassMonster from "../../assets/monstro_de_grama_escuro.png";
import searchIcon from "../../assets/lupa.png";
import swordIcon from "../../assets/vs.png";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import { useCryptures } from "../../context/cryptures";
import requestApi from "../../requestApi";

const RequestBattle = () => {
  const { cryptures, managerContract } = useCryptures();

  const [opponentCryptures, setOpponetCryptures] = useState([]);
  const [selectedCrypture, setSelectedCrypture] = useState();
  const [address, setAddress] = useState("");
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState();

  const selectCrypture = (id) => {
    let crypture = cryptures.find((crypture) => crypture.id === id);
    setSelectedCrypture({ ...crypture });
  };

  const search = async (event) => {
    var key = event.which || event.keyCode;
    if (key === 13 && event.target.value.length) {
      try {
        const response = await requestApi.get(`/address/cryptures/${address}`);
        if (response.data && response.data.length === 0) {
          setError("Não foi possivel encontrar esse usuario");
          setOpenError(true);
        } else {
          setOpponetCryptures(response.data);
        }
      } catch (err) {
        setError("Não foi possivel encontrar esse usuario");
        setOpenError(true);
      }
    }
  };

  const reqeustBattle = async () => {
    try {
      await managerContract.requestBattle(selectedCrypture.id, address, 50);
    } catch (err) {
      setError("Não foi possivel criar a batalha");
      setOpenError(true);
      console.log(err);
    }
  };

  let leftSideColor = "#00c667 0%,#00964e 49.45%";
  if (selectedCrypture) {
    if (selectedCrypture.type === "Fire") {
      leftSideColor = "rgb(178, 69, 34) 0%, rgb(208, 135, 0) 49.45%";
    } else if (selectedCrypture.type === "Water") {
      leftSideColor = "rgb(57, 128, 184) 0%, rgb(63, 172, 201) 49.45%";
    }
  }

  let rightSideColor = "#00c667 0%, rgb(51 51 51) 49.45%";

  return (
    <>
      <div id="battle-cryptures">
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Digite o endereço do adversário"
            onChange={(event) => setAddress(event.target.value)}
            onKeyUp={search}
          />
          <img src={searchIcon} alt="Lupa"></img>
        </div>
        <div className="battle-cryptures-content">
          <div className="battle-cryptures-options">
            {cryptures.map((crypture) => (
              <div key={crypture.id}>
                <Card
                  className="battle-cryptures-options-card"
                  style={{
                    background:
                      crypture.type === "Grass"
                        ? "linear-gradient(180deg, #54AF79 0%, #68CBBA 100%)"
                        : crypture.type === "Fire"
                        ? "linear-gradient(rgb(178, 69, 34) 0%, rgb(208, 135, 0) 100%)"
                        : "linear-gradient(rgb(57, 128, 184) 0%, rgb(63, 172, 201) 100%)",
                  }}
                >
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
          <Card
            className="battle-display"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0.48) 0%,rgba(255, 255, 255, 0) 100%), linear-gradient(106.66deg, ${leftSideColor},${rightSideColor})`,
            }}
          >
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
              <img src={swordIcon} alt="BATTLE" />
              <button onClick={reqeustBattle}>BATALHAR</button>
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
          <div className="battle-cryptures-options">
            {opponentCryptures.length > 0 ? (
              opponentCryptures.map((crypture) => (
                <div key={crypture.id}>
                  <Card
                    className="battle-cryptures-options-card"
                    style={{
                      background:
                        crypture.type === "Grass"
                          ? "linear-gradient(180deg, #54AF79 0%, #68CBBA 100%)"
                          : crypture.type === "Fire"
                          ? "linear-gradient(rgb(178, 69, 34) 0%, rgb(208, 135, 0) 100%)"
                          : "linear-gradient(rgb(57, 128, 184) 0%, rgb(63, 172, 201) 100%)",
                    }}
                  >
                    <span>#{crypture.id}</span>
                    <img src={crypture.image} alt="crypture" />
                  </Card>
                </div>
              ))
            ) : (
              <>
                <div>
                  <Card
                    className="battle-cryptures-options-card"
                    style={{
                      background:
                        "linear-gradient(rgb(72 72 72) 0%, rgb(43 43 43) 100%)",
                    }}
                  >
                    <span>#000</span>
                    <img src={grassMonster} alt="crypture" />
                  </Card>
                </div>
                <div>
                  <Card
                    className="battle-cryptures-options-card"
                    style={{
                      background:
                        "linear-gradient(rgb(72 72 72) 0%, rgb(43 43 43) 100%)",
                    }}
                  >
                    <span>#000</span>
                    <img src={grassMonster} alt="crypture" />
                  </Card>
                </div>
                <div>
                  <Card
                    className="battle-cryptures-options-card"
                    style={{
                      background:
                        "linear-gradient(rgb(72 72 72) 0%, rgb(43 43 43) 100%)",
                    }}
                  >
                    <span>#000</span>
                    <img src={grassMonster} alt="crypture" />
                  </Card>
                </div>
                <div>
                  <Card
                    className="battle-cryptures-options-card"
                    style={{
                      background:
                        "linear-gradient(rgb(72 72 72) 0%, rgb(43 43 43) 100%)",
                    }}
                  >
                    <span>#000</span>
                    <img src={grassMonster} alt="crypture" />
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {openError ? (
        <Modal title="Erro" onClose={() => setOpenError(false)}>
          <div>
            <p>{error}</p>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default RequestBattle;
