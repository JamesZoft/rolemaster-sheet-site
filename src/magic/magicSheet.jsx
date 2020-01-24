import React, {useState} from 'react';
import MagicListTable from './magicListTable';
import styled from 'styled-components';
import SpellDev from './spellDev';
import GridTable from './gridTable';
import ChooseMagicUpgradeAction from './chooseMagicUpgradeAction';
import { getTotalSkillRanks } from '../shared/skills';

const Button = styled.button`
    width: 100px;
    height: 100px;
    display: block;
    margin: 10px;
`;

const MagicSheet = ({magicLists, magicListsDev, skills, mainStats, fluffStats, firestore}) => {
    const spellListsSkill = skills["Spell Lists"];
    const primaryStatTotalBonus = mainStats[fluffStats.primaryStat].statBonus || 0 + mainStats[fluffStats.primaryStat].racialBonus || 0 + mainStats[fluffStats.primaryStat].otherBonus || 0;
    const spellListsTotalSkillRanks = getTotalSkillRanks(spellListsSkill.levelRanks, spellListsSkill.giving);

    const [showUpgradePopup, setShowUpgradePopup] = useState(false);

    return (
        <>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <MagicListTable magicLists={magicLists} firestore={firestore} spellListsSkill={spellListsSkill}/>
                </div>
                <div>
                    <Button onClick={() => setShowUpgradePopup(true)}>Add Spell List</Button>
                </div>
            </div>
            <div>
                <SpellDev 
                    firestore={firestore}
                    primaryStatTotalBonus={primaryStatTotalBonus} 
                    magicListsDev={magicListsDev} 
                    spellListsSkill={spellListsSkill} 
                    
                />
            </div>
            <GridTable numCols={3}>
                <div>Spell Casting Time</div><div>From</div><div>To</div>
                <div>One Round</div><div>1</div><div>3</div>
                <div style={{backgroundColor: 'yellow'}}>Two Rounds</div><div style={{backgroundColor: 'yellow'}}>4</div><div style={{backgroundColor: 'yellow'}}>6</div>
                <div style={{backgroundColor: 'lightblue'}}>Three Rounds</div><div style={{backgroundColor: 'lightblue'}}>7</div><div style={{backgroundColor: 'lightblue'}}>9</div>
            </GridTable>
            <div>
                <ChooseMagicUpgradeAction 
                    showUpgradePopup={showUpgradePopup}
                    setShowUpgradePopup={setShowUpgradePopup}
                    spellListsTotalSkillRanks={spellListsTotalSkillRanks}
                    magicLists={magicLists}
                    magicListsDev={magicListsDev}
                    firestore={firestore}
                />
            </div>
        </>
    )
};

export default MagicSheet;