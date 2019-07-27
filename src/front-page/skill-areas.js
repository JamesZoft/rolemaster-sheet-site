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

const firestoreSave = firestore => (bonus, bonusName) => {
  if (typeof bonus === "string") {
    bonus = parseInt(bonus);
  }
  firestore
    .collection("users")
    .doc("0")
    .collection("characters")
    .doc("0")
    .set(
      {
        skillAreas: {
          [bonusName]: bonus
        }
      },
      { merge: true }
    );
};

const SkillAreas = props => {
  const save = firestoreSave(props.firestore);

  const [academicBonus, setAcademicBonus] = useState(props.academic);
  const [armsBonus, setArmsBonus] = useState(props.arms);
  const [athleticBonus, setAthleticBonus] = useState(props.athletic);
  const [baseBonus, setBaseBonus] = useState(props.base);
  const [bodyBonus, setBodyBonus] = useState(props.body);
  const [concentrationBonus, setConcentrationBonus] = useState(
    props.concentration
  );
  const [deadlyBonus, setDeadlyBonus] = useState(props.deadly);
  const [directedBonus, setDirectedBonus] = useState(props.directed);
  const [generalBonus, setGeneralBonus] = useState(props.general);
  const [linguisticBonus, setLinguisticBonus] = useState(props.linguistic);
  const [magicalBonus, setMagicalBonus] = useState(props.magical);
  const [medicalBonus, setMedicalBonus] = useState(props.medical);
  const [outdoorBonus, setOutdoorsBonus] = useState(props.outdoor);
  const [perceptionBonus, setPerceptionBonus] = useState(props.perception);
  const [socialBonus, setSocialBonus] = useState(props.social);
  const [subterfugeBonus, setSubterfugeBonus] = useState(props.subterfuge);
  const [level, setLevel] = useState(
    props.calculateLevelFromExp(props.experience)
  );

  return (
    <Wrapper>
      <Table>
        <tbody>
          <tr>
            <td>Skill Area</td>
            <td>Bonus</td>
            <td>Total</td>
          </tr>
          <tr>
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
                  save(e.target.value, "outdoors");
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
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default SkillAreas;
