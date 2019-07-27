import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    & > * {
      flex: 1;
    }
  `,
  Table = styled.table`
    border-collapse: collapse;
    th,
    td {
      border: 1px solid grey;
    }
  `;

const firestoreSave = (firestore, languages) => (bonus, bonusName, rowNum) => {
  const langRow = languages[rowNum];
  langRow[bonusName] = bonus;

  firestore
    .collection("users")
    .doc("0")
    .collection("characters")
    .doc("0")
    .set(
      {
        languages: languages
      },
      { merge: true }
    );
};

const generateTdPartial = save => (initial, label, rowNum) => {
  const [stat, setStat] = useState(initial);
  return (
    <td>
      <input
        value={stat}
        onChange={e => setStat(e.target.value)}
        onBlur={e => save(stat, label, rowNum)}
      />
    </td>
  );
};

const Languages = props => {
  const generateTd = generateTdPartial(
    firestoreSave(props.firestore, props.languages)
  );

  return (
    <Wrapper>
      <Table>
        <tbody>
          <tr>
            <td>Language</td>
            <td>Spoken</td>
            <td>Written</td>
          </tr>
          {props.languages.map((lang, i) => (
            <tr key={i}>
              {generateTd(lang.name, "name", i)}
              {generateTd(lang.spoken, "spoken", i)}
              {generateTd(lang.written, "written", i)}
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Languages;
