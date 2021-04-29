import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import "./Template.css";
import useEagerConnect from "../../web3/useEagerConnect";
import useInactiveListener from "../../web3/useInactiveListener";
import injected from "../../web3/injected";
import Menu from "../Menu";

const Template = ({ children }) => {
  const { account, activate } = useWeb3React();
  const triedEager = useEagerConnect();
  const [activatingConnector, setActivatingConnector] = useState();
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <div className="container">
      <Menu />
      <div className="content">
        {account ? (
          <>{children}</>
        ) : (
          <div className="not-conected">
            <h2>Nenhuma conta indentificada!</h2>
            <h2>Para se conctar aperte o botão abaixo:</h2>
            <button
              className="conection"
              onClick={async () => {
                setActivatingConnector("Injected");
                activate(injected);
              }}
            >
              Conectar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
