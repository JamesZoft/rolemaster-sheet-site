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
import { firebase } from "firebase/app";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

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
  0: 0,
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

const calculateLevelFromExpPartial = xpLevelMap => exp => {
  const levelsUnderXp = Object.keys(xpLevelMap).filter(el => {
    return el <= exp;
  });
  levelsUnderXp.pop();
  return xpLevelMap[levelsUnderXp[levelsUnderXp.length - 1]] || 0;
};

const calculateStatBonusFromStat = stat => {
  const statBonusMapKeys = Object.keys(statBonusMap);
  if (stat > statBonusMapKeys[statBonusMapKeys.length - 1]) {
    return (stat - 100) * 5 + 25;
  }
  const levelsUnderStat = Object.keys(statBonusMap).filter(el => el <= stat);
  return statBonusMap[levelsUnderStat[levelsUnderStat.length - 1]];
};

const FrontPage = props => {
  const [value, loading, collErr] = useDocument(
    props.firestore
      .collection("users")
      .doc("0")
      .collection("characters")
      .doc("0"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  const a = 1;
  if (!value) {
    return <Fragment>{loading && <div>Loading data...</div>}</Fragment>;
  } else {
    let data = value.data();
    const racialStatBonuses = raceStatBonuses[data.fluffStats.race];
    const calculateLevelFromExp = calculateLevelFromExpPartial(xpLevelMap);

    Object.keys(data.mainStats).forEach((stat, i) => {
      data.mainStats[stat].statBonus = calculateStatBonusFromStat(
        data.mainStats[stat].current
      );
      data.mainStats[stat].racialBonus = racialStatBonuses[i];
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
              xpLevelMap={xpLevelMap}
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
  }
};

export default FrontPage;
