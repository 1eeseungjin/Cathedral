import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { functions } from '../../../Functions/functions';
import { userInfoState } from '../../../../../@store/userInfo';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../../../../../config';
import './NoticeItem.scss';
import Modal from '../../../Components/Modal/Modal';

const NoticeItem = ({ props, deleteFromState, settingIdx, setSettingIdx }) => {
    const [userInfo] = useRecoilState(userInfoState);
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const created_at = functions.ISOtoLocal(props.created_at);
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const deletePopUp = async () => {
        setModalData({
            title: '공지글 삭제',
            contents: '이 글을 삭제하시겠습니까?',
            isConfirm: 'true',
            confirmMethod: async () => {
                await axios.delete(config.api + "community/notice/delete/" + props.idx)
                    .then(res => deleteFromState(res.data))
                    .catch(err => alert(err));
            }
        })
        setIsModalOn(true);
    }

    const openSetting = () => setSettingIdx(idx => idx !== props.idx ? props.idx : -1);

    return (
        <div className='notice-item'>
            <div className='notice-item-title'>{props.title}</div>
            <div className='notice-item-memberName'>{props.member_name}</div>
            <div className='notice-item-createdAt'>{dayjs(created_at).format('YYYY.MM.DD. HH:mm')}</div>
            <div className='notice-item-views'>{props.views}</div>
            <div className='notice-item-setting'>
                <button className='notice-item-setting-btn' onClick={openSetting}></button>
                {settingIdx === props.idx &&
                    <div className='notice-item-setting-menu'>
                        <div className='notice-item-setting-menu-item' onClick={() => navigate("/community/notice/view/" + props.idx)}>자세히 보기</div>
                        {userInfo.permission === "마스터" &&
                            <div className='notice-item-setting-menu-item' onClick={() => deletePopUp()}>삭제</div>
                        }
                    </div>
                }
            </div>
            {isModalOn &&
                <Modal offModal={offModal} modalData={modalData} />
            }
        </div>
    );
}

export default NoticeItem;