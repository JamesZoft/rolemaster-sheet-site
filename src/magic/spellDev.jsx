import React, {Fragment} from 'react';
import GridTable from './gridTable';
import { getTotalSkillRanks } from '../shared/skills';

const SpellDev = ({magicListsDev, spellListsSkill, primaryStatTotalBonus}) => {
    const spellListsTotalSkillRanks = getTotalSkillRanks(spellListsSkill.levelRanks, spellListsSkill.giving);
    const factors = spellListsTotalSkillRanks > 0 ? spellListsTotalSkillRanks < 20 ? spellListsTotalSkillRanks : 20 : 0;
    // const statBonus = spellListsTotalSkillRanks > 20 ? 0 : 
    return (
        <GridTable numCols={6} numTitleRows={2}>
            <div>Spell Development</div><div></div><div>Spell Cost</div><div>1</div><div></div><div></div>
            <div>List</div><div>Pick</div><div>Factors</div><div>Value</div><div>Stat add</div><div>Chance %</div>
            {spellListsSkill && Object.entries(magicListsDev).map(([name, devList]) => {
                return (
                    <Fragment key={`spellDevList_${name}`}>
                        <div>{name}</div><div>{devList.pick}</div><div>{factors}</div><div>{factors * 5}</div><div>{primaryStatTotalBonus}</div><div>{(factors * 5) + primaryStatTotalBonus}</div>
                    </Fragment>
                );
            })}
        
        </GridTable>
    );
};

export default SpellDev;