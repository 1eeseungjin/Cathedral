import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import prayerApi from '../../../../@api/prayerApi';
import { functions } from '../../../Community/Functions/functions';
import './ViewAchvm.scss';

function ViewAchvm() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const [achvm, setAchvm] = useState({});
    const {
        getAchievement
    } = prayerApi;

    useEffect(() => {
        const mount = async () => {
            const res = await getAchievement(idx);
            setAchvm(res.achvm[0]);
        }
        mount();
    }, []);

    return (
        <>
            <div className='achvm-view-header'>
                <div
                    className='achvm-view-header-backspace'
                    onClick={() => navigate('/general/achievement')}
                ></div>
                <div className='achvm-view-header-title'>{achvm.name}</div>
                <button
                    className='achvm-view-header-btn'
                    onClick={() => navigate('/general/achievement/update/' + idx)}>
                    수정하기</button>
            </div>
            <div className='achvm-view-body'>
                <div className='achvm-view-body-name'>
                    <div className='achvm-view-body-name-label'>업적 제목</div>
                    <input className='achvm-view-body-name-value'
                        type='text'
                        id='name'
                        value={achvm.name || ''}
                        readOnly />
                </div>
                <div className='achvm-view-body-detail'>
                    <div className='achvm-view-body-detail-label'>업적 설명</div>
                    <textarea className='achvm-view-body-detail-value'
                        id='detail' value={achvm.detail || ''} readOnly />
                </div>
                <div className='achvm-view-body-badge'>
                    <div className='achvm-view-body-badge-label'>뱃지 이미지</div>
                    <label className='achvm-view-body-badge-value'
                        id='badge' htmlFor='badgeUpload'>+</label>
                    <input
                        type='file'
                        className='achvm-view-body-badge-upload'
                        id='badgeUpload'
                        style={{ display: 'none' }}
                        accept='image/*' />
                </div>
                {achvm.type === 'C' &&
                    <div className='achvm-view-body-condition'>
                        <div className='achvm-view-body-condition-label'>업적 부여 조건</div>
                        <div className='achvm-view-body-condition-wrapper'>
                            <input
                                type='number'
                                className='achvm-view-body-condition-value'
                                value={parseInt(achvm.rosary_condition)}
                                readOnly />
                            <span className='achvm-view-body-condition-value-span'>단 이상 묵주기도</span>
                        </div>
                    </div>
                }
                <div className='achvm-view-body-term'>
                    <div className='achvm-view-body-term-label'>기간 설정</div>
                    <div className='achvm-view-body-term-value'>
                        {achvm.type === 'C' && <>
                            <input
                                className='achvm-view-body-term-value-start'
                                type='date'
                                id='term_start'
                                value={dayjs(functions.ISOtoLocal(achvm.term_start)).format('YYYY-MM-DD')}
                                readOnly />
                            <span className='achvm-view-body-term-value-span'> ~ </span>
                            <input className='achvm-view-body-term-value-end'
                                type='date'
                                id='term_end'
                                value={dayjs(functions.ISOtoLocal(achvm.term_end)).format('YYYY-MM-DD')}
                                readOnly />
                        </>}
                        {achvm.type === 'A' && <>
                            <input
                                className='achvm-view-body-term-value-default'
                                type='text'
                                value='상시'
                                readOnly />
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewAchvm