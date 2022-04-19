import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../@store/userInfo';
import axios from 'axios';
import config from '../../../../config';
import ModifyContents from '../../Components/ModifyContents/ModifyContents';
import Attachments from '../../Components/Attachments/Attachments';
import Preview from '../../Components/Preview/Preview';
import Comments from '../../Components/Comments/Comments';
import './AddPost.scss';
import Modal from '../../Components/Modal/Modal';

function AddPost() {
    const [userInfo] = useRecoilState(userInfoState);
    const [data, setData] = useState({
        type: '커뮤니티 게시판',
        modifiable: true,
        contents: {
            member_id: userInfo.id,
            member_name: userInfo.name,
            position: userInfo.permission === "본당"
                ? userInfo.temple
                : userInfo.permission === "교구"
                    ? userInfo.residence : null,
            isBlind: 'F'
        },
        files: []
    })
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const submit = () => {
        setModalData({
            title: '게시글 등록',
            contents: '이 글을 등록하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                await axios.post(config.api + "community/post/add", data.contents)
                    .then(res => navigate('/community/post', { replace: true }))
                    .catch(err => alert(err));
            }
        });
        setIsModalOn(true);
    }

    return (
        <div className='post-add'>
            <div className='post-add-header'>
                <div className='post-add-header-title'>게시판 관리</div>
                <div className='post-add-header-search'></div>
            </div>
            <div className='post-add-body'>
                <div className='post-add-body-header'>
                    <div className='post-add-body-header-backspace' onClick={() => navigate('/community/post')}></div>
                    <div className='post-add-body-header-title'>게시글 등록</div>
                    <button className='post-add-body-header-btn' onClick={() => submit()}>등록하기</button>
                </div>
                <div className='post-add-body-body'>
                    <ModifyContents data={data} setData={setData} />
                    <Attachments data={data} setData={setData} />
                    <Preview data={data} />
                    <Comments postIdx={null} />
                </div>
                {isModalOn &&
                    <Modal offModal={offModal} modalData={modalData} />
                }
            </div>
        </div>
    )
}

export default AddPost