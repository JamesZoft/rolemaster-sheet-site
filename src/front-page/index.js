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

const xpLevelMap = {
  10000: 1,
  20000: 2,
  30000: 3,
  40000: 4,
  50000: 5,
  70000: 6,
  90000: 7,
  110000: 8,
  130000: 9,
  150000: 10,
  180000: 11,
  210000: 12,
  240000: 13,
  270000: 14,
  300000: 15,
  340000: 16,
  380000: 17,
  420000: 18,
  460000: 19,
  500000: 20,
  550000: 21,
  600000: 22,
  650000: 23,
  700000: 24,
  750000: 25,
  800000: 26,
  850000: 27,
  900000: 28,
  950000: 29,
  1000000: 30
};

const statBonusMap = {
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

const calculateLevelFromExp = exp => {
  const levelsUnderXp = Object.keys(xpLevelMap).filter(el => el <= exp);
  return xpLevelMap[levelsUnderXp[levelsUnderXp.length - 1]];
};

const calculateStatBonusFromStat = stat => {
  const levelsUnderStat = Object.keys(xpLevelMap).filter(el => el <= stat);
  return statBonusMap[levelsUnderStat[levelsUnderStat.length - 1]];
};

const FrontPage = props => {
  const level = calculateLevelFromExp(props.experience);
  Object.keys(props.mainStats).forEach(
    stat =>
      (props.mainStats[stat].statBonus = calculateStatBonusFromStat(
        stat.current
      ))
  );

  return (
    <Fragment>
      <Section>
        <MainInfo name={props.fluffStats.name} />
        <ClassExp />
      </Section>
      <Section>
        <Stats {...props.mainStats} />
      </Section>
      <Section>
        <Resists stats={props.mainStats} resists={props.resists} />
        <Languages languages={props.languages} />
      </Section>
      <Section>
        <SkillAreas level={level} />
        <ColSection>
          <PrimarySecondaryRealm
            primaryStat={props.fluffStats.primaryStat}
            secondaryStat={props.fluffStats.secondaryStat}
            realm={props.fluffStats.realm}
          />
          <Movement {...props.movement} />
          <Defenses
            quBonus={props.mainStats.qu.statBonus}
            defenses={props.defenses}
          />
          <Magic
            level={level}
            mult={1}
            pr={4}
            primaryStatValue={80}
            realm="essence"
            {...props.magic}
          />
        </ColSection>
      </Section>
      <Section>
        <Health
          rolled={props.health.rolled}
          race="Dwarf"
          bodyDevRanks={5}
          con={props.mainStats.co.current}
          bodySkill={props.skillAreas.body}
          conBonus={10}
        />
      </Section>
    </Fragment>
  );
};

export default FrontPage;
