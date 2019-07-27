import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;

const calculateStatValue = (primaryStatValue, defaultRealmStat, realm) => {
  if (realm > "") {
    return primaryStatValue;
  }
  return defaultRealmStat;
};

const calculatePointsPerLevel = statValue => {
  if (statValue < 75) return 0;
  if (statValue < 95) return 1;
  if (statValue < 100) return 2;
  if (statValue < 102) return 3;
  if (statValue < 104) return 4;
  if (statValue < 106) return 5;
  if (statValue < 108) return 6;
  if (statValue < 110) return 7;
  if (statValue < 112) return 8;
  return 9;
};

const defaultRealmStatMap = {
  mentalism: "pr",
  channeling: "in",
  essence: "em"
};

const Magic = props => {
  const [level, setLevel] = useState(
    props.calculateLevelFromExp(props.experience)
  );

  const defaultRealmStat =
    props.stats[defaultRealmStatMap[props.realm.toLowerCase()]].current;

  const magicStatValue = calculateStatValue(
    props.stats[props.primaryStat.toLowerCase()].current,
    defaultRealmStat,
    props.realm
  );

  const pointsPerLevel = calculatePointsPerLevel(magicStatValue);
  const [mult, setMult] = useState(props.mult);

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>REALM(S)</th>
            <th>Stat</th>
            <th>Pts/lvl</th>
            <th>Points</th>
            <th>Multiplier</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.realm}</td>
            <td>{magicStatValue}</td>
            <td>{pointsPerLevel}</td>
            <td>{pointsPerLevel * level}</td>
            <td>
              <input type="number" value={mult} onChange={setMult} />
            </td>
            <td>{pointsPerLevel * level * mult}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Magic;
