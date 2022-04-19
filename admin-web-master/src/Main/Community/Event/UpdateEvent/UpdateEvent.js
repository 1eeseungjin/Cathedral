import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../config';
import dayjs from 'dayjs';
import ModifyContents from '../../Components/ModifyContents/ModifyContents';
import Attachments from '../../Components/Attachments/Attachments';
import Preview from '../../Components/Preview/Preview';
import './UpdateEvent.scss';
import Modal from '../../Components/Modal/Modal';

const UpdateEvent = () => {
    const [data, setData] = useState({
        type: '이벤트',
        modifiable: true,
        contents: {},
        files: []
    });
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const { idx } = useParams();
    let navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const submit = async () => {
        setModalData({
            title: '이벤트 수정',
            contents: '수정하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                await axios.put(config.api + 'community/event/update/' + idx, data.contents);
                navigate('/community/event/view/' + idx);
            }
        });
        setIsModalOn(true);
    }

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(config.api + 'community/event/view/' + idx)
                .catch(err => alert(err));
            const resData = res.data[0];
            setData(data => ({
                ...data, contents: {
                    ...resData,
                    //ISOString으로 온 값을 년, 월, 일로 format
                    term_start: dayjs(resData.term_start).format('YYYY-MM-DD'),
                    term_end: dayjs(resData.term_end).format('YYYY-MM-DD')
                }
            }));
        }
        getData();
    }, [idx]);

    return (<>
        <div className='event-update-header'>
            <div
                className='event-update-header-backspace'
                onClick={() => navigate('/community/event/view/' + idx)}
            ></div>
            <div className='event-update-header-title'>{data.type} 수정</div>
            <button
                className='event-update-header-btn'
                onClick={() => submit()}>
                수정 확인</button>
        </div>
        <div className='event-update-body'>
            <ModifyContents data={data} setData={setData} />
            <Attachments data={data} setData={setData} />
            <Preview data={data} />
        </div>
        {isModalOn &&
            <Modal offModal={offModal} modalData={modalData} />
        }
    </>
    );
}

export default UpdateEvent