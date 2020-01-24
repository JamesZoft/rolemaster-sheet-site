import React from "react";
import similars from "./similars.json";
import MainSkillTable from "./mainSkillTable.jsx";
import isEqual from "lodash/isEqual";

const firestoreSave = (firestore, skills) => (skillName, skill) => {
  skills[skillName] = skill;

  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        similars: skills
      },
      { merge: true }
    );
};

const SimilarsTable = props => {
  const save = firestoreSave(props.firestore, props.data.similars);
  const data = Object.assign({}, props.data);
  data.skills = {};

  Object.entries(props.data.skills).forEach(([skillName, skill]) => {
    similars[skillName] &&
      Object.keys(similars[skillName]).forEach(similar => {
        const storedSimilar = props.data.similars[similar];
        const ranks = Object.values(skill.levelRanks).reduce(
          (prev, cur) => parseInt(prev) + parseInt(cur)
        );
        data.skills[similar] = {
          item: storedSimilar ? storedSimilar.item : 0,
          misc: storedSimilar ? storedSimilar.misc : 0,
          ranks: parseInt(ranks * similars[skillName][similar]) || 1
        };
        if (!storedSimilar || !isEqual(storedSimilar, data.skills[similar])) {
          save(similar, data.skills[similar]);
        }
      });
  });

  return (
    <MainSkillTable data={data} firestore={props.firestore} isSimilars={true} />
  );
};

export default SimilarsTable;
