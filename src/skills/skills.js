import React, { Fragment, useState } from "react";

import MainSkillTable from "./mainSkillTable";
import SimilarsTable from "./similarsTable";
import styled from "styled-components";

const firestoreSave = firestore => notes => {
  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        skillNotes: notes
      },
      { merge: true }
    );
};

const Textarea = styled.textarea`
    min-width: 95%;
    min-height: 10vh;
    margin: 10px;
    flex: 1;
  `,
  Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  Tables = styled.div`
    flex: 7;
  `;

const Skills = props => {
  const [notes, setNotes] = useState(props.data.skillNotes);
  const save = firestoreSave(props.firestore);

  return (
    <Container>
      <Tables>
        <MainSkillTable data={props.data} firestore={props.firestore} />
        <SimilarsTable data={props.data} firestore={props.firestore} />
      </Tables>

      <Textarea
        value={notes}
        onChange={e => {
          console.log("notes: " + e.target.value);
          return setNotes(e.target.value);
        }}
        onBlur={() => {
          console.log("saving notes");
          save(notes);
        }}
      ></Textarea>
    </Container>
  );
};

export default Skills;
