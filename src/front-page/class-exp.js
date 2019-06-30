import React from "react";
import styled from "styled-components";

const ClassInfoWrapper = styled.div`
    flex: 2;
    display: flex;
    & > div {
      flex: 3;
      > div {
        border: 1px solid lightgrey;
      }
    }
  `,
  Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    & > * {
      flex: 1;
    }
  `,
  Level = styled.div`
    flex: 1;
  `,
  Racials = styled.textarea`
    border: 1px solid lightgrey;
    height: 100px;
  `;

const ClassExp = props => {
  return (
    <Wrapper>
      <ClassInfoWrapper>
        <div>
          <div>Class</div>
          <div>{props.class}</div>
        </div>
        <Level>
          <div>Level</div>
          <div>{props.level}</div>
        </Level>
        <div>
          <div>Experience</div>
          <div>{props.exp}</div>
        </div>
        <div>
          <div>Exp for next level</div>
          <div>{props.expNeeded}</div>
        </div>
      </ClassInfoWrapper>
      <div>Racial Abilities</div>
      <Racials />
    </Wrapper>
  );
};

export default ClassExp;
