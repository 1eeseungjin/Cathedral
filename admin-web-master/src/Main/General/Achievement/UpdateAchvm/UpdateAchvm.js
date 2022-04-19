import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import prayerApi from '../../../../@api/prayerApi';
import Modal from '../../../Community/Components/Modal/Modal';
import { functions } from '../../../Community/Functions/functions';
import './UpdateAchvm.scss';

function UpdateAchvm() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const [modalData, setModalData] = useState({})
    const [isModalOn, setIsModalOn] = useState(false);
    const [badge, setBadge] = useState('');
    const [achvm, setAchvm] = useState({});
    const {
        getAchievement,
        putAchievement
    } = prayerApi;

    const offModal = () => setIsModalOn(false);

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

    const submit = async () => {
        setModalData({
            title: '업적 수정',
            contents: '수정하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                const res = await putAchievement(
                    idx,
                    achvm.name,
                    achvm.detail,
                    achvm.rosary_condition,
                    achvm.term_start,
                    achvm.term_end);
                if (res.success) navigate('/general/achievement');
                else alert('수정에 실패하였습니다.');
            }
        })
        setIsModalOn(true);
    }

    useEffect(() => {
        const mount = async () => {
            const res = await getAchievement(idx);
            setAchvm({
                ...res.achvm[0],
                term_start: dayjs(functions.ISOtoLocal(res.achvm[0].term_start)).format('YYYY-MM-DD'),
                term_end: dayjs(functions.ISOtoLocal(res.achvm[0].term_end)).format('YYYY-MM-DD')
            });
        }
        mount();
    }, []);

    useEffect(() => {

    })

    return (
        <>
            <div className='achvm-update-header'>
                <div
                    className='achvm-update-header-backspace'
                    onClick={() => navigate('/general/achievement/view/' + idx)}
                ></div>
                <div className='achvm-update-header-title'>{achvm.name}</div>
                <button
                    className='achvm-update-header-btn'
                    onClick={() => submit()}>
                    수정 확인</button>
            </div>
            <div className='achvm-update-body'>
                <div className='achvm-update-body-name'>
                    <div className='achvm-update-body-name-label'>업적 제목</div>
                    <input className='achvm-update-body-name-value'
                        type='text'
                        id='name'
                        defaultValue={achvm.name || ''}
                        readOnly={achvm.type === 'A'}
                        onChange={onChange} />
                </div>
                <div className='achvm-update-body-detail'>
                    <div className='achvm-update-body-detail-label'>업적 설명</div>
                    <textarea className='achvm-update-body-detail-value'
                        id='detail'
                        defaultValue={achvm.detail || ''}
                        readOnly />
                </div>
                <div className='achvm-update-body-badge'>
                    <div className='achvm-update-body-badge-label'>뱃지 이미지</div>
                    <label className='achvm-update-body-badge-value'
                        id='badge' htmlFor='badgeUpload'>+</label>
                    <input
                        type='file'
                        className='achvm-update-body-badge-upload'
                        id='badgeUpload'
                        style={{ display: 'none' }}
                        accept='image/*' />
                </div>
                {achvm.type === 'C' &&
                    <div className='achvm-update-body-condition'>
                        <div className='achvm-update-body-condition-label'>업적 부여 조건</div>
                        <div className='achvm-update-body-condition-wrapper'>
                            <input
                                type='number'
                                className='achvm-update-body-condition-value'
                                defaultValue={achvm.rosary_condition}
                                onChange={onConditionChange}
                                id='rosary_condition' />
                            <span className='achvm-update-body-condition-value-span'>단 이상 묵주기도</span>
                        </div>
                    </div>
                }
                <div className='achvm-update-body-term'>
                    <div className='achvm-update-body-term-label'>기간 설정</div>
                    <div className='achvm-update-body-term-value'>
                        {achvm.type === 'C' && <>
                            <input
                                className='achvm-update-body-term-value-start'
                                type='date'
                                id='term_start'
                                max={achvm.term_end || ''}
                                defaultValue={achvm.term_start}
                                onChange={onChange}
                            />
                            <span className='achvm-update-body-term-value-span'> ~ </span>
                            <input className='achvm-update-body-term-value-end'
                                type='date'
                                id='term_end'
                                min={achvm.term_start || ''}
                                defaultValue={achvm.term_end}
                                onChange={onChange}
                            />
                        </>}
                        {achvm.type === 'A' && <>
                            <input
                                className='achvm-update-body-term-value-default'
                                type='text'
                                value='상시'
                                readOnly />
                        </>}
                    </div>
                </div>
                {isModalOn &&
                    <Modal modalData={modalData} offModal={offModal} />
                }
            </div>
        </>
    )
}

export default UpdateAchvm