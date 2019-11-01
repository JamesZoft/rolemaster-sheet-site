import React from 'react';
import MagicListTable from './magicListTable';
import styled from 'styled-components';
import SpellDev from './spellDev';
import GridTable from './gridTable';

const Button = styled.button`
    width: 100px;
    height: 100px;
    display: block;
    margin: 10px;
`;


const firestoreSave = (firestore, magicLists) => (name, spellList) => {
    magicLists[name] = spellList
    
  
    firestore
      .collection("users")
      .doc("james@jamesreed.name")
      .collection("characters")
      .doc("0")
      .set(
        {
          magicLists: magicLists
        },
        { merge: true }
      );
  };

const MagicSheet = ({magicLists, magicListsDev, skills, mainStats, fluffStats, firestore}) => {
    const spellListsSkill = skills["Spell Lists"];
    const primaryStatTotalBonus = mainStats[fluffStats.primaryStat].statBonus || 0 + mainStats[fluffStats.primaryStat].racialBonus || 0 + mainStats[fluffStats.primaryStat].otherBonus || 0;
    const save = firestoreSave(firestore, magicLists);

    return (
        <>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <MagicListTable magicLists={magicLists} spellListsSkill={spellListsSkill}/>
                </div>
                <div>
                    <Button>Add Spell List</Button>
                    <Button>Colour Spell Lists</Button>
                    <Button>Sort Spell Lists</Button>
                </div>
            </div>
            <div>
                <SpellDev primaryStatTotalBonus={primaryStatTotalBonus} magicListsDev={magicListsDev} spellListsSkill={spellListsSkill} />
            </div>
            <GridTable numCols={3}>
                <div>Spell Casting Time</div><div>From</div><div>To</div>
                <div>One Round</div><div>1</div><div>3</div>
                <div style={{backgroundColor: 'yellow'}}>Two Rounds</div><div style={{backgroundColor: 'yellow'}}>4</div><div style={{backgroundColor: 'yellow'}}>6</div>
                <div style={{backgroundColor: 'lightblue'}}>Three Rounds</div><div style={{backgroundColor: 'lightblue'}}>7</div><div style={{backgroundColor: 'lightblue'}}>9</div>
            </GridTable>
        </>
    )
};

export default MagicSheet;