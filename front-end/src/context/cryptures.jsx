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
import requestApi from "../requestApi";

const CrypturesContext = createContext({});

export const CrypturesProvider = ({ children }) => {
  const { account, library } = useWeb3React();
  const [cherishQty, setCherishQty] = useState();
  const [managerContract, setManagerContract] = useState();
  const [cryptures, setCryptures] = useState([]);

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

  return (
    <CrypturesContext.Provider
      value={{
        cherishQty,
        managerContract,
        updateCherich: getCherish,
        cryptures,
      }}
    >
      {children}
    </CrypturesContext.Provider>
  );
};

export function useCryptures() {
  const context = useContext(CrypturesContext);
  return context;
}
