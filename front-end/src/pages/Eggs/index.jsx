import React from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import "./Eggs.css";
import MonsterCard from "../../components/MonsterCard";
import grassEgg from "../../assets/ovo_de_grama.png";
import fireEgg from "../../assets/ovo_de_fogo.png";
import waterEgg from "../../assets/ovo_de_agua.png";
import randomEgg from "../../assets/ovo_de_aleatorio.png";
import contractJson from "../../contract.json";

const Eggs = () => {
  const { library } = useWeb3React();

  const buyCrypture = async (crypture) => {
    const abi = contractJson.abi;
    let contractAddress = process.env.REACT_APP_CONTRACT;
    let contract = new ethers.Contract(contractAddress, abi, library);

    const signer = new ethers.providers.Web3Provider(
      library.provider
    ).getSigner();
    let contractWithSigner = contract.connect(signer);
    try {
      await contractWithSigner.buyCrypture(crypture);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MonsterCard
        style={{
          background: "linear-gradient(180deg, #54AF79 0%, #68CBBA 100%)",
        }}
      >
        <div className="egg">
          <p className="egg-title">Grama</p>
          <img
            src={grassEgg}
            alt="green egg"
            onClick={() => buyCrypture(0)}
          ></img>
        </div>
      </MonsterCard>
      <MonsterCard
        style={{
          background: "linear-gradient(180deg, #3980B8 0%, #3FACC9 100%)",
        }}
      >
        <div className="egg">
          <p className="egg-title">Água</p>
          <img
            src={waterEgg}
            alt="blue egg"
            onClick={() => buyCrypture(1)}
          ></img>
        </div>
      </MonsterCard>
      <MonsterCard
        style={{
          background: "linear-gradient(180deg, #B24522 0%, #D08700 100%)",
        }}
      >
        <div className="egg">
          <p className="egg-title">Fogo</p>
          <img
            src={fireEgg}
            alt="orange egg"
            onClick={() => buyCrypture(3)}
          ></img>
        </div>
      </MonsterCard>
      <MonsterCard
        style={{
          background: "linear-gradient(180deg, #7E2FE2 0%, #9B62E4 100%)",
        }}
      >
        <div className="egg">
          <p className="egg-title">?</p>
          <img src={randomEgg} alt="purple egg"></img>
        </div>
      </MonsterCard>
    </>
  );
};

export default Eggs;
