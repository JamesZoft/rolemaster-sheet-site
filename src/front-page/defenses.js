import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;

const calculateShieldbonus = type => {
  switch (type.toLowerCase()) {
    case "tower":
      return 20;
    case "heavy":
      return 15;
    case "light":
      return 10;
    case "buckler":
    case "target":
      return 5;
    default:
      return 0;
  }
};

const firestoreSave = (firestore, defenses) => (bonus, bonusName, rowNum) => {
  const defenseRow = defenses[rowNum];
  defenseRow[bonusName] = bonus;

  firestore
    .collection("users")
    .doc("0")
    .collection("characters")
    .doc("0")
    .set(
      {
        defenses: defenses
      },
      { merge: true }
    );
};

const generateCurrentRowPartial = save => (initial, label, rowNum) => {
  const [stat, setStat] = useState(initial);
  return (
    <td>
      <input
        type={typeof initial == "number" ? "number" : "string"}
        value={stat}
        onChange={e => setStat(e.target.value)}
        onBlur={e => save(stat, label, rowNum)}
      />
    </td>
  );
};

const Defenses = props => {
  const generateTd = generateCurrentRowPartial(
    firestoreSave(props.firestore, props.defenses)
  );

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Mode</th>
            <th>AT</th>
            <th>Shield Type</th>
            <th>Shield Bonus</th>
            <th>QU Bonus</th>
            <th>Other bonus</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.defenses.map((defenseLine, i) => {
            const shieldBonus = calculateShieldbonus(defenseLine.shieldType);
            return (
              <tr key={i}>
                {generateTd(defenseLine.mode, "mode", i)}
                {generateTd(defenseLine.at, "at", i)}
                {generateTd(defenseLine.shieldType, "shieldType", i)}
                <td>{shieldBonus}</td>
                <td>{props.quBonus}</td>
                {generateTd(defenseLine.otherBonus, "otherBonus", i)}
                <td>{shieldBonus + props.quBonus + defenseLine.otherBonus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Defenses;
