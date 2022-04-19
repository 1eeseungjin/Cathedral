import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import prayerApi from '../../../../@api/prayerApi';
import Modal from '../../../Community/Components/Modal/Modal';
import ModifyContents from '../../../Community/Components/ModifyContents/ModifyContents';
import './UpdateFAQ.scss';

function UpdateFAQ() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const [modalData, setModalData] = useState({})
    const [isModalOn, setIsModalOn] = useState(false);
    const [data, setData] = useState({
        type: 'FAQ 관리',
        modifiable: true,
        contents: {}
    });
    const {
        getFAQ,
        putFAQ
    } = prayerApi;

    const offModal = () => setIsModalOn(false);

    const submit = () => {
        setModalData({
            title: 'FAQ 답변 수정',
            contents: '수정하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                const res = await putFAQ(idx, data.contents.answer);
                if (res.success) navigate('/general/faq');
                else alert('수정에 실패하였습니다.');
            }
        })
        setIsModalOn(true);
    }

    useEffect(() => {
        const mount = async () => {
            const res = await getFAQ(idx);
            setData({ ...data, contents: { question: res.faq[0].question, answer: res.faq[0].answer } });
        }
        mount();
    }, []);

    return (<>
        <div className='faq-update-header'>
            <div
                className='faq-update-header-backspace'
                onClick={() => navigate('/general/faq/view/' + idx)}
            ></div>
            <div className='faq-update-header-title'>FAQ 관리</div>
            <button
                className='faq-update-header-btn'
                onClick={() => submit()}>
                수정 확인</button>
        </div>
        <div className='faq-update-body'>
            <ModifyContents data={data} setData={setData} />
        </div>
        {isModalOn &&
            <Modal offModal={offModal} modalData={modalData} />
        }
    </>)
}

export default UpdateFAQ