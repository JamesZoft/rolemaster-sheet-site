import React from "react";
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

const Movement = props => {
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
            <td>{props.fullMove}</td>
            <td>{props.fullMove * 4}</td>
            <td>{props.fullMove * 0.8}</td>
            <td>{props.fullMove * 0.2}</td>
            <td>-10</td>
            <td>0</td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Movement;
