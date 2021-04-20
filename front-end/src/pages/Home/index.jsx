import React from "react";

import "./Home.css";
import grassEgg from "../../assets/ovo_de_grama.png";
import fireEgg from "../../assets/ovo_de_fogo.png";
import waterEgg from "../../assets/ovo_de_agua.png";
import randomEgg from "../../assets/ovo_de_aleatorio.png";

const Home = () => {
  return (
    <div className="home">
      <div className="egg">
        <img src={grassEgg} alt="green egg"></img>
        <p className="egg-title grass">Grama</p>
      </div>
      <div className="egg">
        <img src={waterEgg} alt="blue egg"></img>
        <p className="egg-title water">Água</p>
      </div>
      <div className="egg">
        <img src={fireEgg} alt="orange egg"></img>
        <p className="egg-title fire">Fogo</p>
      </div>
      <div className="egg">
        <img src={randomEgg} alt="purple egg"></img>
        <p className="egg-title random">?</p>
      </div>
    </div>
  );
};

export default Home;
