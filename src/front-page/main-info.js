import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
  `,
  Keys = styled.div`
    flex: 1;
    & span {
      display: block;
      border: 1px solid lightgrey;
    }
  `,
  Values = styled.div`
    flex: 1;
    span {
      display: block;
      border: 1px solid lightgrey;
    }
  `;

const MainInfo = props => {
  return (
    <Wrapper id="wrapper" className={props.className}>
      <Keys id="keys">
        <span>Name</span>
        <span>Race</span>
        <span>Residence</span>
        <span>Sex</span>
        <span>Weight</span>
        <span>Height</span>
        <span>Age</span>
        <span>Hand</span>
        <span>Hair</span>
        <span>Eyes</span>
        <span>Birthday</span>
      </Keys>
      <Values id="values">
        <span>{props.name}</span>
        <span>{props.race}</span>
        <span>{props.residence}</span>
        <span>{props.sex}</span>
        <span>{props.weight}</span>
        <span>{props.height}</span>
        <span>{props.age}</span>
        <span>{props.hand}</span>
        <span>{props.hair}</span>
        <span>{props.eyes}</span>
        <span>{props.birthday}</span>
      </Values>
    </Wrapper>
  );
};

export default MainInfo;
