import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { functions } from '../../../Functions/functions';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../../@store/userInfo';
import dayjs from 'dayjs';
import axios from 'axios';
import config from '../../../../../config';
import "./EventItem.scss";
import Modal from '../../../Components/Modal/Modal';

const EventItem = ({ props, deleteFromState, settingIdx, setSettingIdx }) => {
    const [userInfo] = useRecoilState(userInfoState);
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const created_at = functions.ISOtoLocal(props.created_at);
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const deletePopUp = async () => {
        setModalData({
            title: '이벤트 삭제',
            contents: '이 글을 삭제하시겠습니까?',
            isConfirm: 'true',
            confirmMethod: async () => {
                await axios.delete(config.api + "community/event/delete/" + props.idx)
                    .then(res => deleteFromState(res.data))
                    .catch(err => alert(err));
            }
        })
        setIsModalOn(true);
    }

    const openSetting = () => setSettingIdx(idx => idx !== props.idx ? props.idx : -1);

    const termToString = () => dayjs(props.term_start).format('YYYY.MM.DD') + '~'
        + dayjs(props.term_end).format('YYYY.MM.DD');

    return (
        <div className='event-list-table-items-item'>
            <div className='event-list-table-items-item-title'>{props.title}</div>
            <div className='event-list-table-items-item-memberName'>{props.member_name}</div>
            <div className='event-list-table-items-item-term'>{termToString()}</div>
            <div className='event-list-table-items-item-status'>{props.status}</div>
            <div className='event-list-table-items-item-createdAt'>
                {dayjs(created_at).format('YYYY.MM.DD. HH:mm')}</div>
            <div className='event-list-table-items-item-views'>{props.views}</div>
            <div className='event-list-table-items-item-setting'>
                <button onClick={openSetting} className='event-list-table-items-item-setting-btn'></button>
                {settingIdx === props.idx &&
                    <div className='event-list-table-items-item-setting-menu'>
                        <div className='event-list-table-items-item-setting-menu-item'
                            onClick={() => navigate('/community/event/view/' + props.idx)}>자세히 보기</div>
                        {userInfo.permission === "마스터" &&
                            <div className='event-list-table-items-item-setting-menu-item'
                                onClick={() => deletePopUp()}>삭제</div>
                        }
                    </div>
                }
            </div>
            {isModalOn &&
                <Modal offModal={offModal} modalData={modalData} />
            }
        </div>
    )
}

export default EventItem