import React from 'react';

const Modal = ({children}) => {
  return (
    <>
      <div style={{width: '100vw', height: '100vh', backgroundColor: 'black', opacity: 0.7, position: 'absolute', left: 0, top: 0}} />
      <div style={{position: 'absolute', left: '40vw', top: '40vh', backgroundColor: 'white', padding: 20}}>{children}</div>
    </>
  )
};

export default Modal;