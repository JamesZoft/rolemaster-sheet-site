import React, {Fragment} from 'react';
import GridTable from './gridTable';
import firebase from "firebase/app";

const deleteListPartial = (firestore) => name => {
    if (!window.confirm(`Are you sure you want to delete the magic list ${name}?`)) {
      return;
    }
  
    firestore
      .collection("users")
      .doc("james@jamesreed.name")
      .collection("characters")
      .doc("0").update({
        [`magicListsDev.${name}`]: firebase.firestore.FieldValue.delete()
      })
  }

const SpellDev = ({magicListsDev, spellListsSkill, primaryStatTotalBonus, spellListsTotalSkillRanks, firestore}) => {
    const factors = spellListsTotalSkillRanks > 0 ? spellListsTotalSkillRanks < 20 ? spellListsTotalSkillRanks : 20 : 0;
    const deleteList = deleteListPartial(firestore);

    return (
        <GridTable numCols={7} numTitleRows={2}>
            <div>Spell Development</div><div></div><div>Spell Cost</div><div>1</div><div></div><div></div><div></div>
            <div>List</div><div>Pick</div><div>Factors</div><div>Value</div><div>Stat add</div><div>Chance %</div><div>Actions</div>
            {spellListsSkill && 
                Object
                    .keys(magicListsDev)
                    .sort((a, b) => magicListsDev[a].order - magicListsDev[b].order)
                    .map(name => {
                        return (
                            <Fragment key={`spellDevList_${name}`}>
                                <div>{name}</div><div>{magicListsDev[name].pick}</div><div>{factors}</div><div>{factors * 5}</div><div>{primaryStatTotalBonus}</div><div>{(factors * 5) + primaryStatTotalBonus}</div><div><button onClick={() => deleteList(name)}>Delete</button></div>
                            </Fragment>
                        );
                    })}
            
            
                    
        
        </GridTable>
    );
};

export default SpellDev;