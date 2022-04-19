import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import prayerApi from '../../../../@api/prayerApi';
import Modal from '../../../Community/Components/Modal/Modal'
import ModifyContents from '../../../Community/Components/ModifyContents/ModifyContents';
import './AddFAQ.scss';

function AddFAQ() {
    const [modalData, setModalData] = useState({})
    const [isModalOn, setIsModalOn] = useState(false);
    const [data, setData] = useState({
        type: 'FAQ 관리',
        modifiable: true,
        contents: {}
    });
    const {
        postFAQ
    } = prayerApi;
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const submit = () => {
        setModalData({
            title: '새로운 FAQ 등록',
            contents: '이 질문을 등록하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                const res = await postFAQ(data.contents.question, data.contents.answer);
                if (res.success) navigate('/general/faq');
                else alert('등록에 실패하였습니다.');
            }
        })
        setIsModalOn(true);
    }

    return (<>
        <div className='faq-add-header'>
            <div
                className='faq-add-header-backspace'
                onClick={() => navigate('/general/faq')}
            ></div>
            <div className='faq-add-header-title'>FAQ 관리</div>
            <button
                className='faq-add-header-btn'
                onClick={() => submit()}>
                저장하기</button>
        </div>
        <div className='faq-add-body'>
            <ModifyContents data={data} setData={setData} modifiable={true} />
        </div>
        {isModalOn &&
            <Modal modalData={modalData} offModal={offModal} />
        }
    </>
    )
}

export default AddFAQ