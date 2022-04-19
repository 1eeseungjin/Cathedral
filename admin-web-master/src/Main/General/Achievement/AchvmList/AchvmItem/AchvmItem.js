import dayjs from 'dayjs';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import prayerApi from '../../../../../@api/prayerApi';
import Modal from '../../../../Community/Components/Modal/Modal';
import { functions } from '../../../../Community/Functions/functions';
import './AchvmItem.scss';

function AchvmItem({ props, deleteFromState, settingIdx, setSettingIdx }) {
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const [isBlockModalOn, setIsBlockModalOn] = useState(false);
    const {
        deleteAchievement
    } = prayerApi;
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const offBlockModal = () => setIsBlockModalOn(false);

    const openSetting = () => setSettingIdx(idx => idx !== props.idx ? props.idx : -1);

    const deletePopUp = async () => {
        setModalData({
            title: '업적 삭제',
            contents: '이 업적을 삭제하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                if (new Date(functions.ISOtoLocal(props.term_start)) > new Date()) {
                    const res = await deleteAchievement(props.idx);
                    if (res.success) deleteFromState(props.idx);
                    else alert('삭제에 실패하였습니다.')
                } else {
                    setIsModalOn(false);
                    blockDeletePopUp();
                }
            }
        })
        setIsModalOn(true);
    }

    const blockDeletePopUp = () => {
        setModalData({
            title: '삭제 불가',
            contents: '업적 기간이 시작되었거나 지난 업적은 삭제할 수 없습니다.',
            isConfirm: false
        })
        setIsBlockModalOn(true);
    }

    return (
        <div className='achvm-list-table-items-item'>
            <div className='achvm-list-table-items-item-name'>{props.name}</div>
            <div className='achvm-list-table-items-item-type'>{props.typeName}</div>
            <div className='achvm-list-table-items-item-term'>{props.term}</div>
            {props.type === 'C' &&
                <div className='achvm-list-table-items-item-setting'>
                    <button onClick={openSetting} className='achvm-list-table-items-item-setting-btn'></button>
                    {settingIdx === props.idx &&
                        <div className='achvm-list-table-items-item-setting-menu'>
                            <div className='achvm-list-table-items-item-setting-menu-item'
                                onClick={() => navigate('/general/achievement/view/' + props.idx)}>자세히 보기</div>
                            <div className='achvm-list-table-items-item-setting-menu-item'
                                onClick={() => deletePopUp()}>삭제</div>
                        </div>
                    }
                </div>
            }
            {isModalOn &&
                <Modal offModal={offModal} modalData={modalData} />
            }
            {isBlockModalOn &&
                <Modal offModal={offBlockModal} modalData={modalData} />
            }
        </div>
    )
}

export default AchvmItem