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
        [`magicLists.${name}`]: firebase.firestore.FieldValue.delete()
      })
  }

const MagicListTable = ({magicLists, firestore}) => {
    const deleteList = deleteListPartial(firestore);
    return (
        <GridTable numCols={6}>
            <div>List Name</div><div>Type</div><div>Origin</div><div>Realm</div><div>Known to</div><div>Actions</div>
            {Object.entries(magicLists).map(([name, list]) =>    
                <Fragment key={`magicList${name}`}>
                    <div>{name}</div><div>{list.type}</div><div>{list.origin}</div><div>{list.realm}</div><div>{list.levelKnownTo}</div><div><button onClick={() => deleteList(name)}>Delete</button></div>
                </Fragment>
            )}
        </GridTable>
    );
};

export default MagicListTable;