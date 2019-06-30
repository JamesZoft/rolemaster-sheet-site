import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;

const raceDiceTypeMap = {
  Dwarf: "D10",
  "Elf - Aquatic": "D8",
  "Elf - Dark": "D8",
  "Elf - Grey": "D8",
  "Elf - High (ME)": "D8",
  "Elf - Noldor": "D10",
  "Elf - Sindar": "D8",
  "Elf - Silvan": "D8",
  "Elf - Teleri": "D8",
  "Great Man": "D20",
  "Half-Elf A": "D10",
  "Half-Elf B": "D10",
  "Half-Elf C": "D10",
  "Half-Elf D": "D10",
  "Half-Elf E": "D10",
  "Half-Elf F": "D15",
  "Half-Ogre": "D10",
  "Half-Orc A": "D10",
  "Half-Troll": "D16",
  "Half-Uruk": "D10",
  "High Man": "D10",
  "High Man - Dark Numenorean": "D10",
  "High Man - Dunadan": "D10",
  "Hobbit - Fallohide": "D8",
  "Hobbit - Harfoot": "D8",
  "Hobbit - Stoor": "D10",
  "Man - Chy": "D8",
  "Man - Common": "D8",
  "Man - Dorwinadan (CB)": "D8",
  "Man - Dorwinadan": "D10",
  "Man - Dunlending(CB)": "D8",
  "Man - Dunlending": "D8",
  "Man - Dusheran": "D8",
  "Man - Dyrian": "D8",
  "Man - Easterling": "D8",
  "Man - Haradan": "D8",
  "Man - Lossadan": "D8",
  "Man - Rural": "D8",
  "Man - Urban": "D8",
  "Man - Variag": "D8",
  "Mixed Man": "D10",
  "Mixed Man - Corsair(CB)": "D10",
  "Mixed Man - Corsair": "D10",
  Mutant: "D12",
  "NorthMan - Beorning": "D10",
  "NorthMan - Rohirrim": "D10",
  "NorthMan - Woodsman": "D8",
  Nurniag: "D8",
  "Old Dark Man - Womaw": "D10",
  "Olog Hai": "D20",
  "Orc - Black Forge": "D8",
  "Orc - Black Wood": "D8",
  "Orc - Blue Nose": "D8",
  "Orc - Deep": "D10",
  "Orc - Greater": "D10",
  "Orc - Grey Mountain": "D8",
  "Orc - High Old": "D8",
  "Orc - Lesser": "D8",
  "Orc - Moon": "D8",
  "Orc - Red Eye": "D10",
  "Orc - Red Sand": "D10",
  "Orc - Silent Watch": "D8",
  "Orc - Tribeless": "D8",
  "Orc - Wolf": "D8",
  "Troll - Generic": "D10",
  "Half-Dwarves": "D10",
  Umli: "D8",
  "Uruk Hai": "D10",
  "Vulmi-Shaitan mix": "D10",
  "Wose (CB)": "D10",
  Wose: "D8",
  Centaur: "D8",
  "Hira'Razhir": "D6",
  "New Race Idiyva": "D8",
  "New Race Sohleugir": "D10",
  "Stoi'isslythi": "D8"
};

const raceMaxHitsRolledMap = {
  Dwarf: 120,
  "Elf - Aquatic": 110,
  "Elf - Dark": 110,
  "Elf - Grey": 120,
  "Elf - High (ME)": 120,
  "Elf - Noldor": 120,
  "Elf - Sindar": 110,
  "Elf - Silvan": 100,
  "Elf - Teleri": 100,
  "Great Man": 300,
  "Half-Elf A": 150,
  "Half-Elf B": 130,
  "Half-Elf C": 150,
  "Half-Elf D": 150,
  "Half-Elf E": 120,
  "Half-Elf F": 300,
  "Half-Ogre": 200,
  "Half-Orc A": 130,
  "Half-Troll": 280,
  "Half-Uruk": 135,
  "High Man": 150,
  "High Man - Dark Numenorean": 150,
  "High Man - Dunadan": 150,
  "Hobbit - Fallohide": 90,
  "Hobbit - Harfoot": 80,
  "Hobbit - Stoor": 110,
  "Man - Chy": 135,
  "Man - Common": 120,
  "Man - Dorwinadan (CB)": 120,
  "Man - Dorwinadan": 135,
  "Man - Dunlending(CB)": 120,
  "Man - Dunlending": 120,
  "Man - Dusheran": 120,
  "Man - Dyrian": 130,
  "Man - Easterling": 120,
  "Man - Haradan": 120,
  "Man - Lossadan": 120,
  "Man - Rural": 120,
  "Man - Urban": 120,
  "Man - Variag": 120,
  "Mixed Man": 135,
  "Mixed Man - Corsair(CB)": 135,
  "Mixed Man - Corsair": 135,
  Mutant: 240,
  "NorthMan - Beorning": 150,
  "NorthMan - Rohirrim": 150,
  "NorthMan - Woodsman": 120,
  Nurniag: 120,
  "Old Dark Man - Womaw": 150,
  "Olog Hai": 350,
  "Orc - Black Forge": 120,
  "Orc - Black Wood": 120,
  "Orc - Blue Nose": 120,
  "Orc - Deep": 130,
  "Orc - Greater": 120,
  "Orc - Grey Mountain": 120,
  "Orc - High Old": 80,
  "Orc - Lesser": 80,
  "Orc - Moon": 120,
  "Orc - Red Eye": 130,
  "Orc - Red Sand": 135,
  "Orc - Silent Watch": 100,
  "Orc - Tribeless": 80,
  "Orc - Wolf": 120,
  "Troll - Generic": 250,
  "Half-Dwarves": 120,
  Umli: 100,
  "Uruk Hai": 160,
  "Wose (CB)": 120,
  Wose: 120,
  Centaur: 150,
  "Hira'Razhir": 90,
  "New Race Idiyva": 120,
  "New Race Sohleugir": 160,
  "Stoi'isslythi": 120
};

const Health = props => {
  const [rolled, setRolled] = useState(props.rolled);
  const baseHits = props.con / 10 + 0.9;
  const nPerRank = props.bodyDevRanks * props.bodySkill;
  const basic = Math.floor(baseHits + rolled + nPerRank);
  const conBonus = Math.floor(basic * (props.conBonus / 100));
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <td>Dice Type</td>
            <td>Ranks</td>
            <td>Base Hits</td>
            <td>Rolled</td>
            <td>N per rank</td>
            <td>Basic</td>
            <td>Con. Bonus</td>
            <td>Total</td>
            <td>Racial Max.</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{raceDiceTypeMap[props.race]}</td>
            <td>{props.bodyDevRanks}</td>
            <td>{baseHits}</td>
            <td>
              <input
                type="number"
                value={Math.min(rolled, raceMaxHitsRolledMap[props.race])}
                onChange={setRolled}
              />
            </td>
            <td>{nPerRank}</td>
            <td>{basic}</td>
            <td>{conBonus}</td>
            <td>{basic + conBonus}</td>
            <td>{raceMaxHitsRolledMap[props.race]}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Health;
