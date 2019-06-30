import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
  `,
  Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid grey;
    }
  `;

const calculateDPsFromStat = (stat, value) => {
  return 0;
};

const Stats = props => {
  const dps = {
    co: calculateDPsFromStat("co", props.co.current),
    ag: calculateDPsFromStat("ag", props.ag.current),
    sd: calculateDPsFromStat("ag", props.sd.current),
    me: calculateDPsFromStat("me", props.me.current),
    re: calculateDPsFromStat("re", props.re.current),
    st: calculateDPsFromStat("st", props.st.current)
  };

  return (
    <Wrapper id="wrapper" className={props.className}>
      <Table>
        <tbody>
          <tr>
            <td>Basic Stats</td>
            <td>CO</td>
            <td>AG</td>
            <td>SD</td>
            <td>ME</td>
            <td>RE</td>
            <td>ST</td>
            <td>QU</td>
            <td>PR</td>
            <td>IN</td>
            <td>EM</td>
          </tr>
          <tr>
            <td>Potential</td>
            <td>{props.co.potential}</td>
            <td>{props.ag.potential}</td>
            <td>{props.sd.potential}</td>
            <td>{props.me.potential}</td>
            <td>{props.re.potential}</td>
            <td>{props.st.potential}</td>
            <td>{props.qu.potential}</td>
            <td>{props.pr.potential}</td>
            <td>{props.in.potential}</td>
            <td>{props.em.potential}</td>
          </tr>
          <tr>
            <td>Temporary</td>
            <td>{props.co.temporary}</td>
            <td>{props.ag.temporary}</td>
            <td>{props.sd.temporary}</td>
            <td>{props.me.temporary}</td>
            <td>{props.re.temporary}</td>
            <td>{props.st.temporary}</td>
            <td>{props.qu.temporary}</td>
            <td>{props.pr.temporary}</td>
            <td>{props.in.temporary}</td>
            <td>{props.em.temporary}</td>
          </tr>
          <tr>
            <td>Current</td>
            <td>{props.co.current}</td>
            <td>{props.ag.current}</td>
            <td>{props.sd.current}</td>
            <td>{props.me.current}</td>
            <td>{props.re.current}</td>
            <td>{props.st.current}</td>
            <td>{props.qu.current}</td>
            <td>{props.pr.current}</td>
            <td>{props.in.current}</td>
            <td>{props.em.current}</td>
          </tr>
          <tr>
            <td>Stat Bonus</td>
            <td>{props.co.statBonus}</td>
            <td>{props.ag.statBonus}</td>
            <td>{props.sd.statBonus}</td>
            <td>{props.me.statBonus}</td>
            <td>{props.re.statBonus}</td>
            <td>{props.st.statBonus}</td>
            <td>{props.qu.statBonus}</td>
            <td>{props.pr.statBonus}</td>
            <td>{props.in.statBonus}</td>
            <td>{props.em.statBonus}</td>
          </tr>
          <tr>
            <td>Racial Bonus</td>
            <td>{props.co.racialBonus}</td>
            <td>{props.ag.racialBonus}</td>
            <td>{props.sd.racialBonus}</td>
            <td>{props.me.racialBonus}</td>
            <td>{props.re.racialBonus}</td>
            <td>{props.st.racialBonus}</td>
            <td>{props.qu.racialBonus}</td>
            <td>{props.pr.racialBonus}</td>
            <td>{props.in.racialBonus}</td>
            <td>{props.em.racialBonus}</td>
          </tr>
          <tr>
            <td>Other Bonus</td>
            <td>{props.co.otherBonus}</td>
            <td>{props.ag.otherBonus}</td>
            <td>{props.sd.otherBonus}</td>
            <td>{props.me.otherBonus}</td>
            <td>{props.re.otherBonus}</td>
            <td>{props.st.otherBonus}</td>
            <td>{props.qu.otherBonus}</td>
            <td>{props.pr.otherBonus}</td>
            <td>{props.in.otherBonus}</td>
            <td>{props.em.otherBonus}</td>
          </tr>
          <tr>
            <td>Total Bonus</td>
            <td>
              {props.co.statBonus + props.co.racialBonus + props.co.otherBonus}
            </td>
            <td>
              {props.ag.statBonus + props.ag.racialBonus + props.ag.otherBonus}
            </td>
            <td>
              {props.sd.statBonus + props.sd.racialBonus + props.sd.otherBonus}
            </td>
            <td>
              {props.me.statBonus + props.me.racialBonus + props.me.otherBonus}
            </td>
            <td>
              {props.re.statBonus + props.re.racialBonus + props.re.otherBonus}
            </td>
            <td>
              {props.st.statBonus + props.st.racialBonus + props.st.otherBonus}
            </td>
            <td>
              {props.qu.statBonus + props.qu.racialBonus + props.qu.otherBonus}
            </td>
            <td>
              {props.pr.statBonus + props.pr.racialBonus + props.pr.otherBonus}
            </td>
            <td>
              {props.in.statBonus + props.in.racialBonus + props.in.otherBonus}
            </td>
            <td>
              {props.em.statBonus + props.em.racialBonus + props.em.otherBonus}
            </td>
          </tr>
          <tr>
            <td>Dev Points</td>
            <td>{dps.co}</td>
            <td>{dps.ag}</td>
            <td>{dps.sd}</td>
            <td>{dps.me}</td>
            <td>{dps.re}</td>
            <td>DP's:</td>
            <td>{Object.values(dps).reduce((a, b) => a + b)}</td>
            <td>{calculateDPsFromStat("pr", props.pr.current)}</td>
            <td>Total:</td>
            <td>
              {Object.values(dps).reduce((a, b) => a + b) +
                calculateDPsFromStat("pr", props.pr.current)}
            </td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Stats;
