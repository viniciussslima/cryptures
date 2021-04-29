import React from "react";

import "./Bar.css";

const Bar = ({ insideColor, outsideColor, percentage, style }) => {
  return (
    <div
      className="bar-container"
      style={{ background: outsideColor, ...style }}
    >
      <div
        className="bar-content"
        style={{ background: insideColor, width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Bar;
