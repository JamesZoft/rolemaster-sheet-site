import React, { useState } from "react";
import styled from "styled-components";
import racialResists from "./racialResists.json";

const Table = styled.table`
  border-collapse: collapse;
  th,
  td {
    border: 1px solid grey;
  }
`;

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
        resists: {
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
    <td>
      <input
        value={stat}
        onChange={e => setStat(e.target.value)}
        onBlur={e => save(stat, label)}
      />
    </td>
  );
};

const generateRow = (resists, resistName, label, statLabel, stat, firestore, racials) => {
  const miscSave = firestoreSave(firestore, "misc");
  const itemSave = firestoreSave(firestore, "item");

  return (
    <tr>
      <td>{label}</td>
      <td>{statLabel}</td>
      <td>{stat.statBonus + stat.racialBonus}</td>
      {generateCurrentRowPartial(miscSave)(
        resists[resistName].misc,
        resistName
      )}
      {generateCurrentRowPartial(itemSave)(
        resists[resistName].item,
        resistName
      )}
      <td>{racials[resistName]}</td>
      <th>
        {Object.values(resists[resistName]).reduce((a, b) => a + b) +
          stat.statBonus}
      </th>
    </tr>
  );
};

const Resists = props => {
  const racials = racialResists[props.race];

  return (
    <Table>
      <tbody>
        <tr>
          <td>Resist Roll</td>
          <td>vs</td>
          <td>Stat</td>
          <td>Misc</td>
          <td>Item</td>
          <td>Race</td>
          <th>Total</th>
        </tr>
        {generateRow(
          props.resists,
          "disease",
          "Disease",
          "CO",
          props.stats.co,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "poison",
          "Poison",
          "CO",
          props.stats.co,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "terrorFear",
          "Terror/Fear",
          "SD",
          props.stats.sd,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "essence",
          "Essence",
          "EM",
          props.stats.em,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "channeling",
          "Channeling",
          "IN",
          props.stats.in,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "mentalism",
          "Mentalism",
          "PR",
          props.stats.pr,
          props.firestore,
          racials
        )}
      </tbody>
    </Table>
  );
};

export default Resists;
