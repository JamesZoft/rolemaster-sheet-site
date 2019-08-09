import React from "react";
import similars from "./similars.json";
import MainSkillTable from "./mainSkillTable.js";

const SimilarsTable = props => {
  const data = Object.assign({}, props.data);
  data.skills = [];

  props.data.skills.forEach(skill => {
    Object.keys(similars[skill.name]).forEach(similar => {
      const storedSimilar = props.data.similars[similar];
      data.skills.push({
        name: similar,
        item: storedSimilar ? storedSimilar.item : 0,
        misc: storedSimilar ? storedSimilar.misc : 0,
        ranks: parseInt(skill.ranks * similars[skill.name][similar]) || 1
      });
    });
  });

  return (
    <MainSkillTable data={data} firestore={props.firestore} isSimilars={true} />
  );
};

export default SimilarsTable;
