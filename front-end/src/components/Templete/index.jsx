import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import "./Template.css";
import useEagerConnect from "../../web3/useEagerConnect";
import useInactiveListener from "../../web3/useInactiveListener";
import injected from "../../web3/injected";

const Template = ({ children }) => {
  const { account, activate } = useWeb3React();
  const triedEager = useEagerConnect();
  const [activatingConnector, setActivatingConnector] = useState();
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <div className="container">
      {account ? (
        <div>{children}</div>
      ) : (
        <div>
          <button
            style={{ width: 100, height: 50, color: "black", margin: 10 }}
            onClick={() => {
              setActivatingConnector("Injected");
              activate(injected);
            }}
          >
            Conectar
          </button>
        </div>
      )}
    </div>
  );
};

export default Template;
