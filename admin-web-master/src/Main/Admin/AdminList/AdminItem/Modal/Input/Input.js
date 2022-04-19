import React, { useEffect, useRef, useState } from "react";
import './Input.scss';

function Input({ title = '', value, setValue }) {

  return (
    <div className='admin-manage-modal-input'>
      <div className='admin-manage-modal-input-title'>{title}</div>
      <input className='admin-manage-modal-input-box'
        value={value} onChange={(e) => {
            setValue(e.target.value)
        }}/>
    </div>
  );
};

export default Input;
