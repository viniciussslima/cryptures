import React from "react";
import { Link } from "react-router-dom";

import "./Menu.css";
import moedas from "../../assets/moedas.png";
import { useWeb3React } from "@web3-react/core";
import { useCryptures } from "../../context/cryptures";

const Menu = () => {
  const { account } = useWeb3React();
  const { cherishQty } = useCryptures();

  return (
    <div id="menu">
      <div className="menu-side">
        <Link className="menuItem" to="/cryptures">
          Página inicial
        </Link>
        <Link className="menuItem" to="/markt">
          Mercado
        </Link>
        <Link className="menuItem" to="/requestBattle">
          Batalha
        </Link>
      </div>
      <div className="menu-side">
        <span className="menuItem money">
          <img className="coins" src={moedas} alt="coins"></img>
          {cherishQty} Cherish
        </span>
        {account ? <span className="menuItem address">{account}</span> : null}
      </div>
    </div>
  );
};

export default Menu;
