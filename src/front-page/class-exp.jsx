import React, { useState } from "react";
import styled from "styled-components";
import racials from "./racialAbilities.json";
import { xpLevelMap } from "../level";

const ClassInfoWrapper = styled.div`
    flex: 2;
    display: flex;
    & > div {
      flex: 3;
      > div {
        border: 1px solid lightgrey;
      }
    }
  `,
  Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    & > * {
      flex: 1;
    }
  `,
  Level = styled.div`
    flex: 1;
  `,
  Racials = styled.div`
    border: 1px solid lightgrey;
    height: 100px;
  `;

const firestoreSave = firestore => (bonus, bonusName) => {
  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        [bonusName]: bonus
      },
      { merge: true }
    );
};

const calculateExpNeeded = level => {
  const xpForLevels = Object.keys(xpLevelMap).filter(
    val => xpLevelMap[val] === level || xpLevelMap[val] === level + 1
  );
  if (level === 0) {
    xpForLevels.unshift(0);
  }
  return xpForLevels[1] - xpForLevels[0];
};

const ClassExp = props => {
  const [exp, setExp] = useState(props.experience);
  const [level, setLevel] = useState(props.calculateLevelFromExp(exp));

  const xpNeeded = calculateExpNeeded(level) + "";
  const racialAbilities = racials[props.race];

  const [charClass, setCharClass] = useState(props.charClass);

  const save = firestoreSave(props.firestore);

  return (
    <Wrapper>
      <ClassInfoWrapper>
        <div>
          <div>Class</div>
          <div>
            <input
              value={charClass}
              onChange={e => setCharClass(e.target.value)}
              onBlur={e => save(charClass, "charClass")}
            />
          </div>
        </div>
        <Level>
          <div>Level</div>
          <div>{level}</div>
        </Level>
        <div>
          <div>Experience</div>
          <div>
            <input
              type="number"
              value={exp}
              onChange={e => setExp(e.target.value)}
              onBlur={e => save(exp, "experience")}
            />
          </div>
        </div>
        <div>
          <div>Exp for next level</div>
          <div>{xpNeeded}</div>
        </div>
      </ClassInfoWrapper>
      <div>
        <div>Racial Abilities</div>
        <Racials>
          {racialAbilities.map((ability, i) => (
            <div key={i}>{ability}</div>
          ))}
        </Racials>
      </div>
    </Wrapper>
  );
};

export default ClassExp;
