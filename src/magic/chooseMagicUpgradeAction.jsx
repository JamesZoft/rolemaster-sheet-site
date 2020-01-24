import React, { useState } from 'react';
import InputLabel from '../shared/inputLabel';
import lists from './magicLists.json';
import Modal from 'react-responsive-modal';

const promoteListPartial = (firestore, magicListsDev, magicLists) =>  (name, pick) => () => {
  delete magicListsDev[name];

  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        magicListsDev
      },
      { merge: true }
    );

    const listInfo = lists[name];
    magicLists[name] = {
      origin: listInfo.source,
      realm: listInfo.realm,
      type: listInfo.base,
      pick,
      levelKnownTo: getLevelKnownToFromPick(pick, magicLists[name] ? magicLists[name].levelKnownTo : 0)
    };
    
    firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        magicLists
      },
      { merge: true }
    );
}

const getLevelKnownToFromPick = (pick, levelKnownToLast) => {
  switch (pick) {
    case 'A': 
      return 5;
    case 'B':
      return 10;
    case 'C':
      return 15;
    case 'D':
      return 20;
    case 'E':
      return levelKnownToLast < 25 ? 25 : levelKnownToLast + 5;
    default:
      throw new Error('');
  }
}

const developListPartial = (firestore, magicLists) => (name, pick) => () => {
  const listInfo = lists[name];
  magicLists[name] = {
    origin: listInfo.source,
    realm: listInfo.realm,
    type: listInfo.base,
    levelKnownTo: getLevelKnownToFromPick(pick, 0),
    pick
  };

  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        magicLists
      },
      { merge: true }
    );
};

const learnListPartial = (firestore, magicListsDev, setShowUpgradePopup) => (name, pick) => () => {
  if (Object.keys(magicListsDev).length > 0) {
    alert('Cannot learn another list whilst one is in development - either promote it, delete it, or choose the \'2nd\' option.');
    setShowUpgradePopup(false);
    return;
  }
  saveLearnList(firestore, magicListsDev)(name, pick)();
};

const saveLearnList = (firestore, magicListsDev) => (name, pick) => () => {

  magicListsDev[name] = {
    pick,
    order: Object.keys(magicListsDev).length + 1,
  };

  firestore
    .collection("users")
    .doc("james@jamesreed.name")
    .collection("characters")
    .doc("0")
    .set(
      {
        magicListsDev
      },
      { merge: true }
    );
}

const ChooseMagicUpgradeAction = ({firestore, magicLists, magicListsDev, spellListsTotalSkillRanks, setShowUpgradePopup, showUpgradePopup}) => {
  const [upgradeType, setUpgradeType] = useState('learn');
  const [okAction, setOkAction] = useState(null);
  const [spellListSelected, setSpellListSelected] = useState('');
  const isFullSpellcaster = true;
  const [pick, setPick] = useState('B');
  const picks = isFullSpellcaster ? ['B', 'D', 'E'] : ['A', 'C', 'E'];

  const listsToLearnOrDevelop = {...lists};
  Object.keys(listsToLearnOrDevelop).forEach(k => {
    if (Object.keys(magicLists).indexOf(k) > -1 || Object.keys(magicListsDev).indexOf(k) > -1) {
      delete listsToLearnOrDevelop[k];
    }
  })

  const developList = developListPartial(firestore, magicLists)
  const promoteList = promoteListPartial(firestore, magicListsDev, magicLists)
  const learnList = learnListPartial(firestore, magicListsDev, setShowUpgradePopup)
  const learn2ndList = saveLearnList(firestore, magicListsDev);

  const nextPick = isFullSpellcaster ? 'D' : 'C';

  return (
    <>
      <Modal open={showUpgradePopup} center onClose={() => setShowUpgradePopup(false)}>
        <div style={{marginBottom: 10}}>
          <InputLabel
            checked={upgradeType === 'learn'} 
            onClick={e => {
              setUpgradeType(e.target.value);
              setOkAction(() => learnList(spellListSelected, pick));
            }} 
            name="magicUpgrade" 
            value="learn"
            id="magicUpgradeLearn"
            labelText="Learn"
          />
          <InputLabel
            checked={upgradeType === '2nd'}
            onClick={e => {
              setUpgradeType(e.target.value)
              setOkAction(() => learn2ndList(spellListSelected, pick));
            }}
            name="magicUpgrade" 
            disabled={spellListsTotalSkillRanks <= 20} 
            value="2nd"
            id="magicUpgrade2nd"
            labelText="2nd"
          />
          <InputLabel
            checked={upgradeType === 'develop'}
            onClick={e => {
              setUpgradeType(e.target.value)
              setOkAction(() => developList(spellListSelected, pick));
            }}  
            name="magicUpgrade" 
            value="develop"
            id="magicUpgradeDevelop"
            labelText="Develop"
          />
          <InputLabel
            checked={upgradeType === 'promote'} 
            onClick={e => {
              setUpgradeType(e.target.value)
              setOkAction(() => promoteList(spellListSelected, pick))
            }} 
            name="magicUpgrade" 
            value="promote"
            id="magicUpgradePromote"
            labelText="Promote"
          />
          {upgradeType === 'learn' && (
            <>
              <div style={{marginBottom: 10, marginTop: 10}}>
              <select onChange={e => {
                  const val = e.target.value;
                  setSpellListSelected(e.target.value)
                  setOkAction(() => learnList(val, pick))
                }} value={spellListSelected}>
                  <option value=""></option>
                  {Object.entries(listsToLearnOrDevelop).map(([name, list]) => 
                    <option key={`learnList${name}`} value={name}>
                      {`${name} - ${list.realm} - ${list.base} - ${list.source}`}
                    </option>
                  )}
                </select>
              </div>
              <h5>Pick: </h5>
              {picks.map(availablePick => 
                <InputLabel 
                  key={`chooseLearnPick${availablePick}`} 
                  checked={pick === availablePick} 
                  onClick={e => {
                    const val = e.target.value;
                    setPick(val)
                    setOkAction(() => learnList(spellListSelected, val));
                  }} 
                  type="radio" 
                  name="learnPick" 
                  value={availablePick}
                  id={`chooseLearnPick${availablePick}`}
                  labelText={availablePick}
                />)}
            </>
          )}

          {upgradeType === '2nd' && (
            <>
              <div style={{marginBottom: 10, marginTop: 10}}>
              <select onChange={e => {
                  const val = e.target.value;
                  setSpellListSelected(e.target.value)
                  setOkAction(() => learn2ndList(val, pick))
                }} value={spellListSelected}>
                  <option value=""></option>
                  {Object.entries(listsToLearnOrDevelop).map(([name, list]) => 
                    <option key={`learn2ndList${name}`} value={name}>
                      {`${name} - ${list.realm} - ${list.base} - ${list.source}`}
                    </option>
                  )}
                </select>
              </div>
              <h5>Pick: </h5>
              {picks.map(availablePick => 
                <InputLabel 
                  key={`chooseLearn2ndPick${availablePick}`} 
                  checked={pick === availablePick} 
                  onClick={e => {
                    const val = e.target.value;
                    setPick(val)
                    setOkAction(() => learn2ndList(spellListSelected, val));
                  }} 
                  type="radio" 
                  name="learnPick" 
                  value={availablePick}
                  id={`chooseLearn2ndPick${availablePick}`}
                  labelText={availablePick}
                />)}
            </>
          )}

          {upgradeType === 'promote' && 
            <>
              <div style={{marginBottom: 10, marginTop: 10}}>
                <select onChange={e => {
                  const val = e.target.value;
                  setSpellListSelected(e.target.value)
                  setOkAction(() => promoteList(val, pick))
                }} value={spellListSelected}>
                  <option value=""></option>
                  {Object.entries(magicListsDev).map(([name, list]) => 
                    <option key={`promoteList${name}`} value={name}>{name}</option>
                  )}
                </select>
              </div>
              <div style={{marginBottom: 10}}>
                Pick: 
                {[nextPick, 'E'].map(availablePick => 
                  <InputLabel key={`promotePick${availablePick}`} checked={pick === availablePick} 
                    onClick={e => { 
                      const val = e.target.value;
                      setPick(val)
                      setOkAction(() => promoteList(spellListSelected, val))
                    }} 
                    type="radio" 
                    name="choosePick" 
                    value={availablePick}
                    id={`choosePick${availablePick}`}
                    labelText={availablePick}
                  />
                )}
              </div>
            </>
          }
        </div>
        {upgradeType === 'develop' && 
          <select value={spellListSelected} 
            onChange={e => {
              const val = e.target.value;
              setSpellListSelected(val)
              setOkAction(() => developList(val, pick));
            }} 
            style={{marginBottom: 10}}
          >
            <option value=""></option>
            {Object.entries(listsToLearnOrDevelop).map(([name, list]) => {
              return (
                <option key={`magiclist_${name}`} value={name}>
                  {`${name} - ${list.realm} - ${list.base} - ${list.source}`}
                </option>
              )
            })}
          </select>
        }
        {upgradeType === 'develop' && (<div style={{marginBottom: 10}}>
          <>
            <h5>Pick: </h5>
            {picks.map(availablePick => 
              <InputLabel 
                key={`chooseDevelopPick${availablePick}`} 
                checked={pick === availablePick} 
                onClick={e => {
                  const val = e.target.value;
                  setPick(val)
                  setOkAction(() => developList(spellListSelected, val));
                }} 
                type="radio" 
                name="developPick" 
                value={availablePick}
                id={`chooseDevelopPick${availablePick}`}
                labelText={availablePick}
              />)}
          </>
        </div>)}
        <div>
          <button onClick={okAction}>Ok</button>
        </div>
      </Modal>
    </>
  )
};

export default ChooseMagicUpgradeAction;