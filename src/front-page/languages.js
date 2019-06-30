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

const Languages = props => {
  return (
    <Wrapper>
      <Table>
        <tbody>
          <tr>
            <td>Language</td>
            <td>Spoken</td>
            <td>Written</td>
          </tr>
          {props.languages.map(lang => (
            <tr key={lang}>
              <td>{lang.name}</td>
              <td>{lang.spoken}</td>
              <td>{lang.written}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Languages;
