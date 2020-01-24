import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
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

const PrimarySecondaryRealm = props => {
  const [primary, setPrimary] = useState(props.primaryStat);
  const [secondary, setSecondary] = useState(props.secondaryStat);
  const [realm, setRealm] = useState(props.realm);
  const save = firestoreSave(props.firestore);

  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <td>Primary Stat</td>
            <td>
              <input 
                type="text" 
                value={primary} 
                onChange={e => setPrimary(e.target.value)}
                onBlur={() => save(primary, 'primaryStat')}
              />
            </td>
          </tr>
          <tr>
            <td>Secondary Stat</td>
            <td>
            <input 
                type="text" 
                value={secondary} 
                onChange={e => setSecondary(e.target.value)}
                onBlur={() => save(secondary, 'secondaryStat')}
              />
            </td>
          </tr>
          <tr>
            <td>Realm</td>
            <td>
            <input 
                type="text" 
                value={realm} 
                onChange={e => setRealm(e.target.value)}
                onBlur={() => save(realm, 'realm')}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default PrimarySecondaryRealm;
