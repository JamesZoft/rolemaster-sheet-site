import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import MainSkillTable from "./mainSkillTable";

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
    return <MainSkillTable data={value.data()} firestore={props.firestore} />;
  }
};

export default Skills;
