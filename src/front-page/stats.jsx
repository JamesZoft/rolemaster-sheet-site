import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
  `,
  Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid grey;
    }
  `,
  BoldTr = styled.tr`
    font-weight: bold;
  `,
  BoldTd = styled.td`
    font-weight: bold;
  `;

const calculateDPsFromStat = (stat, value) => {
  return 0;
};

const firestoreSave = (firestore, bonusType) => (bonus, bonusName) => {
  if (typeof bonus === "string") {
    bonus = parseInt(bonus);
  }
  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        mainStats: {
          [bonusName]: {
            [bonusType]: bonus
          }
        }
      },
      { merge: true }
    );
};

const generateCurrentRowPartial = save => (initial, label) => {
  const [stat, setStat] = useState(initial);

  return (
    <td key={`statRow${label}`}>
      <input
        type="number"
        value={stat}
        onChange={e => setStat(e.target.value)}
        onBlur={e => save(stat, label)}
      />
    </td>
  );
};

const Stats = props => {
  const dps = {
    co: props.co.dps,
    ag: props.ag.dps,
    sd: props.sd.dps,
    me: props.me.dps,
    re: props.re.dps,
    pr: props.pr.dps
  };

  const statArray = [
    "co",
    "ag",
    "sd",
    "me",
    "re",
    "st",
    "qu",
    "pr",
    "in",
    "em"
  ];

  const generateCurrentRow = generateCurrentRowPartial(
    firestoreSave(props.firestore, "current")
  );

  const generatePotentialRow = generateCurrentRowPartial(
    firestoreSave(props.firestore, "potential")
  );

  return (
    <Wrapper id="wrapper" className={props.className}>
      <Table>
        <tbody>
          <tr>
            <td>Basic Stats</td>
            {statArray.map((stat, i) => (
              <td key={i}>{stat.toUpperCase()}</td>
            ))}
          </tr>
          <tr>
            <td>Potential</td>
            {statArray.map((stat, i) =>
              generatePotentialRow(props[stat].potential, stat)
            )}
          </tr>
          <tr>
            <td>Temporary</td>
            {statArray.map((stat, i) => (
              <td key={i}>{props[stat].temporary}</td>
            ))}
          </tr>
          <tr>
            <td>Current</td>
            {statArray.map((stat, i) =>
              generateCurrentRow(props[stat].current, stat)
            )}
          </tr>
          <tr>
            <td>Stat Bonus</td>
            {statArray.map((stat, i) => (
              <td key={i}>{props[stat].statBonus}</td>
            ))}
          </tr>
          <tr>
            <td>Racial Bonus</td>
            {statArray.map((stat, i) => (
              <td key={i}>{props[stat].racialBonus}</td>
            ))}
          </tr>
          <tr>
            <td>Other Bonus</td>
            {statArray.map((stat, i) => {
              return (
                <td key={i}>
                  <input 
                    type="number" 
                    value={props[stat].otherBonus} 
                    onChange={e => firestoreSave(props.firestore, 'otherBonus')(e.target.value, stat)}
                  />
                  {/* {props[stat].otherBonus} */}
                </td>
              )
            })}
          </tr>
          <BoldTr>
            <td>Total Bonus</td>
            {statArray.map((stat, i) => (
              <td key={i}>
                {props[stat].statBonus +
                  props[stat].racialBonus +
                  props[stat].otherBonus}
              </td>
            ))}
          </BoldTr>
          <tr>
            <td>Dev Points</td>
            <td>{dps.co}</td>
            <td>{dps.ag}</td>
            <td>{dps.sd}</td>
            <td>{dps.me}</td>
            <td>{dps.re}</td>
            <BoldTd>DP's:</BoldTd>
            <BoldTd>{Object.values(dps).reduce((a, b) => a + b)}</BoldTd>
            <BoldTd>{calculateDPsFromStat("pr", props.pr.current)}</BoldTd>
            <BoldTd>Total:</BoldTd>
            <BoldTd>
              {Object.values(dps).reduce((a, b) => a + b) +
                calculateDPsFromStat("pr", props.pr.current)}
            </BoldTd>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Stats;
