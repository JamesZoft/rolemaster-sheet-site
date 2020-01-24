import React, { useState } from "react";
import styled from "styled-components";
import raceStatBonuses from './raceStatBonuses.json';

const Wrapper = styled.div`
    display: flex;
  `,
  Table = styled.table`
    width: 100%;
  `,
  Input = styled.input`
    width: 99%;
  `;

const firestoreSave = firestore => (bonus, bonusName) => {
  if (typeof bonus === "number") {
    bonus = "" + bonus;
  }
  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        fluffStats: {
          [bonusName]: bonus
        }
      },
      { merge: true }
    );
};

const generateRowFunc = save => (label, initial) => {
  const [value, setValue] = useState(initial);
  return (
    <tr>
      <td>{label}</td>
      <td>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => save(value, label.toLowerCase())}
        />
      </td>
    </tr>
  );
};

const MainInfo = props => {
  const generateRow = generateRowFunc(firestoreSave(props.firestore));
  const [race, setRace] = useState(props.race);

  return (
    <Wrapper id="wrapper" className={props.className}>
      <Table>
        <tbody>
          {generateRow("Name", props.name)}
          <tr>
            <td>Race</td>
            <td>
              <select value={race} onChange={e => {
                // setRace(e.target.value)
                firestoreSave(props.firestore)(e.target.value, "race")
              }}>
                <option value=""></option>
                {Object.keys(raceStatBonuses).map(race => <option key={race} value={race}>{race}</option>)}
              </select>
            </td>
          </tr>
          {generateRow("Residence", props.residence)}
          {generateRow("Sex", props.sex)}
          {generateRow("Weight", props.weight)}
          {generateRow("Height", props.height)}
          {generateRow("Age", props.age)}
          {generateRow("Hand", props.hand)}
          {generateRow("Hair", props.hair)}
          {generateRow("Eyes", props.eyes)}
          {generateRow("Birthday", props.birthday)}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default MainInfo;
