import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Menu.css";
import moedas from "../../assets/moedas.png";

const Menu = ({ address }) => {
  const [formatedAddress, setFormatedAddress] = useState();
  useEffect(() => {
    if (address) {
      const length = address.length;
      const newAddress =
        address.substring(0, 5) + "..." + address.substring(length - 3, length);
      setFormatedAddress(newAddress);
    }
  }, [address]);
  return (
    <div id="menu">
      <Link className="menuItem" to="/monsters">
        Página inicial
      </Link>
      <Link className="menuItem" to="/">
        Mercado
      </Link>
      <span className="menuItem">Batalha</span>
      <span className="menuItem money">
        <img className="coins" src={moedas} alt="coins"></img>
        10 Cherish
      </span>
      {address ? (
        <span className="menuItem address">{formatedAddress}</span>
      ) : null}
    </div>
  );
};

export default Menu;
