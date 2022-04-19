import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import prayerApi from '../../../../@api/prayerApi';
import Modal from '../../../Community/Components/Modal/Modal';
import { functions } from '../../../Community/Functions/functions';
import './AddAchvm.scss';

function AddAchvm() {
    const [modalData, setModalData] = useState({})
    const [isModalOn, setIsModalOn] = useState(false);
    const [achvm, setAchvm] = useState({
        detail: `관리자가 설정한 기간 동안 묵주기도를 단 이상 바친 신자들에게 자동으로 업적이 부여됩니다.`,
        condition: 0
    });
    const {
        postAchievement
    } = prayerApi
    const navigate = useNavigate();

    const onChange = e => {
        setAchvm(achvm => ({ ...achvm, [e.target.id]: e.target.value }))
    }

    const onConditionChange = e => {
        setAchvm(achvm => ({
            ...achvm,
            [e.target.id]: e.target.value,
            detail: `관리자가 설정한 기간 동안 묵주기도를 ${e.target.value || ''}단 이상 바친 신자들에게 자동으로 업적이 부여됩니다.`
        }))
    }

    const offModal = () => setIsModalOn(false);

    const submit = () => {
        setModalData({
            title: '사용자 지정 업적 등록',
            contents: '새 업적을 등록하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                const res = await postAchievement(
                    achvm.name,
                    achvm.detail,
                    achvm.rosary_condition,
                    achvm.term_start,
                    achvm.term_end);
                if (res.success) navigate('/general/achievement');
                else alert('등록에 실패하였습니다.');
            }
        })
        setIsModalOn(true);
    }

    return (<>
        <div className='achvm-add-header'>
            <div
                className='achvm-add-header-backspace'
                onClick={() => navigate('/general/achievement')}
            ></div>
            <div className='achvm-add-header-title'>사용자 지정 업적 등록</div>
            <button
                className='achvm-add-header-btn'
                onClick={() => submit()}>
                저장하기</button>
        </div>
        <div className='achvm-add-body'>
            <div className='achvm-add-body-name'>
                <div className='achvm-add-body-name-label'>업적 제목</div>
                <input className='achvm-add-body-name-value'
                    type='text'
                    id='name'
                    onChange={onChange} />
            </div>
            <div className='achvm-add-body-detail'>
                <div className='achvm-add-body-detail-label'>업적 설명</div>
                <textarea
                    className='achvm-add-body-detail-value'
                    id='detail'
                    value={achvm.detail || ''}
                    readOnly />
            </div>
            <div className='achvm-add-body-badge'>
                <div className='achvm-add-body-badge-label'>뱃지 이미지</div>
                <label className='achvm-add-body-badge-value'
                    id='badge' htmlFor='badgeUpload'>+</label>
                <input
                    type='file'
                    className='achvm-add-body-badge-upload'
                    id='badgeUpload'
                    style={{ display: 'none' }}
                    accept='image/*' />
            </div>
            <div className='achvm-add-body-condition'>
                <div className='achvm-add-body-condition-label'>업적 부여 조건</div>
                <div className='achvm-add-body-condition-wrapper'>
                    <input
                        type='number'
                        className='achvm-add-body-condition-value'
                        onChange={onConditionChange}
                        min={0}
                        id='rosary_condition' />
                    <span className='achvm-add-body-condition-value-span'>단 이상 묵주기도</span>
                </div>
            </div>
            <div className='achvm-add-body-term'>
                <div className='achvm-add-body-term-label'>기간 설정</div>
                <div className='achvm-add-body-term-value'>
                    <input
                        className='achvm-add-body-term-value-start'
                        type='date'
                        id='term_start'
                        max={achvm.term_end || ''}
                        onChange={onChange} />
                    <span className='achvm-add-body-term-value-span'> ~ </span>
                    <input className='achvm-add-body-term-value-end'
                        type='date'
                        id='term_end'
                        min={achvm.term_start || ''}
                        onChange={onChange} />
                </div>
            </div>
        </div>
        {isModalOn &&
            <Modal modalData={modalData} offModal={offModal} />
        }
    </>);
}

export default AddAchvm