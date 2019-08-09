import React, { Fragment } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import MainSkillTable from "./mainSkillTable";
import SimilarsTable from "./similarsTable";

const Skills = props => {
  const [value, loading, collErr] = useDocument(
    props.firestore
      .collection("users")
      .doc("0")
      .collection("characters")
      .doc("0"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  if (!value) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        <MainSkillTable data={value.data()} firestore={props.firestore} />
        <br />
        <br />
        <br />
        <SimilarsTable data={value.data()} firestore={props.firestore} />
      </Fragment>
    );
  }
};

export default Skills;
