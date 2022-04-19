//승인반려내역 아이템

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import adminManage from '../../../../@store/adminManage';
import './AdminItem.scss'
import Modal from './Modal/Modal';

function AdminItem({ admin }) {
    const [checkedIdState, setCheckedIdState] = useRecoilState(adminManage.AdminCheckedIdState)

    return (
    <>
        <div className='admin-item'>
            <div className='admin-item-info'>
                <div className='admin-item-info-data'>
                    {/* <div className='admin-item-info-data-checkbox'> */}
                        {/* <input type="checkbox"
                            checked={checkedIdState.includes(admin.id)}
                            onChange={(v) => {
                                if (v.target.checked) {
                                    setCheckedIdState([...checkedIdState, admin.id])
                                } else {
                                    setCheckedIdState(checkedIdState.filter((value) => value !== admin.id))
                                }
                            }}/> */}
                    {/* </div> */}
                    {/* <div className='admin-item-info-data-idx'>{admin.idx}</div> */}
                    <div className='admin-item-info-data-created-at'>{admin.created_at}</div>
                    <div className='admin-item-info-data-name'>{admin.name}</div>
                    <div className='admin-item-info-data-baptismal'>{admin.baptismal}</div>
                    <div className='admin-item-info-data-id'>{admin.id}</div>
                    <div className='admin-item-info-data-phone'>{admin.phone}</div>
                    <div className='admin-item-info-data-permission'>{admin.permission}</div>
                    <div className='admin-item-info-data-temple'>{admin.temple}</div>
                    <div className='admin-list-info-data-cancel-cause'>
                        <div>asdf</div>
                    </div>
                </div>
            </div>

            <div className='admin-item-divide-line'/>
            
        </div>
    </>
    )
}

export default AdminItem