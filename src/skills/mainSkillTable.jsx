import React, { useState } from "react";
import skillsData from "./skillsData.json";
import calculateLevelFromExp from "../level";
import styled from "styled-components";
import firebase from "firebase/app";

const Table = styled.table`
  width: 100%;
  margin-bottom: 50px;
`;

const firestoreSave = (firestore, skills, isSimilars) => (
  bonus,
  bonusName,
  rowNum
) => {
  const skillRow = skills[rowNum];
  skillRow[bonusName] = bonus;

  const propToSaveAgainst = isSimilars ? "similars" : "skills";

  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        [propToSaveAgainst]: skills
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

const deleteSkillPartial = (firestore) => name => {
  if (!window.confirm(`Are you sure you want to delete the skill ${name}?`)) {
    return;
  }

  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0").update({
      [`skills.${name}`]: firebase.firestore.FieldValue.delete()
    })
}

const generateSkillRowPartial = (data, level, save, skills, isSimilars, deleteSkill) => (
  skillName,
  skill,
  i
) => {
  const [item, setItem] = useState(skill.item);
  const [misc, setMisc] = useState(skill.misc);
  const [notes, setNotes] = useState(skill.notes);

  const ranks =
    skill.ranks ||
    Object.values(skill.levelRanks).reduce((prev, cur) => parseInt(prev) + parseInt(cur))
    - parseInt(skill.levelRanks.inDev);

  const giving = calculateGivingFromRanks(ranks);
  const levelBonus = skillsData[skillName].skillArea === 'Special' ? 0 : 
    data.skillAreas[skillsData[skillName].skillArea.toLowerCase()] * level;

  const stat1 = data.mainStats[skillsData[skillName].stat1.toLowerCase()];
  const stat2 = data.mainStats[skillsData[skillName].stat2.toLowerCase()];

  const statBonus = Math.ceil(
    (stat1 ? stat1.current : 0 + stat2 ? stat2.current : 0) / 2
  );
  let total = giving + levelBonus + statBonus + item + misc;

  return (
    <tr key={i}>
      <td>{skillName}</td>
      <td>{skillsData[skillName].skillArea}</td>
      <td>{skillsData[skillName].stat1}</td>
      <td>{skillsData[skillName].stat2}</td>
      <td>{ranks}</td>
      <td>{giving}</td>
      <td>{levelBonus}</td>
      <td>{statBonus}</td>
      <td>
        <input
          type="number"
          id={skill + "Item"}
          value={item}
          onChange={e => setItem(parseInt(e.target.value))}
          onBlur={e => save(parseInt(e.target.value), "item", i)}
        />
      </td>
      <td>
        <input
          type="number"
          id={skill + "Misc"}
          value={misc}
          onChange={e => setMisc(parseInt(e.target.value))}
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
      <td>{isSimilars ? "" : skill.levelRanks.inDev}</td>
      <td><button onClick={() => deleteSkill(skillName)}>Delete</button></td>
    </tr>
  );
};

const MainSkillTable = props => {
  const level = calculateLevelFromExp(props.data.experience);
  const deleteSkill = deleteSkillPartial(props.firestore);

  const save = firestoreSave(
    props.firestore,
    props.data.skills,
    props.isSimilars
  );
  const generateSkillRow = generateSkillRowPartial(
    props.data,
    level,
    save,
    props.data.skills,
    props.isSimilars,
    deleteSkill
  );

  return (
    <div>
      <Table>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props.data.skills).map(([skillName, skill], i) =>
            generateSkillRow(skillName, skill, i)
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default MainSkillTable;
