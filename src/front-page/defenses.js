import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;

const calculateShieldbonus = type => {
  switch (type.toLowerCase()) {
    case "tower":
      return 20;
    case "heavy":
      return 15;
    case "light":
      return 10;
    case "buckler":
    case "target":
      return 5;
    default:
      return 0;
  }
};

const Defenses = props => {
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Mode</th>
            <th>AT</th>
            <th>Shield Type</th>
            <th>Shield Bonus</th>
            <th>QU Bonus</th>
            <th>Other bonus</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.defenses.map((defenseLine, i) => {
            const shieldBonus = calculateShieldbonus(defenseLine.shieldType);
            return (
              <tr key={i}>
                <td>{defenseLine.mode}</td>
                <td>{defenseLine.at}</td>
                <td>{defenseLine.shieldType}</td>
                <td>{shieldBonus}</td>
                <td>{props.quBonus}</td>
                <td>{defenseLine.otherBonus}</td>
                <td>{shieldBonus + props.quBonus + defenseLine.otherBonus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Defenses;
