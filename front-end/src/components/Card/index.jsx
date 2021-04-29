import React from "react";

import "./Card.css";

const Card = ({ children, style, className }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
