import React from "react";

import Card from "../Card";

const MonsterCard = ({ children, style }) => {
  return (
    <Card
      style={{
        width: 247,
        height: 339,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        ...style,
      }}
    >
      {children}
    </Card>
  );
};

export default MonsterCard;
