import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./CryptureInfo.css";
import Card from "../../components/Card";
import Bar from "../../components/Bar";
import requestApi from "../../requestApi";
import { useCryptures } from "../../context/cryptures";
import banheira from "../../assets/banheira.png";
import comidaReal from "../../assets/comida-real.png";

const CryptureInfo = () => {
  const { id } = useParams();

  const { managerContract } = useCryptures();

  const [info, setInfo] = useState("status");
  const [crypture, setCrypture] = useState();

  useEffect(() => {
    const getCrypture = async () => {
      let response = await requestApi.get(`crypture/${id}`);
      setCrypture(response.data);
      console.log(response.data);
    };
    getCrypture();
  }, [id]);

  const onWash = async () => {
    try {
      await managerContract.washCrypture(crypture.id);
    } catch (err) {
      console.log(err);
    }
  };
  const onFeed = async () => {
    try {
      await managerContract.feedCrypture(crypture.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {crypture ? (
        <Card
          className="outside-card"
          style={{
            background:
              crypture.type === "Grass"
                ? "linear-gradient(180deg, #54AF79 0%, #68CBBA 100%)"
                : crypture.type === "Fire"
                ? "linear-gradient(rgb(178, 69, 34) 0%, rgb(208, 135, 0) 100%)"
                : "linear-gradient(rgb(57, 128, 184) 0%, rgb(63, 172, 201) 100%)",
          }}
        >
          <div className="crypture">
            <div className="crypture-title">
              <h1>{crypture.name}</h1>
              <h1>#{crypture.id}</h1>
            </div>
            <h2 className="crypture-type">{crypture.type}</h2>
            <div className="crypture-img">
              <img src={crypture.image} alt="Montro de grama" />
            </div>
            <div className="crypture-level">
              <p>LVL {crypture.level}</p>
              <Bar
                style={{ height: 20 }}
                insideColor=" linear-gradient(180deg, #50D776 0%, #52D085 100%)"
                outsideColor="#D8D8D8"
                percentage={(crypture.xp / crypture.xpToNextLevel) * 100}
              />
            </div>
          </div>
          <Card className="inside-card">
            <div className="info-title">
              <h2
                style={info !== "status" ? { color: "grey" } : null}
                onClick={() => setInfo("status")}
              >
                Stats
              </h2>
              <h2
                style={info !== "golpes" ? { color: "grey" } : null}
                onClick={() => setInfo("golpes")}
              >
                Golpes
              </h2>
              <h2
                style={info !== "cuidar" ? { color: "grey" } : null}
                onClick={() => setInfo("cuidar")}
              >
                Cuidar
              </h2>
            </div>
            {info === "status" ? (
              <div className="info-content-stats">
                <p>HP</p>
                <Bar
                  insideColor="linear-gradient(#0df586 0%, #50d796 100%)"
                  outsideColor="#D8D8D8"
                  percentage={crypture.stats.hp}
                />
                <p>ATK</p>
                <Bar
                  insideColor="linear-gradient(#F50D0D 0%, #D75050 100%)"
                  outsideColor="#D8D8D8"
                  percentage={crypture.stats.attack}
                />
                <p>SP ATK</p>
                <Bar
                  insideColor="linear-gradient(rgb(130 13 245) 0%, rgb(141 80 215) 100%)"
                  outsideColor="#D8D8D8"
                  percentage={crypture.stats.specialAttack}
                />
                <p>DEF</p>
                <Bar
                  insideColor="linear-gradient(rgb(13 14 245) 0%, rgb(88 80 215) 100%)"
                  outsideColor="#D8D8D8"
                  percentage={crypture.stats.defense}
                />
                <p>SP DEF</p>
                <Bar
                  insideColor="linear-gradient(rgb(245 13 189) 0%, rgb(215 80 195) 100%)"
                  outsideColor="#D8D8D8"
                  percentage={crypture.stats.specialDefense}
                />
                <p>SPD</p>
                <Bar
                  insideColor="linear-gradient(#F5DE0D 0%, #D7C950 100%)"
                  outsideColor="#D8D8D8"
                  percentage={crypture.stats.speed}
                />
                <p>HGR</p>
                <Bar
                  insideColor="linear-gradient(#F5610D 0%, #C26F40 100%)"
                  outsideColor="#D8D8D8"
                  percentage={crypture.fedPercentage * 100}
                />
                <p>CLN</p>
                <Bar
                  insideColor="linear-gradient(#0DCCF5 0%, #40ABC2 100%)"
                  outsideColor="#D8D8D8"
                  percentage={crypture.washedPercentage * 100}
                />
              </div>
            ) : info === "golpes" ? (
              <div className="info-content-attacks">
                {crypture.attacks.map((attack, index) => {
                  if (attack.name !== "Nada") {
                    return (
                      <div className="attack" key={index}>
                        <h2> {attack.name} </h2>
                        <p>
                          <span>Tipo:</span>
                          {attack.type}
                        </p>
                        <p>
                          <span>Precisão:</span>
                          {attack.accuracy}
                        </p>
                        <p>
                          <span>Categoria:</span>
                          {attack.category}
                        </p>
                        <p>
                          <span>Força:</span>
                          {attack.power}
                        </p>
                        <p>
                          <span>PP:</span>
                          {attack.pp}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="info-content-care">
                <div className="care-side">
                  <h2>Lavar</h2>
                  <img
                    src={banheira}
                    className="care-button"
                    onClick={onWash}
                    alt="wash"
                  />
                </div>
                <div className="care-side">
                  <h2>Alimentar</h2>
                  <img
                    src={comidaReal}
                    className="care-button"
                    onClick={onFeed}
                    alt="wash"
                  />
                </div>
              </div>
            )}
          </Card>
        </Card>
      ) : null}
    </>
  );
};

export default CryptureInfo;
