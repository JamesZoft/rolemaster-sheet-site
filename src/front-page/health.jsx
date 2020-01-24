import React, { useState } from "react";
import styled from "styled-components";
import racialDice from "./racialDice.json";
import maxRacialRolledHits from "./maxRacialRolledHits.json";
import KeyboardEventHandler from "react-keyboard-event-handler";
import firebase from "firebase/app";
import "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;

const setRolledOrMax = (setRolled, maxRolled, firestore) => rolled => {
  rolled = Math.min(rolled, maxRolled);

  setRolled(rolled);
  firestoreSave(firestore, rolled);
};

const firestoreSave = (firestore, rolled) => {
  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        health: {
          rolled: rolled
        }
      },
      { merge: true }
    );
};

const Health = props => {
  const [rolled, setRolled] = useState(props.rolled);
  const baseHits = props.con.current / 10 + 0.9;
  const nPerRank = props.bodyDevRanks * props.bodySkill.bonus + props.bodySkill.misc;
  const basic = Math.floor(baseHits + rolled + nPerRank);
  const conBonus = Math.floor(basic * ((props.con.statBonus + props.con.racialBonus + props.con.otherBonus) / 100));
  const setRolledWrapper = setRolledOrMax(
    setRolled,
    maxRacialRolledHits[props.race],
    props.firestore
  );

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <td>Dice Type</td>
            <td>Ranks</td>
            <td>Base Hits</td>
            <td>Rolled</td>
            <td>N per rank</td>
            <td>Basic</td>
            <td>Con. Bonus</td>
            <td>Total</td>
            <td>Racial Max.</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{racialDice[props.race]}</td>
            <td>{props.bodyDevRanks}</td>
            <td>{baseHits}</td>
            <td>
              <input
                type="number"
                value={rolled}
                onChange={e => setRolledWrapper(e.target.value)}
              />
            </td>
            <td>{nPerRank}</td>
            <td>{basic}</td>
            <td>{conBonus}</td>
            <td>{basic + conBonus}</td>
            <td>{maxRacialRolledHits[props.race]}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Health;
