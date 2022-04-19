import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import config from '../../../../config';
import Attachments from '../../../Community/Components/Attachments/Attachments';
import ModifyContents from '../../../Community/Components/ModifyContents/ModifyContents';
import Modal from '../../../Community/Components/Modal/Modal';
import preview from '../../../../@static/image/prayer-preview.png'
import './UpdatePrayer.scss';

function UpdatePrayer() {
    const [data, setData] = useState({
        type: '기도문',
        modifiable: true,
        contents: {},
        files: [],
        voiceFiles: [null, null, null, null]
    })
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const { idx } = useParams();
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const submit = async () => {
        setModalData({
            title: '기도문 저장',
            contents: '저장하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                if (!!data.contents.contents && !!data.voiceFiles) {
                    await axios.put(config.api + 'general/prayer/update/' + idx, data.contents)
                        .then(res => navigate('/general/prayer'))
                        .catch(err => alert(err));
                }
            }
        });
        setIsModalOn(true);
    }

    useEffect(() => {
        const getPrayer = async () => {
            await axios.get(config.api + 'general/prayer/view/' + idx)
                .then(res => setData({ ...data, contents: res.data.prayer[0] }))
                .catch(err => console.log(err));
        }
        getPrayer();
    }, [idx]);

    return (
        <>
            <div className='prayer-update-header'>
                <div
                    className='prayer-update-header-backspace'
                    onClick={() => navigate('/general/prayer')}
                ></div>
                <div className='prayer-update-header-title'>{data.contents.title}</div>
                <button
                    className='prayer-update-header-btn'
                    onClick={() => submit()}>
                    저장하기</button>
                {isModalOn &&
                    <Modal modalData={modalData} offModal={offModal} />
                }
            </div>
            <div className='prayer-update-body'>
                <ModifyContents data={data} setData={setData} modifiable={true} />
                <Attachments data={data} setData={setData} modifiable={true} />

            </div>
        </>
    )
}

export default UpdatePrayer