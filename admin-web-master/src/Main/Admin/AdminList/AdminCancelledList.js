//승인반려내역 리스트

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import adminApi from '../../../@api/adminApi';
import Sort from '../../../@plugins/sort.js';
import Excel from '../../../@plugins/Excel';
import AdminItem from './AdminItem/AdminCancelledItem';
import './AdminList.scss'
import adminManage from '../../../@store/adminManage';
import Arrow from "../../../@static/icon/Arrow.png";

function List() {
    const [adminList, setAdminList] = useState([])
    const [mappedList, setMappedList] = useState([])
    const [idState, setIdState] = useRecoilState(adminManage.AdminIdState)
    const [checkedIdState, setCheckedIdState] = useRecoilState(adminManage.AdminCheckedIdState)
    const [sort, setSort] = useState({
        created_at: false,
        name: false,
        baptismal: false,
        id: false,
        permission: false,
        temple: false
    })

    const mappingList = (newValue) => {
        setMappedList(newValue.map((item, index) => {
            return <AdminItem admin={item} index={index}/>
        }))
    }

    useEffect(() => {
        setAdminList(Sort(adminList, sort.created_at, 'created_at'))
        mappingList(adminList)
    }, [sort.created_at])

    useEffect(() => {
        setAdminList(Sort(adminList, sort.name, 'name'))
        mappingList(adminList)
    }, [sort.name])

    useEffect(() => {
        setAdminList(Sort(adminList, sort.baptismal, 'baptismal'))
        mappingList(adminList)
    }, [sort.baptismal])

    useEffect(() => {
        setAdminList(Sort(adminList, sort.id, 'id'))
        mappingList(adminList)
    }, [sort.id])

    useEffect(() => {
        setAdminList(Sort(adminList, sort.permission, 'permission'))
        mappingList(adminList)
    }, [sort.permission])

    useEffect(() => {
        setAdminList(Sort(adminList, sort.temple, 'temple'))
        mappingList(adminList)
    }, [sort.temple])

    useEffect(() => {
        adminApi.getAdminList()
            .then((value) => {
                const newValue = value.adminList.map((value) => {
                    const changedValue = value
                    const created_at = new Date(value.created_at)
                    changedValue.created_at = `${created_at.getFullYear()}-${created_at.getMonth().toString().padStart(2, '0')}-${created_at.getDay().toString().padStart(2, '0')}`  
                    return changedValue
                })
                setAdminList(newValue)
                mappingList(newValue)
            })
            .catch((e) => console.error(e))
    }, [])

    useEffect(() => {
        setIdState(adminList.map((value) => {
            return value.id
        }))
    }, [adminList])

    return (
        <div className='admin-list'>
            <div>본당관리자 승인</div>
            {/* <div className='admin-list-date'>
                <div className='admin-list-date-title'>가입신청일</div>
                <input type="date" className='admin-list-date-input'/> ~
                <input type="date" className='admin-list-date-input'/>
                <div className='admin-list-date-btn'>오늘</div>
                <div className='admin-list-date-btn'>이번주</div>
                <div className='admin-list-date-btn'>이번달</div>
                <div className='admin-list-date-btn'>전체</div>
            </div> */}
            <div className='admin-list-header'>
                {/* <div className='admin-list-header-end'>
                    <div className='admin-list-header-end-search-result'>검색 결과: 총 {adminList.length}건</div>
                    <button 
                        className='admin-list-header-end-save-excel'
                        onClick={() => {
                            Excel.saveExcel("관리자_리스트", adminList.map((value) => {
                                return {
                                    idx: value.idx,
                                    created_at: value.created_at,
                                    name: value.name,
                                    baptismal: value.baptismal,
                                    id: value.id,
                                    phone: value.phone,
                                    permission: value.permission,
                                    temple: value.temple
                                }
                            }), ["번호", "등록일", "이름", "세례명", "아이디", "전화번호", "권한", "본당"])
                        }}>엑셀 저장 &gt;</button>
                </div> */}
            </div>

            <div className='admin-list-info'>
                {/* <input className='admin-list-info-item-checkbox' 
                    type='checkbox'
                    checked={idState.length === checkedIdState.length}
                    onChange={(v) => {
                        setCheckedIdState(v.target.checked ? idState : [])
                    }}/> */}
                {/* <div className='admin-list-info-item-idx'>번호</div> */}
                <div 
                    className='admin-list-info-item-created-at'
                    onClick={() => {
                        setSort({
                            ...sort,
                            created_at: !sort.created_at
                        })
                    }}>등록일
                    <img src={Arrow}/>
                    </div>
                <div 
                    className='admin-list-info-item-name'
                    onClick={() => {
                        setSort({
                            ...sort,
                            name: !sort.name
                        })
                    }}>이름
                    <img src={Arrow}/>
                    </div>
                <div className='admin-list-info-item-baptismal'
                    onClick={() => {
                        setSort({
                            ...sort,
                            baptismal: !sort.baptismal
                        })
                    }}>세례명<img src={Arrow}/></div>
                <div className='admin-list-info-item-id'
                    onClick={() => {
                        setSort({
                            ...sort,
                            id: !sort.id
                        })
                    }}>아이디<img src={Arrow}/></div>
                <div className='admin-list-info-item-phone'>전화번호<img src={Arrow}/></div>
                <div className='admin-list-info-item-permission'
                    onClick={() => {
                        setSort({
                            ...sort,
                            permission: !sort.permission
                        })
                    }}>권한<img src={Arrow}/></div>
                <div className='admin-list-info-item-temple'
                    onClick={() => {
                        setSort({
                            ...sort,
                            temple: !sort.temple
                        })
                    }}>본당
                    <img src={Arrow}/></div>
                <div className='admin-list-info-item-cancel-cause'>반려사유<img src={Arrow}/></div>
            </div>
            <div className='admin-list-info-divide-line'/>
            <div className='admin-list-data'>
                {mappedList}
            </div>

        </div>
    )
}

export default List