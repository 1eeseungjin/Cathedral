import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../@store/userInfo';
import config from '../../../../config';
import Attachments from '../../Components/Attachments/Attachments';
import ModifyContents from '../../Components/ModifyContents/ModifyContents';
import Preview from '../../Components/Preview/Preview';
import "./ViewNotice.scss";

const ViewNotice = () => {
    const [userInfo] = useRecoilState(userInfoState);
    const [data, setData] = useState({
        type: '공지사항',
        modifiable: false,
        contents: {},
        files: []
    });
    const { idx } = useParams();
    const navigate = useNavigate();

    const update = () => {
        navigate("/community/notice/update/" + idx);
    }

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(config.api + 'community/notice/view/' + idx).catch(err => alert(err));
            setData(data => ({ ...data, contents: res.data[0] }));
        }
        getData();
    }, [idx]);

    return (
        <>
            <div className='notice-view-header'>
                <div className='notice-view-header-backspace' onClick={() => navigate('/community/notice')}></div>
                <div className='notice-view-header-title'>{data.contents.title}</div>
                {userInfo.permission === "마스터" &&
                    <button className='notice-view-header-btn' onClick={() => update()}>수정하기</button>
                }

            </div>
            <div className='notice-view-body'>
                <ModifyContents data={data} setData={setData} />
                <Attachments data={data} setData={setData} />
                <Preview data={data} />
            </div>
        </>
    )
}

export default ViewNotice