import React from 'react';
import spells from './spells.json'
import GridTable from './gridTable';
import calculateLevelFromExp from '../level'

const createRow = (listsDivided, magicListsSetIdx, rowNum, charLvl) => {
  let lvlNum = 'lvl';
  if (rowNum > 0) {
    switch (rowNum) {
      case 21:
        lvlNum = '25';
        break;
      case 22:
        lvlNum = '30';
        break;
      case 23:
        lvlNum = '50';
        break;
      default:
        lvlNum = rowNum;
        break;
    }
  }
  let backgroundColor = 'white';
  if (parseInt(lvlNum) >= 0 && parseInt(lvlNum)) 
  return (
    <>
      <div>{lvlNum}</div>
      {Object.entries(listsDivided[magicListsSetIdx]).map(([listName, listData]) => {
        if (parseInt(listName) >= 0) {
          return <div></div>
        }
        const a = spells;
        if (rowNum === 0) {
          return (
            <div>
              <b>{listName}</b>
            </div>
          )
        } else {
          return (
            <div>
              {Object.values(spells[listName])[rowNum]}
            </div>
          )
        }
      })}
     
      <div>{lvlNum}</div>
    </>
  )
}

const SpellsSheet = ({ magicLists, experience }) => {
  const level = calculateLevelFromExp(experience);
  const listsDivided = [];

  Object.entries(magicLists).forEach(([listName, listData]) => {
    const makeNewObj = listsDivided.length === 0 || Object.keys(listsDivided[listsDivided.length - 1]).length === 6;
    const listObj =  makeNewObj ? {} : listsDivided[listsDivided.length - 1];

    listObj[listName] = listData;

    if (makeNewObj) {
      listsDivided.push(listObj);
    } else {
      listsDivided[listsDivided.length - 1] = listObj;
    }
  })

  let cnt = 0;
  while (Object.keys(listsDivided[listsDivided.length - 1]).length < 6) {
    listsDivided[listsDivided.length - 1][cnt] = {};
    cnt++;
  };

  return (
    <>
      <GridTable numCols={8}>
        {listsDivided.map((listObj, idx) => 
          [...Array(24).keys()].map(lvl => createRow(listsDivided, idx, lvl, level))
        )}
      </GridTable>
    </>
  )
};

export default SpellsSheet;