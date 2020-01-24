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

const firestoreSave = firestore => (name, skillArea) => {
  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        skillAreas: {
          [name]: skillArea
        }
      },
      { merge: true }
    );
};

const generateSkillAreaPartial = (save, level) => (name, skillArea) => {
  const [bonus, setBonus] = useState(parseInt(skillArea.bonus || 0));
  const [misc, setMisc] = useState(parseInt(skillArea.misc || 0))
  const label = name.charAt(0).toUpperCase() + name.substr(1, name.length - 1);
  return (
    <tr key={`skillArea${name}`}>
      <td>{label}</td>
      <td>
        <input
          type="number"
          id={`${label.toLowerCase()}Bonus`}
          value={bonus}
          onChange={e => {
            setBonus(parseInt(e.target.value));
            skillArea.bonus = parseInt(e.target.value);
            save(name, skillArea);
          }}
        />
      </td>
      <td>
      <input
          type="number"
          id={`${label.toLowerCase()}Misc`}
          value={misc}
          onChange={e => {
            setMisc(parseInt(e.target.value));
            skillArea.misc = parseInt(e.target.value);
            save(name, skillArea);
          }}
        />
      </td>
      <td>{bonus * level + misc}</td>
    </tr>
  )
}

const SkillAreas = props => {
  const save = firestoreSave(props.firestore);
  const level = props.calculateLevelFromExp(props.experience);
  const generateSkillArea = generateSkillAreaPartial(save, level);

  // const [academicBonus, setAcademicBonus] = useState(props.academic);
  // const [armsBonus, setArmsBonus] = useState(props.arms);
  // const [athleticBonus, setAthleticBonus] = useState(props.athletic);
  // const [baseBonus, setBaseBonus] = useState(props.base);
  // const [bodyBonus, setBodyBonus] = useState(props.body);
  // const [concentrationBonus, setConcentrationBonus] = useState(
  //   props.concentration
  // );
  // const [deadlyBonus, setDeadlyBonus] = useState(props.deadly);
  // const [directedBonus, setDirectedBonus] = useState(props.directed);
  // const [generalBonus, setGeneralBonus] = useState(props.general);
  // const [linguisticBonus, setLinguisticBonus] = useState(props.linguistic);
  // const [magicalBonus, setMagicalBonus] = useState(props.magical);
  // const [medicalBonus, setMedicalBonus] = useState(props.medical);
  // const [outdoorBonus, setOutdoorsBonus] = useState(props.outdoor);
  // const [perceptionBonus, setPerceptionBonus] = useState(props.perception);
  // const [socialBonus, setSocialBonus] = useState(props.social);
  // const [subterfugeBonus, setSubterfugeBonus] = useState(props.subterfuge);
  

  return (
    <Wrapper>
      <Table>
        <tbody>
          <tr>
            <td>Skill Area</td>
            <td>Bonus</td>
            <td>Misc</td>
            <td>Total</td>
          </tr>
          {Object.entries(props.skillAreas).map(([skillAreaName, skillArea]) => generateSkillArea(skillAreaName, skillArea))}
          {/* {generateSkillArea("Academic", props.academic)}
          {generateSkillArea("Arms", props.arms)}
          {generateSkillArea("Athletic", props.athletic)}
          {generateSkillArea("Base", props.base)}
          {generateSkillArea("Body", props.body)}
          {generateSkillArea("Concentration", props.concentration)}
          {generateSkillArea("Deadly", props.deadly)}
          {generateSkillArea("Directed", props.directed)}
          {generateSkillArea("General", props.general)}
          {generateSkillArea("Linguistic", props.linguistic)}
          {generateSkillArea("Magical", props.magical)}
          {generateSkillArea("Medical", props.medical)}
          {generateSkillArea("Outdoor", props.outdoor)}
          {generateSkillArea("Perception", props.perception)}
          {generateSkillArea("Social", props.social)}
          {generateSkillArea("Subterfuge", props.subterfuge)} */}
          {/* <tr>
            <td>Academic</td>
            <td>
              <input
                type="number"
                id="academicBonus"
                value={academicBonus}
                onChange={e => {
                  setAcademicBonus(e.target.value);
                  save(e.target.value, "academic");
                }}
              />
            </td>
            <td>{academicBonus * level}</td>
          </tr>
          <tr>
            <td>Arms</td>
            <td>
              <input
                type="number"
                id="armsBonus"
                value={armsBonus}
                onChange={e => {
                  setArmsBonus(e.target.value);
                  save(e.target.value, "arms");
                }}
              />
            </td>
            <td>{armsBonus * level}</td>
          </tr>
          <tr>
            <td>Athletic</td>
            <td>
              <input
                type="number"
                id="athleticBonus"
                value={athleticBonus}
                onChange={e => {
                  setAthleticBonus(e.target.value);
                  save(e.target.value, "athletic");
                }}
              />
            </td>
            <td>{athleticBonus * level}</td>
          </tr>
          <tr>
            <td>Base</td>
            <td>
              <input
                type="number"
                id="baseBonus"
                value={baseBonus}
                onChange={e => {
                  setBaseBonus(e.target.value);
                  save(e.target.value, "base");
                }}
              />
            </td>
            <td>{baseBonus * level}</td>
          </tr>
          <tr>
            <td>Body</td>
            <td>
              <input
                type="number"
                id="bodyBonus"
                value={bodyBonus}
                onChange={e => {
                  setBodyBonus(e.target.value);
                  save(e.target.value, "body");
                }}
              />
            </td>
            <td>{bodyBonus * level}</td>
          </tr>
          <tr>
            <td>Concentration</td>
            <td>
              <input
                type="number"
                id="concentrationBonus"
                value={concentrationBonus}
                onChange={e => {
                  setConcentrationBonus(e.target.value);
                  save(e.target.value, "concentration");
                }}
              />
            </td>
            <td>{concentrationBonus * level}</td>
          </tr>
          <tr>
            <td>Deadly</td>
            <td>
              <input
                type="number"
                id="deadlyBonus"
                value={deadlyBonus}
                onChange={e => {
                  setDeadlyBonus(e.target.value);
                  save(e.target.value, "deadly");
                }}
              />
            </td>
            <td>{deadlyBonus * level}</td>
          </tr>
          <tr>
            <td>Directed</td>
            <td>
              <input
                type="number"
                id="directedBonus"
                value={directedBonus}
                onChange={e => {
                  setDirectedBonus(e.target.value);
                  save(e.target.value, "directed");
                }}
              />
            </td>
            <td>{directedBonus * level}</td>
          </tr>
          <tr>
            <td>General</td>
            <td>
              <input
                type="number"
                id="genralBonus"
                value={generalBonus}
                onChange={e => {
                  setGeneralBonus(e.target.value);
                  save(e.target.value, "general");
                }}
              />
            </td>
            <td>{generalBonus * level}</td>
          </tr>
          <tr>
            <td>Linguistic</td>
            <td>
              <input
                type="number"
                id="linguisticBonus"
                value={linguisticBonus}
                onChange={e => {
                  setLinguisticBonus(e.target.value);
                  save(e.target.value, "linguistic");
                }}
              />
            </td>
            <td>{linguisticBonus * level}</td>
          </tr>
          <tr>
            <td>Magical</td>
            <td>
              <input
                type="number"
                id="magicalBonus"
                value={magicalBonus}
                onChange={e => {
                  setMagicalBonus(e.target.value);
                  save(e.target.value, "magical");
                }}
              />
            </td>
            <td>{magicalBonus * level}</td>
          </tr>
          <tr>
            <td>Medical</td>
            <td>
              <input
                type="number"
                id="medicalBonus"
                value={medicalBonus}
                onChange={e => {
                  setMedicalBonus(e.target.value);
                  save(e.target.value, "medical");
                }}
              />
            </td>
            <td>{medicalBonus * level}</td>
          </tr>
          <tr>
            <td>Outdoor</td>
            <td>
              <input
                type="number"
                id="outdoorBonus"
                value={outdoorBonus}
                onChange={e => {
                  setOutdoorsBonus(e.target.value);
                  save(e.target.value, "outdoor");
                }}
              />
            </td>
            <td>{outdoorBonus * level}</td>
          </tr>
          <tr>
            <td>Perception</td>
            <td>
              <input
                type="number"
                id="perceptionBonus"
                value={perceptionBonus}
                onChange={e => {
                  setPerceptionBonus(e.target.value);
                  save(e.target.value, "perception");
                }}
              />
            </td>
            <td>{perceptionBonus * level}</td>
          </tr>
          <tr>
            <td>Social</td>
            <td>
              <input
                type="number"
                id="socialBonus"
                value={socialBonus}
                onChange={e => {
                  setSocialBonus(e.target.value);
                  save(e.target.value, "social");
                }}
              />
            </td>
            <td>{socialBonus * level}</td>
          </tr>
          <tr>
            <td>Subterfuge</td>
            <td>
              <input
                type="number"
                id="subterfugeBonus"
                value={subterfugeBonus}
                onChange={e => {
                  setSubterfugeBonus(e.target.value);
                  save(e.target.value, "subterfuge");
                }}
              />
            </td>
            <td>{subterfugeBonus * level}</td>
          </tr> */}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default SkillAreas;
