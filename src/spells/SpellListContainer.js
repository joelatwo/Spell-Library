import React, { useState, useEffect } from "react";
import _ from "lodash";
import { InputLabel } from "@material-ui/core";

import Spell from "./Spell";
import MulitSelectDropdown from "../components/MultiSelectDropdown";

import "./SpellListContainer.css";

const SpellLibrary = require("../assets/SpellLibrary.js");

export default function SpellListContainer() {
  const [spellLibrary] = useState(SpellLibrary.default);
  const [filteredSpellLibrary, setFilteredSpellLibrary] = useState(
    SpellLibrary.default
  );
  const [filterText, setFilterText] = useState("");

  const [levels] = useState([
    "cantrip",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th"
  ]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const [schools] = useState([
    "abjuration",
    "conjuration",
    "divination",
    "enchantment",
    "evocation",
    "illusion",
    "necromancy",
    "transmutation"
  ]);
  const [selectedSchools, setSelectedSchools] = useState([]);

  const [classes] = useState([
    "Bard",
    "Cleric",
    "Druid",
    "Paladin",
    "Ranger",
    "Sorcerer",
    "Warlock",
    "Wizard",
    "Artificer"
  ]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    filterSpells();
  }, [filterText]);

  useEffect(() => {
    filterSpells();
  }, [selectedLevels]);

  useEffect(() => {
    filterSpells();
  }, [selectedSchools]);

  useEffect(() => {
    filterSpells();
  }, [selectedClasses]);

  function filterSpells() {
    if (
      filterText === "" &&
      selectedClasses.length === 0 &&
      selectedSchools.length === 0 &&
      selectedLevels.length === 0
    ) {
      setFilteredSpellLibrary(spellLibrary);
    } else {
      setFilteredSpellLibrary(
        _.filter(spellLibrary, spell => {
          let isIncluded = true;

          if (selectedLevels.length > 0) {
            let isSelectedLevels = false;
            for (let i = 0; i < selectedLevels.length; i++) {
              if (spell.level.includes(selectedLevels[i])) {
                isSelectedLevels = true;
              }
            }
            if (isIncluded === true) {
              isIncluded = isSelectedLevels;
            }
          }

          if (selectedSchools.length > 0) {
            let isSelectedSchools;
            for (let i = 0; i < selectedSchools.length; i++) {
              if (spell.school.includes(selectedSchools[i])) {
                isSelectedSchools = true;
              }
            }
            if (isIncluded === true) {
              isIncluded = isSelectedSchools;
            }
          }

          if (selectedClasses.length > 0) {
            let isSelectedClasses = false;
            for (let i = 0; i < selectedClasses.length; i++) {
              if (spell.casterType.includes(selectedClasses[i])) {
                isSelectedClasses = true;
              }
            }
            if (isIncluded === true) {
              isIncluded = isSelectedClasses;
            }
          }

          if (filterText === "") {
            // do nothing
          } else if (
            spell.name.toLowerCase().includes(filterText.toLowerCase()) ===
              false &&
            spell.castingTime.includes(filterText) === false
          ) {
            isIncluded = false;
          } else {
            // thus far everything is good
          }
          return isIncluded;
        })
      );
    }
  }

  return (
    <div>
      <div>
        <h1>Spell List</h1>
        <div id="filterOptions">
          <div>
            <InputLabel>Filter</InputLabel>
            <input
              onChange={event => {
                setFilterText(event.target.value);
              }}
              value={filterText}
              type="text"
            />
          </div>
          <MulitSelectDropdown
            placeholder="Spell Level"
            selected={selectedLevels}
            list={levels}
            setSelected={setSelectedLevels}
          />

          <MulitSelectDropdown
            placeholder="School"
            selected={selectedSchools}
            list={schools}
            setSelected={setSelectedSchools}
          />

          <MulitSelectDropdown
            placeholder="Class"
            selected={selectedClasses}
            list={classes}
            setSelected={setSelectedClasses}
          />
        </div>
        {_.map(filteredSpellLibrary, spell => (
          <Spell key={spell.name} spell={spell} className="spell" />
        ))}
      </div>
    </div>
  );
}
