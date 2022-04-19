import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInfoState } from '../../../../@store/userInfo';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import config from '../../../../config';
import Attachments from '../../Components/Attachments/Attachments';
import ModifyContents from '../../Components/ModifyContents/ModifyContents';
import Preview from '../../Components/Preview/Preview';
import './AddEvent.scss';
import Modal from '../../Components/Modal/Modal';

const AddEvent = () => {
    const [userInfo] = useRecoilState(userInfoState);
    const [data, setData] = useState({
        type: '이벤트',
        modifiable: true,
        contents: {
            member_name: userInfo.name
        },
        files: []
    });
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const submit = async () => {
        setModalData({
            title: '이벤트 등록',
            contents: '이 글을 등록하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                if (!!data.contents.member_name && !!data.contents.term_start && !!data.contents.term_end
                    && !!data.contents.title && !!data.contents.contents) {
                    await axios.post(config.api + 'community/event/add', data.contents)
                        .then(res => navigate('/community/event'))
                        .catch(err => alert(err));
                } else alert('모든 필수 정보를 입력하세요.');
            }
        });
        setIsModalOn(true);
    }

    return (<>
        <div className='event-add-header'>
            <div className='event-add-header-backspace' onClick={() => navigate('/community/event')}></div>
            <div className='event-add-header-title'>{data.type} 등록</div>
            <button className='event-add-header-btn' onClick={() => submit()}>등록하기</button>
        </div>
        <div className='event-add-body'>
            <ModifyContents data={data} setData={setData} />
            <Attachments data={data} setData={setData} />
            <Preview data={data} />
        </div>
        {isModalOn &&
            <Modal offModal={offModal} modalData={modalData} />
        }
    </>);
}

export default AddEvent