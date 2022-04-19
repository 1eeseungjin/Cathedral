import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../../../config';
import "./UpdateNotice.scss";
import Preview from '../../Components/Preview/Preview';
import Attachments from '../../Components/Attachments/Attachments';
import ModifyContents from '../../Components/ModifyContents/ModifyContents';
import Modal from '../../Components/Modal/Modal';
const UpdateNotice = () => {
    const [data, setData] = useState({
        type: '공지사항',
        modifiable: true,
        contents: {},
        files: []
    });
    const { idx } = useParams();
    const navigate = useNavigate();
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);

    const offModal = () => setIsModalOn(false);

    const submit = async () => {
        setModalData({
            title: '공지글 수정',
            contents: '수정하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                await axios.put(config.api + 'community/notice/update/' + idx, data)
                    .then(res => navigate('/community/notice/view/' + idx))
                    .catch(err => alert(err));
            }
        });
        setIsModalOn(true);
    }

    useEffect(() => {
        const getData = async () => {
            await axios.get(config.api + 'community/notice/view/' + idx)
                .then(res => setData(d => ({ ...d, contents: res.data[0] })));
        }
        getData();
    }, [idx])

    return (
        <>
            <div className='notice-update-header'>
                <div className='notice-update-header-backspace' onClick={() => navigate('/community/notice/view/' + idx)}></div>
                <div className='notice-update-header-title'>{data.type} 수정</div>
                <button className='notice-update-header-btn' onClick={() => submit()}>수정 확인</button>
            </div>
            <div className='notice-update-body'>
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

export default UpdateNotice