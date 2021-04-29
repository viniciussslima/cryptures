import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import cherish from "../contracts/cherish.json";
import manager from "../contracts/manager.json";
import crypturesJson from "../contracts/cryptures.json";
import requestApi from "../requestApi";
import Modal from "../components/Modal";

const CrypturesContext = createContext({});

export const CrypturesProvider = ({ children }) => {
  const { account, library } = useWeb3React();
  const [cherishQty, setCherishQty] = useState();
  const [managerContract, setManagerContract] = useState();
  const [crypturesContract, setCrypturesContract] = useState();
  const [cryptures, setCryptures] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const getCherish = useCallback(async () => {
    const abi = cherish.abi;
    let contractAddress = process.env.REACT_APP_CHERISH_CONTRACT;
    let contract = new ethers.Contract(contractAddress, abi, library);

    const signer = new ethers.providers.Web3Provider(
      library.provider
    ).getSigner();
    let contractWithSigner = contract.connect(signer);
    try {
      let qty = await contractWithSigner.balanceOf(account);
      setCherishQty(qty.toNumber());
    } catch (err) {
      console.log(err);
    }
  }, [library, account]);

  useEffect(() => {
    if (account && library) {
      getCherish();
    }
  }, [account, library, getCherish]);

  useEffect(() => {
    if (library) {
      const abi = manager.abi;
      let contractAddress = process.env.REACT_APP_MANAGER_CONTRACT;
      let contract = new ethers.Contract(contractAddress, abi, library);

      const signer = new ethers.providers.Web3Provider(
        library.provider
      ).getSigner();
      let contractWithSigner = contract.connect(signer);
      setManagerContract(contractWithSigner);
    }
  }, [library]);

  useEffect(() => {
    if (library) {
      const abi = crypturesJson.abi;
      let contractAddress = process.env.REACT_APP_CRYPTURES_CONTRACT;
      let contract = new ethers.Contract(contractAddress, abi, library);

      const signer = new ethers.providers.Web3Provider(
        library.provider
      ).getSigner();
      let contractWithSigner = contract.connect(signer);
      setCrypturesContract(contractWithSigner);
    }
  }, [library]);

  useEffect(() => {
    const getCryptures = async () => {
      try {
        let response = await requestApi.get(`/address/cryptures/${account}`);
        if (response.data) {
          setCryptures(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (account) {
      getCryptures();
    }
  }, [account]);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider();
    const abi = manager.abi;
    let contractAddress = process.env.REACT_APP_MANAGER_CONTRACT;
    const signer = provider.getSigner(account);
    let contract = new ethers.Contract(contractAddress, abi, provider).connect(
      signer
    );

    contract.on("BattleResult", (winner, loser, battleId, cherishAmount) => {
      if (
        winner.localeCompare(account) === 0 ||
        loser.localeCompare(account) === 0
      ) {
        if (
          battleId.toNumber() !== Number(localStorage.getItem("battleId")) &&
          account
        ) {
          let text = `O resultado da sua batalha saiu! O vencedor é... ${winner}. `;

          if (winner.localeCompare(account) === 0) {
            text += "Parabéns!!!";
          } else {
            text += "Mais sorte da proxima vez.";
          }
          setModalMessage(text);
          setOpenModal(true);
          localStorage.setItem("battleId", battleId.toNumber());
        }
      }
    });
  }, [account]);

  // useEffect(() => {
  //   const provider = new ethers.providers.JsonRpcProvider();
  //   const abi = cherish.abi;
  //   let contractAddress = process.env.REACT_APP_CHERISH_CONTRACT;
  //   const signer = provider.getSigner(account);
  //   let contract = new ethers.Contract(contractAddress, abi, provider).connect(
  //     signer
  //   );

  //   contract.removeAllListeners("Transfer");

  //   contract.on("Transfer", (from, to, value) => {
  //     console.log(typeof value);
  //     console.log(`From: ${from}\nTo: ${to}\nValue: ${value}`);
  //     if (from.localeCompare(account) === 0) {
  //       setCherishQty(cherishQty - value.toNumber());
  //     }
  //     if (to.localeCompare(account) === 0) {
  //       setCherishQty(cherishQty + value.toNumber());
  //     }
  //   });
  // }, [account, cherishQty]);

  return (
    <CrypturesContext.Provider
      value={{
        cherishQty,
        managerContract,
        crypturesContract,
        updateCherich: getCherish,
        cryptures,
      }}
    >
      {children}
      {openModal ? (
        <Modal title="Resultado da batalha" onClose={() => setOpenModal(false)}>
          <div>
            <p>{modalMessage}</p>
          </div>
        </Modal>
      ) : null}
    </CrypturesContext.Provider>
  );
};

export function useCryptures() {
  const context = useContext(CrypturesContext);
  return context;
}
