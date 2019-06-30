import React from "react";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  th,
  td {
    border: 1px solid grey;
  }
`;

const Resists = props => {
  return (
    <Table>
      <tbody>
        <tr>
          <td>Resist Roll</td>
          <td>vs</td>
          <td>Stat</td>
          <td>Misc</td>
          <td>Item</td>
          <td>Race</td>
          <td>Total</td>
        </tr>
        <tr>
          <td>Disease</td>
          <td>CO</td>
          <td>{props.stats.co.statBonus}</td>
          <td>{props.resists.disease.misc}</td>
          <td>{props.resists.disease.item}</td>
          <td>{props.resists.disease.race}</td>
          <td>
            {Object.values(props.resists.disease).reduce((a, b) => a + b) +
              props.stats.co.statBonus}
          </td>
        </tr>
        <tr>
          <td />
          <td>CO</td>
          <td>{props.stats.co.statBonus}</td>
          <td>{props.resists.poison.misc}</td>
          <td>{props.resists.poison.item}</td>
          <td>{props.resists.poison.race}</td>
          <td>
            {Object.values(props.resists.poison).reduce((a, b) => a + b) +
              props.stats.co.statBonus}
          </td>
        </tr>
        <tr>
          <td />
          <td>SD</td>
          <td>{props.stats.sd.statBonus}</td>
          <td>{props.resists.terrorFear.misc}</td>
          <td>{props.resists.terrorFear.item}</td>
          <td>{props.resists.terrorFear.race}</td>
          <td>
            {Object.values(props.resists.terrorFear).reduce((a, b) => a + b) +
              props.stats.sd.statBonus}
          </td>
        </tr>
        <tr>
          <td />
          <td>EM</td>
          <td>{props.stats.em.statBonus}</td>
          <td>{props.resists.essence.misc}</td>
          <td>{props.resists.essence.item}</td>
          <td>{props.resists.essence.race}</td>
          <td>
            {Object.values(props.resists.essence).reduce((a, b) => a + b) +
              props.stats.em.statBonus}
          </td>
        </tr>
        <tr>
          <td />
          <td>IN</td>
          <td>{props.stats.in.statBonus}</td>
          <td>{props.resists.channeling.misc}</td>
          <td>{props.resists.channeling.item}</td>
          <td>{props.resists.channeling.race}</td>
          <td>
            {Object.values(props.resists.channeling).reduce((a, b) => a + b) +
              props.stats.in.statBonus}
          </td>
        </tr>
        <tr>
          <td />
          <td>PR</td>
          <td>{props.stats.pr.statBonus}</td>
          <td>{props.resists.mentalism.misc}</td>
          <td>{props.resists.mentalism.item}</td>
          <td>{props.resists.mentalism.race}</td>
          <td>
            {Object.values(props.resists.mentalism).reduce((a, b) => a + b) +
              props.stats.pr.statBonus}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Resists;
