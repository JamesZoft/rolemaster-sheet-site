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

const firestoreSave = firestore => (bonus, bonusName, rowNum) => {
  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        movement: {
          [bonusName]: bonus
        }
      },
      { merge: true }
    );
};

const Movement = props => {
  const [move, setMove] = useState(props.fullMove);
  const [manPen, setManPen] = useState(props.maneuverPen);

  const save = firestoreSave(props.firestore);

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th>Full Move</th>
            <th>Max. Pace</th>
            <th>80% Move</th>
            <th>20% Move</th>
            <th>Man. Pen.</th>
            <th>Miss. Pen.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                value={move}
                onChange={e => setMove(e.target.value)}
                onBlur={e => save(move, "fullMove")}
              />
            </td>
            <td>{props.fullMove * 4}</td>
            <td>{props.fullMove * 0.8}</td>
            <td>{props.fullMove * 0.2}</td>
            <td>
              <input
                type="number"
                value={manPen}
                onChange={e => setManPen(e.target.value)}
                onBlur={e => save(manPen, "maneuverPen")}
              />
            </td>
            <td>0</td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Movement;
