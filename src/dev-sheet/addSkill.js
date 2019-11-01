import React, { useState, Fragment } from "react";
import styled from "styled-components";
import skillsList from "./../skills/skills.json";
import skillCosts from "./skillCosts.json";

const backdrop = styled.div`
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    &.hidden {
      display: none;
    }
  `,
  AddSkillPopup = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 11;
    width: 500px;
    height: 250px;
    background-color: rgba(255, 255, 255, 1);
    padding: 10px;
  `,
  Select = styled.select`
    margin-bottom: 10px;
  `,
  Button = styled.button`
    margin-right: 10px;
  `;

const AddSkill = props => {
  const [selectedSkill, setSelectedSkill] = useState("");

  const Backdrop = props.hidden
    ? styled(backdrop)`
        display: none;
      `
    : backdrop;
  return (
    <Backdrop>
      <AddSkillPopup>
        <h3>Pick a skill from the dropdown</h3>
        <Select onChange={e => setSelectedSkill(e.target.value)}>
          <option />
          {Object.keys(skillsList).map((skillName, i) => {
            return <option key={`skillNameOption${i}`} value={skillName}>{skillName}</option>;
          })}
        </Select>
        {selectedSkill && (
          <Fragment>
            <div>
              Skill Area: {skillsList[selectedSkill].skillArea} Stat 1:{" "}
              {skillsList[selectedSkill].stat1}, Stat 2:{" "}
              {skillsList[selectedSkill].stat2} Cost:{" "}
              {skillCosts[props.charClass][selectedSkill]}
            </div>
          </Fragment>
        )}
        <div>
          <Button onClick={() => props.selectSkill(selectedSkill)}>
            Confirm
          </Button>
          <Button onClick={() => props.selectSkill()}>Cancel</Button>
        </div>
      </AddSkillPopup>
    </Backdrop>
  );
};

export default AddSkill;
