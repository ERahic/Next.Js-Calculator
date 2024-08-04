import React from "react";
import "./Legend.css";

type LegendProps = {
  keyMappings: { key: string; description: string }[];
};

const Legend = ({ keyMappings }: LegendProps) => {
  return (
    <div className="legend">
      <h3>Keyboard Shortcuts</h3>
      <ul>
        {keyMappings.map((mapping, index) => (
          <li key={index}>
            <span className="key">{mapping.key}</span> - {mapping.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
