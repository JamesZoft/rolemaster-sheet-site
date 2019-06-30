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

const SkillAreas = props => {
  const [academicBonus, setAcademicBonus] = useState(0);
  const [armsBonus, setArmsBonus] = useState(0);
  const [athleticBonus, setAthleticBonus] = useState(0);
  const [baseBonus, setBaseBonus] = useState(0);
  const [bodyBonus, setBodyBonus] = useState(0);
  const [concentrationBonus, setConcentrationBonus] = useState(0);
  const [deadlyBonus, setDeadlyBonus] = useState(0);
  const [directedBonus, setDirectedBonus] = useState(0);
  const [generalBonus, setGeneralBonus] = useState(0);
  const [linguisticBonus, setLinguisticBonus] = useState(0);
  const [magicalBonus, setMagicalBonus] = useState(0);
  const [medicalBonus, setMedicalBonus] = useState(0);
  const [outdoorBonus, setOutdoorsBonus] = useState(0);
  const [perceptionBonus, setPerceptionBonus] = useState(0);
  const [socialBonus, setSocialBonus] = useState(0);
  const [subterfugeBonus, setSubterfugeBonus] = useState(0);

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
                onChange={setAcademicBonus}
              />
            </td>
            <td>{academicBonus * props.level}</td>
          </tr>
          <tr>
            <td>Arms</td>
            <td>
              <input
                type="number"
                id="armsBonus"
                value={armsBonus}
                onChange={setArmsBonus}
              />
            </td>
            <td>{armsBonus * props.level}</td>
          </tr>
          <tr>
            <td>Athletic</td>
            <td>
              <input
                type="number"
                id="athleticBonus"
                value={athleticBonus}
                onChange={setAthleticBonus}
              />
            </td>
            <td>{athleticBonus * props.level}</td>
          </tr>
          <tr>
            <td>Base</td>
            <td>
              <input
                type="number"
                id="baseBonus"
                value={baseBonus}
                onChange={setBaseBonus}
              />
            </td>
            <td>{baseBonus * props.level}</td>
          </tr>
          <tr>
            <td>Body</td>
            <td>
              <input
                type="number"
                id="bodyBonus"
                value={bodyBonus}
                onChange={setBodyBonus}
              />
            </td>
            <td>{bodyBonus * props.level}</td>
          </tr>
          <tr>
            <td>Concentration</td>
            <td>
              <input
                type="number"
                id="concentrationBonus"
                value={concentrationBonus}
                onChange={setConcentrationBonus}
              />
            </td>
            <td>{concentrationBonus * props.level}</td>
          </tr>
          <tr>
            <td>Deadly</td>
            <td>
              <input
                type="number"
                id="deadlyBonus"
                value={deadlyBonus}
                onChange={setDeadlyBonus}
              />
            </td>
            <td>{deadlyBonus * props.level}</td>
          </tr>
          <tr>
            <td>Directed</td>
            <td>
              <input
                type="number"
                id="directedBonus"
                value={directedBonus}
                onChange={setDirectedBonus}
              />
            </td>
            <td>{directedBonus * props.level}</td>
          </tr>
          <tr>
            <td>General</td>
            <td>
              <input
                type="number"
                id="genralBonus"
                value={generalBonus}
                onChange={setGeneralBonus}
              />
            </td>
            <td>{generalBonus * props.level}</td>
          </tr>
          <tr>
            <td>Linguistic</td>
            <td>
              <input
                type="number"
                id="linguisticBonus"
                value={linguisticBonus}
                onChange={setLinguisticBonus}
              />
            </td>
            <td>{linguisticBonus * props.level}</td>
          </tr>
          <tr>
            <td>Magical</td>
            <td>
              <input
                type="number"
                id="magicalBonus"
                value={magicalBonus}
                onChange={setMagicalBonus}
              />
            </td>
            <td>{magicalBonus * props.level}</td>
          </tr>
          <tr>
            <td>Medical</td>
            <td>
              <input
                type="number"
                id="medicalBonus"
                value={medicalBonus}
                onChange={setMedicalBonus}
              />
            </td>
            <td>{medicalBonus * props.level}</td>
          </tr>
          <tr>
            <td>Outdoor</td>
            <td>
              <input
                type="number"
                id="outdoorBonus"
                value={outdoorBonus}
                onChange={setOutdoorsBonus}
              />
            </td>
            <td>{outdoorBonus * props.level}</td>
          </tr>
          <tr>
            <td>Perception</td>
            <td>
              <input
                type="number"
                id="perceptionBonus"
                value={perceptionBonus}
                onChange={setPerceptionBonus}
              />
            </td>
            <td>{perceptionBonus * props.level}</td>
          </tr>
          <tr>
            <td>Social</td>
            <td>
              <input
                type="number"
                id="socialBonus"
                value={socialBonus}
                onChange={setSocialBonus}
              />
            </td>
            <td>{socialBonus * props.level}</td>
          </tr>
          <tr>
            <td>Subterfuge</td>
            <td>
              <input
                type="number"
                id="subterfugeBonus"
                value={subterfugeBonus}
                onChange={setSubterfugeBonus}
              />
            </td>
            <td>{subterfugeBonus * props.level}</td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default SkillAreas;
