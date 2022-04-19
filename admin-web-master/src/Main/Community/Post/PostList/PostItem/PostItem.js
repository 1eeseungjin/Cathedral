import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { functions } from '../../../Functions/functions';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../../@store/userInfo';
import dayjs from 'dayjs';
import axios from 'axios';
import config from '../../../../../config';
import './PostItem.scss'
import Modal from '../../../Components/Modal/Modal';


const PostItem = ({ props, deleteFromState, settingIdx, setSettingIdx }) => {
    const [userInfo] = useRecoilState(userInfoState);
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const created_at = functions.ISOtoLocal(props.created_at);
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    // 글 삭제 팝업
    const deletePopUp = async () => {
        setModalData({
            title: '게시글 삭제',
            contents: '이 글을 삭제하시겠습니까?',
            isConfirm: 'true',
            confirmMethod: async () => {
                await axios.delete(config.api + "community/post/delete/" + props.idx)
                    .then(res => deleteFromState(res.data))
                    .catch(err => alert(err));
            }
        })
        setIsModalOn(true);
    }

    // 설정(자세히 보기, 삭제) 메뉴 열기
    const openSetting = () => setSettingIdx(idx => idx !== props.idx ? props.idx : -1);

    // 자세히 보기
    const view = () => navigate('/community/post/view/' + props.idx)

    return (
        <div className='post-item'>
            <div className='post-item-index'>{props.idx}</div>
            <div className='post-item-title'>{props.title}</div>
            <div className='post-item-community'>{props.community} 게시판</div>
            <div className='post-item-memberName'>{props.member_name}</div>
            <div className='post-item-createdAt'>{dayjs(created_at).format('YYYY.MM.DD HH:mm')}</div>
            <div className='post-item-views'>{props.views}</div>
            <div className='post-item-setting'>
                <button className='post-item-setting-btn' onClick={openSetting}></button>
                {settingIdx === props.idx &&
                    <div className='post-item-setting-menu'>
                        <div className='post-item-setting-menu-item' onClick={() => view()}>
                            {(userInfo.permission === "교구" || userInfo.permission === "본당")
                                ? '수정' : '자세히 보기'}</div>
                        <div className='post-item-setting-menu-item' onClick={() => deletePopUp()}>삭제</div>
                    </div>
                }
            </div>
            {isModalOn &&
                <Modal offModal={offModal} modalData={modalData} />
            }
        </div>
    )
}

export default PostItem