import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;

const PrimarySecondaryRealm = props => {
  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <td>Primary Stat</td>
            <td>{props.primaryStat}</td>
          </tr>
          <tr>
            <td>Secondary Stat</td>
            <td>{props.secondaryStat}</td>
          </tr>
          <tr>
            <td>Realm</td>
            <td>{props.realm}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default PrimarySecondaryRealm;
