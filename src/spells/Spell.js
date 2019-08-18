import React from "react";

import Accordian from "../components/Accordian";

export default function Spell(props) {
  return (
    <Accordian
      title={props.spell.name}
      content={
        <div>
          <div>Level: {props.spell.level}</div>
          <div>School: {props.spell.school}</div>
          <div>Casting Time: {props.spell.castingTime}</div>
          {props.spell.concentration ? <div>Concentration</div> : null}
          {props.spell.ritual ? <div>Ritual</div> : null}
          <div>Range: {props.spell.range}</div>
          <div>Components: {props.spell.components}</div>
          <div>Duration: {props.spell.duration}</div>
          <div dangerouslySetInnerHTML={{ __html: props.spell.description }} />
          <div>
            <b>At Higher Levels: </b>
            {props.spell.higherLevel}
          </div>
          <div>{props.spell.casterType}</div>
        </div>
      }
    />
  );
}
