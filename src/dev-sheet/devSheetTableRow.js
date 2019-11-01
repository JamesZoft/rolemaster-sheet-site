import React, { useState } from "react";
import skillCosts from "./skillCosts.json";
import { getTotalSkillRanks } from '../shared/skills';

const firestoreSave = (firestore, skills) => (devRanks, skillName) => {
  const skill = skills[skillName];
  skill.levelRanks.inDev = devRanks;

  firestore
    .collection("users")
    .doc("james@jamesreed.name")
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
  const [devRanks, setDevRanks] = useState(parseInt(props.skill.levelRanks.inDev));
  const [giving, setGiving] = useState(props.skill.giving);

  
  let devPointsUsed = props.calculateDevPointsForRanksInSkill(
    props.skill.levelRanks.inDev,
    skillCosts[props.skillName]
  );

  const save = firestoreSave(props.firestore, props.skills);

  return (
    <tr>
      <td>{props.skillName}</td>
      <td>{skillCosts[props.skillName]}</td>
      <td>
        <input
          type="number"
          value={devRanks}
          onChange={e => setDevRanks(parseInt(e.target.value))}
          onKeyUp={e =>  save(devRanks, props.skillName)}
        />
      </td>
      <td>{devPointsUsed}</td>
      <td>{getTotalSkillRanks(props.skill.levelRanks, giving)}</td>
      <td>
        <input
          type="number"
          value={giving}
          onChange={e => setGiving(parseInt(e.target.value))}
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
