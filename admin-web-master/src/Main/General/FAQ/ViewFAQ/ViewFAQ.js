import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import prayerApi from '../../../../@api/prayerApi';
import ModifyContents from '../../../Community/Components/ModifyContents/ModifyContents';
import './ViewFAQ.scss';

function ViewFAQ() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        type: 'FAQ 관리',
        modifiable: false,
        contents: {}
    });
    const {
        getFAQ
    } = prayerApi;

    useEffect(() => {
        const mount = async () => {
            const res = await getFAQ(idx);
            setData({ ...data, contents: { question: res.faq[0].question, answer: res.faq[0].answer } });
        }
        mount();
    }, [])

    return (<>
        <div className='faq-view-header'>
            <div
                className='faq-view-header-backspace'
                onClick={() => navigate('/general/faq')}
            ></div>
            <div className='faq-view-header-title'>FAQ 관리</div>
            <button
                className='faq-view-header-btn'
                onClick={() => navigate('/general/faq/update/' + idx)}>
                수정하기</button>
        </div>
        <div className='faq-view-body'>
            <ModifyContents data={data} setData={setData} />
        </div>
    </>)
}

export default ViewFAQ