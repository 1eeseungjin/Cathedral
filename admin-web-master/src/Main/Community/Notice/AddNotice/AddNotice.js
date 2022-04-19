import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../@store/userInfo';
import axios from 'axios';
import config from '../../../../config';
import Preview from '../../Components/Preview/Preview';
import ModifyContents from '../../Components/ModifyContents/ModifyContents';
import Attachments from '../../Components/Attachments/Attachments';
import "./AddNotice.scss";
import Modal from '../../Components/Modal/Modal';

const AddNotice = () => {
    const [userInfo] = useRecoilState(userInfoState);
    const [data, setData] = useState({
        type: '공지사항',
        modifiable: true,
        contents: { member_name: userInfo.name },
        files: []
    });
    const navigate = useNavigate();
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);

    const offModal = () => setIsModalOn(false);

    const submit = () => {
        setModalData({
            title: '이벤트 등록',
            contents: '이 글을 등록하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                if (!!data.contents.title && !!data.contents.member_name && !!data.contents.contents) {
                    await axios.post(config.api + 'community/notice/add', data)
                        .catch(err => alert(err));
                    navigate('/community/notice');
                } else alert('모든 필수 정보를 입력해주세요.');
            }
        });
        setIsModalOn(true);
    }

    return (
        <>
            <div className='notice-add-header'>
                <div className='notice-add-header-backspace' onClick={() => navigate('/community/notice')}></div>
                <div className='notice-add-header-title'>{data.type} 등록</div>
                <button className='notice-add-header-btn' onClick={() => submit()}>등록하기</button>
            </div>
            <div className='notice-add-body'>
                <ModifyContents data={data} setData={setData} />
                <Attachments data={data} setData={setData} />
                <Preview data={data} />
            </div>
            {isModalOn &&
                <Modal offModal={offModal} modalData={modalData} />
            }
        </>
    )
}

export default AddNotice