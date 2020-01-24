import React, { useState } from 'react';
import Modal from 'react-responsive-modal';

const MassAddSkills = ({addSkill}) => {
  const [show, setShow] = useState(false);
  const [importText, setImportText] = useState('');
  return (
    <>
      
      <div>
        <button onClick={() => setShow(true)}>Mass add skills</button>
      </div>
      <Modal classNames={{modal: 'modal', overlay: 'overlay'}} open={show} center onClose={() => setShow(false)}>
        <p>
          Select your skills you wish to import, starting from the top skill in the <b>Skill</b> column and selecting
          down to the last one above the Total Cost cell. Copy, then paste them into the text box below, then press Ok.
        </p>
        <textarea style={{width: '100%', height: '80%'}} value={importText} onChange={e => setImportText(e.target.value)}></textarea>
        <div>
          <button onClick={() => importText.split('\t').forEach(addSkill)}>Ok</button>
        </div>
      </Modal>
    </>
  )
};

export default MassAddSkills;