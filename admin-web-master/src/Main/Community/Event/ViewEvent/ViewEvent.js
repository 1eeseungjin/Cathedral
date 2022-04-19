import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../@store/userInfo';
import axios from 'axios';
import config from '../../../../config';
import dayjs from 'dayjs';
import ModifyContents from '../../Components/ModifyContents/ModifyContents';
import Attachments from '../../Components/Attachments/Attachments';
import Preview from '../../Components/Preview/Preview';
import './ViewEvent.scss';
import eventApi from '../../../../@api/eventApi';

const ViewEvent = () => {
    const [userInfo] = useRecoilState(userInfoState)
    const [data, setData] = useState({
        type: '이벤트',
        modifiable: false,
        contents: {},
        files: [],
    });
    const {
        getEvent
    } = eventApi;
    const { idx } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const event = await getEvent(idx);
            console.log(event[0]);
            setData(data => ({
                ...data, contents: {
                    ...event[0],
                    term_start: dayjs(event[0].term_start).format('YYYY-MM-DD'),
                    term_end: dayjs(event[0].term_end).format('YYYY-MM-DD')
                }
            }));
        }
        getData();
    }, [idx]);

    return (<>
        <div className='event-view-header'>
            <div className='event-view-header-backspace' onClick={() => navigate('/community/event')}></div>
            <div className='event-view-header-title'>{data.contents.title}</div>
            {userInfo.permission === "마스터" &&
                <button className='event-view-header-btn' onClick={() => navigate('/community/event/update/' + idx)}>수정하기</button>
            }
        </div>
        <div className='event-view-body'>
            <ModifyContents data={data} setData={setData} />
            <Attachments data={data} setData={setData} />
            <Preview data={data} />
        </div>
    </>
    )
}

export default ViewEvent