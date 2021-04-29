import React, { useState } from "react";
import { ethers } from "ethers";

import "./Eggs.css";
import MonsterCard from "../../components/MonsterCard";
import Modal from "../../components/Modal";
import grassEgg from "../../assets/ovo_de_grama.png";
import fireEgg from "../../assets/ovo_de_fogo.png";
import waterEgg from "../../assets/ovo_de_agua.png";
import randomEgg from "../../assets/ovo_de_aleatorio.png";
import { useCryptures } from "../../context/cryptures";

const Eggs = () => {
  const { managerContract, cherishQty, updateCherich } = useCryptures();

  const [modal, setModal] = useState({ open: false, egg: null });
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState();
  console.log(modal.egg);

  const checkCherish = async (crypture) => {
    if (cherishQty >= 30000) {
      setModal({ open: true, egg: crypture });
    } else {
      buyCrypture(crypture);
    }
  };

  const buyCrypture = async (crypture) => {
    setModal({ open: false, egg: modal.egg });
    try {
      let value = ethers.utils.parseEther("0.1");
      await managerContract.buyCrypture(crypture, { value });
    } catch (err) {
      setOpenError(true);
      setError(err.message);
    }
  };

  const buyCryptureWithCherish = async () => {
    setModal({ open: false, egg: modal.egg });
    try {
      await managerContract.buyCryptureWithToken(modal.egg);
      await updateCherich();
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
            onClick={() => checkCherish(0)}
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
            onClick={() => checkCherish(1)}
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
            onClick={() => checkCherish(2)}
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
          <img
            src={randomEgg}
            alt="purple egg"
            onClick={() => checkCherish(3)}
          ></img>
        </div>
      </MonsterCard>
      {modal.open ? (
        <Modal
          title="Usar cherish?"
          onClose={() => setModal({ open: false, egg: modal.egg })}
        >
          <div>
            <p>
              Você possui cherish suficiente para comprar uma crypture, deseja
              usar?
            </p>
          </div>
          <div className="modal-buttons">
            <button className="no" onClick={() => buyCrypture(modal.egg)}>
              Não
            </button>
            <button className="yes" onClick={buyCryptureWithCherish}>
              Sim
            </button>
          </div>
        </Modal>
      ) : null}
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

export default Eggs;
