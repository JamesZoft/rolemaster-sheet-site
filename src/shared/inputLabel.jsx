import React from 'react';

const InputLabel = ({checked, onClick, name, disabled, value, id, labelText}) => {
  return (
    <>
     <input 
        checked={checked}
        onClick={onClick}
        type="radio" 
        name={name} 
        disabled={disabled} 
        value={value}
        id={id}
      /><label style={{paddingLeft: 5, paddingRight: 10}} htmlFor={id}>{labelText}</label>
    </>
  )
};

export default InputLabel;