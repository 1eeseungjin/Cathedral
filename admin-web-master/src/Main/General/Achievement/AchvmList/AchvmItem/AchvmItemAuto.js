import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './AchvmItemAuto.scss';

function AchvmItemAuto({ props }) {
  const navigate = useNavigate();

  return (
    <div className='achvm-list-table-items-item-auto' onClick={() => navigate('/general/achievement/view/' + props.idx)}>
      <div className='achvm-list-table-items-item-auto-name'>{props.name}</div>
      <div className='achvm-list-table-items-item-auto-type'>{props.typeName}</div>
      <div className='achvm-list-table-items-item-auto-term'>{props.term}</div>
    </div>
  )
}

export default AchvmItemAuto