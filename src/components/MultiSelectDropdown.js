import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import React from "react";
import { InputLabel } from "@material-ui/core";

export default function SpellListContainer(props) {
  return (
    <div>
      <InputLabel>{props.placeholder}</InputLabel>
      <Select
        multiple
        value={props.selected}
        onChange={event => {
          props.setSelected(event.target.value);
        }}
        input={<Input id="select-multiple-checkbox" />}
        renderValue={selected => selected.join(", ")}
      >
        {_.map(props.list, item => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={props.selected.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
