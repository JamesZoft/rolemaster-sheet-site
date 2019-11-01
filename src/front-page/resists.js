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

const generateRow = (resists, resistName, stat, firestore, racials) => {
  const miscSave = firestoreSave(firestore, "misc");
  const itemSave = firestoreSave(firestore, "item");

  return (
    <tr>
      <td>Disease</td>
      <td>CO</td>
      <td>{stat.statBonus}</td>
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
          props.stats.co,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "poison",
          props.stats.co,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "terrorFear",
          props.stats.sd,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "essence",
          props.stats.em,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "channeling",
          props.stats.in,
          props.firestore,
          racials
        )}
        {generateRow(
          props.resists,
          "mentalism",
          props.stats.pr,
          props.firestore,
          racials
        )}
        {/* <tr>
          <td>Disease</td>
          <td>CO</td>
          <td>{props.stats.co.statBonus}</td>
          {generateCurrentRowMisc(props.resists.disease.misc, "disease")}
          {generateCurrentRowItem(props.resists.disease.item, "disease")}
          <td>{racials.disease}</td>
          <th>
            {Object.values(props.resists.disease).reduce((a, b) => a + b) +
              props.stats.co.statBonus}
          </th>
        </tr> */}
        {/* <tr>
          <td>Poison</td>
          <td>CO</td>
          <td>{props.stats.co.statBonus}</td>
          {generateCurrentRowMisc(props.resists.poison.misc, "poison")}
          {generateCurrentRowItem(props.resists.poison.item, "poison")}
          <td>{racials.poison}</td>
          <th>
            {Object.values(props.resists.poison).reduce((a, b) => a + b) +
              props.stats.co.statBonus}
          </th>
        </tr>
        <tr>
          <td>Terror/Fear</td>
          <td>SD</td>
          <td>{props.stats.sd.statBonus}</td>
          {generateCurrentRowMisc(props.resists.terrorFear.misc, "terrorFear")}
          {generateCurrentRowItem(props.resists.terrorFear.item, "terrorFear")}
          <td>{racials.terrorFear}</td>
          <th>
            {Object.values(props.resists.terrorFear).reduce((a, b) => a + b) +
              props.stats.sd.statBonus}
          </th>
        </tr>
        <tr>
          <td>Essence</td>
          <td>EM</td>
          <td>{props.stats.em.statBonus}</td>
          {generateCurrentRowMisc(props.resists.essence.misc, "essence")}
          {generateCurrentRowItem(props.resists.essence.item, "essence")}
          <td>{racials.essence}</td>
          <th>
            {Object.values(props.resists.essence).reduce((a, b) => a + b) +
              props.stats.em.statBonus}
          </th>
        </tr>
        <tr>
          <td>Channeling</td>
          <td>IN</td>
          <td>{props.stats.in.statBonus}</td>
          {generateCurrentRowMisc(props.resists.channeling.misc, "channeling")}
          {generateCurrentRowItem(props.resists.channeling.item, "channeling")}
          <td>{racials.channeling}</td>
          <th>
            {Object.values(props.resists.channeling).reduce((a, b) => a + b) +
              props.stats.in.statBonus}
          </th>
        </tr>
        <tr>
          <td>Mentalism</td>
          <td>PR</td>
          <td>{props.stats.pr.statBonus}</td>
          {generateCurrentRowMisc(props.resists.mentalism.misc, "mentalism")}
          {generateCurrentRowItem(props.resists.mentalism.item, "mentalism")}
          <td>{racials.mentalism}</td>
          <th>
            {Object.values(props.resists.mentalism).reduce((a, b) => a + b) +
              props.stats.pr.statBonus}
          </th>
        </tr> */}
      </tbody>
    </Table>
  );
};

export default Resists;
