import React, { Fragment, useState } from "react";
import styled from "styled-components";
import skillCosts from "./skillCosts.json";
import AddSkill from "./addSkill.js";
import TableRow from "./devSheetTableRow";

const Span = styled.span`
    margin-right: 20px;
  `,
  Table = styled.table`
    margin-top: 100px;
    width: 100%;
  `;

const calculateDevPointsForRanksInSkill = (devRanks, costString) => {
  if (!costString) {
    return undefined;
  }

  if (devRanks == 0) {
    return 0;
  }

  const starRanksRegex = new RegExp("^[0-9]{1,2}\\/\\*$");
  if (starRanksRegex.test(costString)) {
    return devRanks * parseInt(costString.replace("*", ""));
  }

  const costArr = costString.split("/");
  if (devRanks == 1) {
    return parseInt(costArr[0]);
  }

  return parseInt(costArr[0]) + parseInt(costArr[1]);
};

const statDevPointsMap = {
  "1": 1,
  "2": 1,
  "3": 1,
  "5": 2,
  "10": 2,
  "15": 3,
  "25": 4,
  "40": 5,
  "60": 6,
  "75": 7,
  "85": 8,
  "90": 8,
  "95": 9,
  "98": 9,
  "100": 10,
  "101": 10,
  "102": 11,
  "103": 11,
  "104": 12,
  "105": 12,
  "106": 13,
  "107": 13,
  "108": 14,
  "109": 14,
  "110": 15,
  "111": 15,
  "112": 16
};

const calculateDPsFromStat = stat => {
  const statBonusMapKeys = Object.keys(statDevPointsMap);
  if (stat > statBonusMapKeys[statBonusMapKeys.length - 1]) {
    return 16;
  }
  const levelsUnderStat = Object.keys(statDevPointsMap).filter(
    el => el <= stat
  );
  return statDevPointsMap[levelsUnderStat[levelsUnderStat.length - 1]];
};

const promoteDevToLevel = firestore => (skills, level) => {
  if (!(level >= 0)) {
    return;
  }

  const levelAllocatedAlready = Object.values(skills)
    .map(skill => skill.levelRanks[level])
    .reduce((a, b) => a && b);

  if (
    levelAllocatedAlready &&
    !window.confirm(
      "This level has already been allocated. Do you want to overwrite?"
    )
  ) {
    return;
  }

  Object.keys(skills).forEach(
    k => (skills[k].levelRanks[level] = parseInt(skills[k].levelRanks.inDev))
  );

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

const DevSheet = props => {
  const dpsUsed = Object.entries(props.data.skills)
    .map(([skillName, skill]) =>
      calculateDevPointsForRanksInSkill(
        parseInt(skill.levelRanks.inDev),
        skillCosts[props.data.charClass][skillName]
      )
    )
    .reduce((a, b) => a + b);

  const totalDPs = ["co", "ag", "sd", "me", "re", "pr"]
    .map((stat, i) =>
      parseInt(calculateDPsFromStat(props.data.mainStats[stat].current))
    )
    .reduce((a, b) => a + b);

  const [promoteLevel, setPromoteLevel] = useState(0);
  const promoteDev = promoteDevToLevel(props.firestore);

  const [addSkillHidden, setAddSkillHidden] = useState(true);

  return (
    <Fragment>
      <button onClick={e => setAddSkillHidden(false)}>Add Skill</button>
      <AddSkill
        hidden={addSkillHidden}
        selectSkill={selectedSkill => {
          if (selectedSkill) {
            props.data.skills[selectedSkill] = {
              giving: 0,
              item: 0,
              levelRanks: {
                inDev: 0
              },
              misc: 0,
              notes: ""
            };

            props.firestore
              .collection("users")
              .doc("james@jamesreed.name")
              .collection("characters")
              .doc("0")
              .set(
                {
                  skills: props.data.skills
                },
                { merge: true }
              );
          }
          setAddSkillHidden(true);
        }}
        charClass={props.data.charClass}
      />
      <div>
        <Span>{props.data.charClass}</Span>
        <Span>DPs = {totalDPs}</Span>
        <Span>DPs Used: {dpsUsed}</Span>
        <Span>Ctrl+a to add a new skill</Span>
      </div>

      <button onClick={() => promoteDev(props.data.skills, promoteLevel)}>
        Promote dev to level:
      </button>
      <input
        type="number"
        value={promoteLevel}
        onChange={e => setPromoteLevel(e.target.value)}
      />

      <Table>
        <thead>
          <tr>
            <td>Skill</td>
            <td>Cost</td>
            <td>Dev.</td>
            <td>DPs</td>
            <td>Total</td>
            <td>Given</td>
            {[...Array(51).keys()].map(i => <td key={`skillTd${i}`}>{i}</td>)}
          </tr>
        </thead>
        <tbody>
          {props.data.skills &&
            Object.entries(props.data.skills).map(([skillName, skill]) => (
              <TableRow
                key={`skillRow${skillName}`}
                skillCosts={skillCosts[props.data.charClass]}
                skillName={skillName}
                skill={skill}
                calculateDevPointsForRanksInSkill={
                  calculateDevPointsForRanksInSkill
                }
                skills={props.data.skills}
                firestore={props.firestore}
              />
            ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default DevSheet;
