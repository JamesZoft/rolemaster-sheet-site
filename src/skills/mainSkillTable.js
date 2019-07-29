import React, { useState } from "react";
import skills from "./skills.json";
import calculateLevelFromExp from "../level";

const firestoreSave = (firestore, skills) => (bonus, bonusName, rowNum) => {
  const skillRow = skills[rowNum];
  skillRow[bonusName] = bonus;

  firestore
    .collection("users")
    .doc("0")
    .collection("characters")
    .doc("0")
    .set(
      {
        skills: skills
      },
      { merge: true }
    );
};

const calculateGivingFromRanks = ranks => {
  let ranksLeft = ranks;
  let giving = 0;

  if (ranksLeft > 10) {
    giving += 50;
    ranksLeft -= 10;
  } else {
    return ranks * 5;
  }

  if (ranksLeft > 10) {
    giving += 20;
    ranksLeft -= 10;
  } else {
    return giving + ranksLeft * 2;
  }

  return giving + ranksLeft;
};

const generateSkillRowPartial = (data, level, save, skills) => (skill, i) => {
  const [item, setItem] = useState(skill.item);
  const [misc, setMisc] = useState(skill.misc);
  const [notes, setNotes] = useState(skill.notes);
  const [skillName, setSkillname] = useState(skill.name);

  const giving = calculateGivingFromRanks(skill.ranks);
  const levelBonus =
    data.skillAreas[skills[skill.name].skillArea.toLowerCase()] * level;

  const stat1 = data.mainStats[skills[skill.name].stat1.toLowerCase()];
  const stat2 = data.mainStats[skills[skill.name].stat2.toLowerCase()];

  const statBonus = Math.ceil(
    (stat1 ? stat1.current : 0 + stat2 ? stat2.current : 0) / 2
  );
  let total = giving + levelBonus + statBonus + item + misc;

  const onChangeItem = (item, i) => {
    setItem(item);
    save(parseInt(item), "item", i);
  };

  return (
    <tr key={i}>
      <td>
        <input
          type="text"
          id={skill + "Name"}
          value={skillName}
          onChange={e => setSkillname(e.target.value)}
          onBlur={e => save(e.target.value, "name", i)}
        />
      </td>
      <td>{skills[skill.name].skillArea}</td>
      <td>{skills[skill.name].stat1}</td>
      <td>{skills[skill.name].stat2}</td>
      <td>{skill.ranks}</td>
      <td>{giving}</td>
      <td>{levelBonus}</td>
      <td>{statBonus}</td>
      <td>
        <input
          type="number"
          id={skill + "Item"}
          value={item}
          onChange={e => onChangeItem(e.target.value, i)}
          //   onChange={e => setItem(e.target.value)}
          //   onBlur={e => save(parseInt(e.target.value), "item", i)}
        />
      </td>
      <td>
        <input
          type="number"
          id={skill + "Misc"}
          value={misc}
          onChange={e => setMisc(e.target.value)}
          onBlur={e => save(parseInt(e.target.value), "misc", i)}
        />
      </td>
      <td>{total}</td>
      <td>
        <input
          type="text"
          id={skill + "Notes"}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          onBlur={e => save(e.target.value, "notes")}
        />
      </td>
      <td>finish later</td>
    </tr>
  );
};

const MainSkillTable = props => {
  const level = calculateLevelFromExp(props.data.experience);
  const save = firestoreSave(props.firestore, props.data.skills);
  const generateSkillRow = generateSkillRowPartial(
    props.data,
    level,
    save,
    skills
  );

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Skill Area</th>
            <th>Stat 1</th>
            <th>Stat 2</th>
            <th>Ranks</th>
            <th>Giving</th>
            <th>Level</th>
            <th>Stat</th>
            <th>Item</th>
            <th>Misc</th>
            <th>Total</th>
            <th>Notes</th>
            <th>Dev</th>
          </tr>
        </thead>
        <tbody>
          {props.data.skills.map((skill, i) => generateSkillRow(skill, i))}
        </tbody>
      </table>
    </div>
  );
};

export default MainSkillTable;
