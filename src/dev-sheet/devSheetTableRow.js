import React, { useState } from "react";
import skillCosts from "./skillCosts.json";

const firestoreSave = (firestore, skills) => (devRanks, skillName) => {
  const skill = skills[skillName];
  skill.levelRanks.inDev = devRanks;

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

const TableRow = props => {
  const [devRanks, setDevRanks] = useState(props.skill.levelRanks.inDev);
  const [giving, setGiving] = useState(props.skill.giving);

  const skillTotal =
    Object.entries(props.skill.levelRanks)
      .map(([k, v]) => {
        if (k === "inDev") {
          return 0;
        }
        return parseInt(v);
      })
      .reduce((a, b) => a + b) + giving;
  let devPointsUsed = props.calculateDevPointsForRanksInSkill(
    props.skill.levelRanks.inDev,
    skillCosts[props.skillName]
  );

  const save = firestoreSave(props.firestore, props.data.skills);

  return (
    <tr>
      <td>{props.skillName}</td>
      <td>{skillCosts[props.skillName]}</td>
      <td>
        <input
          type="number"
          value={devRanks}
          onChange={e => setDevRanks(e.target.value)}
          onBlur={e => save(devRanks, props.skillName)}
        />
      </td>
      <td>{devPointsUsed}</td>
      <td>{skillTotal}</td>
      <td>
        <input
          type="number"
          value={giving}
          onChange={e => setGiving(e.target.value)}
          onBlur={e => save(giving, props.skillName)}
        />
      </td>
      {[...Array(51).keys()].map((key, i) => (
        <td key={i}>{props.skill.levelRanks[key]}</td>
      ))}
    </tr>
  );
};

export default TableRow;
