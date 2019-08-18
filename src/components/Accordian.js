import React, { useState } from "react";

import "../components/accordian.css";

export default function Accordian(props) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={isActive ? "accordian activeAccordian" : "accordian"}
      >
        {props.title}
      </button>
      <div className={isActive ? "panel activePanel" : "panel"}>
        {props.content}
      </div>
    </div>
  );
}
