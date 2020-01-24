import React, { useState } from "react";
import skillCosts from "./skillCosts.json";
import { getTotalSkillRanks } from '../shared/skills';

const checkEnteredRanks = (charClass, skillName, ranks) => {
  const costString = skillCosts[charClass][skillName]

  const starRanksRegex = new RegExp("^[0-9]{1,2}\\/\\*$");
  if (starRanksRegex.test(costString)) {
    return ranks;
  }

  return Math.min(ranks, costString.split("/").length);
}

const firestoreSave = (firestore, skills) => (devRanks, skillName, property) => {
  const skill = skills[skillName];
  skill.levelRanks[property] = devRanks;

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
  const [giving, setGiving] = useState(props.skill.levelRanks.giving);

  let devPointsUsed = props.calculateDevPointsForRanksInSkill(
    devRanks,
    skillCosts[props.charClass][props.skillName]
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
          onChange={e => {
            const val = e.target.value > 0 ? checkEnteredRanks(props.charClass, props.skillName, e.target.value) : 0;
            setDevRanks(parseInt(val))
            save(parseInt(val), props.skillName, 'inDev')
          }}
        />
      </td>
      <td>{devPointsUsed}</td>
      <td>{getTotalSkillRanks(props.skill.levelRanks, giving)}</td>
      <td>
        <input
          type="number"
          value={giving}
          onChange={e => {
            setGiving(parseInt(e.target.value))
            save(parseInt(e.target.value), props.skillName, 'giving')
          }}
        />
      </td>
      {[...Array(51).keys()].map((key, i) => (
        <td key={i}>{props.skill.levelRanks[key]}</td>
      ))}
    </tr>
  );
};

export default TableRow;
