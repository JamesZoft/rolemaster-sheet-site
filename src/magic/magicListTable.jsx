import React, {Fragment} from 'react';
import GridTable from './gridTable';

const MagicListTable = ({magicLists}) => {
    
    return (
        <GridTable numCols={5}>
            <div>List Name</div><div>Type</div><div>Origin</div><div>Realm</div><div>Known to</div>
            {Object.entries(magicLists).map(([name, list]) =>    
                <Fragment key={`magicList${name}`}>
                    <div>{name}</div><div>{list.type}</div><div>{list.origin}</div><div>{list.realm}</div><div>{list.levelKnownTo}</div>
                </Fragment>
            )}
        </GridTable>
    );
};

export default MagicListTable;