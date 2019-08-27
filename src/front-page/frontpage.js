import React, { Fragment } from "react";
import ClassExp from "./class-exp";
import MainInfo from "./main-info";
import Resists from "./resists";
import Languages from "./languages";
import SkillAreas from "./skill-areas";
import PrimarySecondaryRealm from "./primary-secondary-realm";
import Movement from "./movement";
import Defenses from "./defenses";
import Magic from "./magic";
import Stats from "./stats";
import styled from "styled-components";
import Health from "./health";
import raceStatBonuses from "./raceStatBonuses.json";
import { useDocument } from "react-firebase-hooks/firestore";
import calculateLevelFromExp from "../level";

const Section = styled.div`
    display: flex;
    & > * {
      flex: 1;
    }
    > *:not(:nth-child(1)) {
      margin-left: 50px;
    }
    margin-bottom: 50px;
  `,
  ColSection = styled(Section)`
    flex-direction: column;
  `;

const statBonusMap = {
  0: -30,
  1: -25,
  2: -20,
  3: -15,
  5: -10,
  10: -5,
  15: -5,
  25: 0,
  40: 0,
  60: 0,
  75: 5,
  85: 5,
  90: 10,
  95: 15,
  98: 20,
  100: 25,
  101: 30,
  102: 35,
  103: 40,
  104: 45,
  105: 50,
  106: 55,
  107: 60,
  108: 65,
  109: 70,
  110: 75,
  111: 80,
  112: 85
};

const statDevPointsMap = {
  "1": 1,
  "2": 1,
  "3": 1,
  "5": 2,
  "10": 2,
  "15": 3,
  "25": 4,
  "40": 5,
  "60": 6,
  "75": 7,
  "85": 8,
  "90": 8,
  "95": 9,
  "98": 9,
  "100": 10,
  "101": 10,
  "102": 11,
  "103": 11,
  "104": 12,
  "105": 12,
  "106": 13,
  "107": 13,
  "108": 14,
  "109": 14,
  "110": 15,
  "111": 15,
  "112": 16
};

const calculateStatBonusFromStat = stat => {
  const statBonusMapKeys = Object.keys(statBonusMap);
  if (stat > statBonusMapKeys[statBonusMapKeys.length - 1]) {
    return (stat - 100) * 5 + 25;
  }
  const levelsUnderStat = Object.keys(statBonusMap).filter(el => el <= stat);
  return statBonusMap[levelsUnderStat[levelsUnderStat.length - 1]];
};

const calculateDPsFromStat = stat => {
  const statBonusMapKeys = Object.keys(statDevPointsMap);
  if (stat > statBonusMapKeys[statBonusMapKeys.length - 1]) {
    return 16;
  }
  const levelsUnderStat = Object.keys(statDevPointsMap).filter(
    el => el <= stat
  );
  return statDevPointsMap[levelsUnderStat[levelsUnderStat.length - 1]];
};

const FrontPage = props => {
  const data = props.data;

  const racialStatBonuses = raceStatBonuses[data.fluffStats.race];

  Object.keys(data.mainStats).forEach((stat, i) => {
    data.mainStats[stat].statBonus = calculateStatBonusFromStat(
      data.mainStats[stat].current
    );
    data.mainStats[stat].racialBonus = racialStatBonuses[i];
  });

  ["co", "ag", "sd", "me", "re", "pr"].forEach((stat, i) => {
    data.mainStats[stat].dps = calculateDPsFromStat(
      data.mainStats[stat].current
    );
  });

  return (
    <Fragment>
      <Fragment>
        <Section>
          <MainInfo {...data.fluffStats} firestore={props.firestore} />
          <ClassExp
            calculateLevelFromExp={calculateLevelFromExp}
            charClass={data.charClass}
            experience={data.experience}
            race={data.fluffStats.race}
            firestore={props.firestore}
          />
        </Section>
        <Section>
          <Stats {...data.mainStats} firestore={props.firestore} />
        </Section>
        <Section>
          <Resists
            stats={data.mainStats}
            resists={data.resists}
            race={data.fluffStats.race}
            firestore={props.firestore}
          />
          <Languages languages={data.languages} firestore={props.firestore} />
        </Section>
        <Section>
          <SkillAreas
            calculateLevelFromExp={calculateLevelFromExp}
            firestore={props.firestore}
            experience={data.experience}
            {...data.skillAreas}
          />
          <ColSection>
            <PrimarySecondaryRealm
              primaryStat={data.fluffStats.primaryStat}
              secondaryStat={data.fluffStats.secondaryStat}
              realm={data.fluffStats.realm}
            />
            <Movement {...data.movement} firestore={props.firestore} />
            <Defenses
              firestore={props.firestore}
              quBonus={data.mainStats.qu.statBonus}
              defenses={data.defenses}
            />
            <Magic
              calculateLevelFromExp={calculateLevelFromExp}
              mult={1}
              stats={data.mainStats}
              primaryStat={data.fluffStats.primaryStat}
              realm="essence"
              experience={data.experience}
              {...data.magic}
            />
          </ColSection>
        </Section>
        <Section>
          <Health
            rolled={data.health.rolled}
            firestore={props.firestore}
            race="Dwarf"
            bodyDevRanks={5}
            con={data.mainStats.co.current}
            bodySkill={data.skillAreas.body}
            conBonus={10}
          />
        </Section>
      </Fragment>
    </Fragment>
  );
};

export default FrontPage;
