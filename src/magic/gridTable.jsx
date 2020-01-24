import React from 'react';
import styled from 'styled-components';

const generateGridComponentStyling = (numCols, numTitleRows) => {
    return `
        border: 1px solid black;
        border-left: none;
        &:nth-of-type(${numCols}n+1), &:nth-of-type(1) {
            border: 1px solid black;
        }
        border-top: none !important;
        ${[...Array(numCols * numTitleRows).keys()].map(v => `&:nth-of-type(${v + 1})`).join(', ')} {
            border-top: 1px solid black !important;
            font-weight: bold;
        }
    `;
}

const Div = styled.div`
    > div {
        ${props => generateGridComponentStyling(props.numCols, props.numTitleRows)}
    }
`;

const GridTable = ({numCols, numTitleRows, overrideStyles, children}) => {
    numTitleRows = numTitleRows || 1;
    return (
        <Div {...{numCols, numTitleRows}} style={{display: 'grid', margin: 10, gridTemplateColumns: `${[...Array(numCols).keys()].map(v => 'auto').join(' ')}`, gridTemplateRows: 'auto', overrideStyles}}>
            {children}
        </Div>
    );
};

export default GridTable;