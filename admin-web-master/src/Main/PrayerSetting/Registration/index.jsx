import React, { useState, useEffect } from 'react';
import prayerApi from '../../../@api/prayerApi';
import './index.scss';

const Registration = ({ setPrayerType, isRevise, reviseList }) => {

    const [division, setDivision] = useState(isRevise ? reviseList.division : '');
    const [select, setSelect] = useState(isRevise ? reviseList.select : '');
    const [target, setTarget] = useState(isRevise ? reviseList.target : ''); // 체크 안한 것, 일반, 레지오 세 state가 있어서 boolean 사용하지 않음
    const [title, setTitle] = useState(isRevise ? reviseList.title : '');
    const [contents, setContents] = useState(isRevise ? reviseList.contents : '');
    const [record_file, setRecord_file] = useState(isRevise ? reviseList.record_file : '');
    const [image, setImage] = useState(isRevise ? reviseList.image : '');

    const checkDivisionHandler = (type) => {
        setDivision(division == type ? '' : type);
        if (type == '전체') {
            setSelect('');
        }
    };
    const checkSelectHandler = (type) => {
        setSelect(select == type ? '' : type);
    };
    const checkTargetHandler = (type) => {
        setTarget(target == type ? '' : type);
    };
    const titleHandler = (e) => {
        setTitle(e.target.value);
    };
    const contentsHandler = (e) => { // \n 고려
        setContents(e.target.value);
    };
    const record_fileHandler = (e) => { // \n 고려
        setRecord_file(e.target.value);
    };
    const imageHandler = (e) => { // \n 고려
        setImage(e.target.value);
    };

    return (
        <div className='registration'>
            <div className='registration-header'>
                전체기도문 등록
            </div>
            <div>
                <div className='registration-body'>
                    <div className='registration-body-left'>
                        <div className='registration-body-left-top'>
                            <div className='registration-body-left-top-title'>
                                <div className='registration-body-left-top-title-text'>
                                    기도문 제목
                                    <div className='registration-body-left-top-title-text-star'>
                                        *
                                    </div>
                                </div>
                                <input className='registration-body-left-top-title-input' value={title} onChange={titleHandler} />
                            </div>
                            <div className='registration-body-left-top-division'>
                                <div className='registration-body-left-top-division-text'>
                                    <div className='registration-body-left-top-division-text-left'>
                                        기도문 분류
                                    </div>
                                    <div className='registration-body-left-top-division-text-center'>
                                        *
                                    </div>
                                    <div className='registration-body-left-top-division-text-right'>
                                        · 각 카테고리 별 하나씩 선택해주세요.
                                    </div>
                                </div>
                                <div className='registration-body-left-top-division-check'>
                                    <div className='registration-body-left-top-division-check-line'>
                                        <div className='registration-body-left-top-division-check-line-title'>
                                            구분
                                        </div>
                                        <div className='registration-body-left-top-division-check-line-contents'>
                                            <input type='checkbox' checked={division == '전체' ? true : false} onChange={(e) => checkDivisionHandler('전체')} />
                                            &nbsp;전체
                                        </div>
                                        <div className='registration-body-left-top-division-check-line-contents'>
                                            <input type='checkbox' checked={division == '청원' ? true : false} onChange={(e) => checkDivisionHandler('청원')} />
                                            &nbsp;청원
                                        </div>
                                        <div className='registration-body-left-top-division-check-line-contents'>
                                            <input type='checkbox' checked={division == '감사' ? true : false} onChange={(e) => checkDivisionHandler('감사')} />
                                            &nbsp;감사
                                        </div>
                                    </div>
                                    <div className='registration-body-left-top-division-check-line'>
                                        <div className='registration-body-left-top-division-check-line-title'>
                                            선택
                                        </div>
                                        <div className='registration-body-left-top-division-check-line-contents'>
                                            <input type='checkbox' checked={select == '환희' ? true : false} onChange={(e) => checkSelectHandler('환희')} />
                                            &nbsp;환희
                                        </div>
                                        <div className='registration-body-left-top-division-check-line-contents'>
                                            <input type='checkbox' checked={select == '고통' ? true : false} onChange={(e) => checkSelectHandler('고통')} />
                                            &nbsp;고통
                                        </div>
                                        <div className='registration-body-left-top-division-check-line-contents'>
                                            <input type='checkbox' checked={select == '영광' ? true : false} onChange={(e) => checkSelectHandler('영광')} />
                                            &nbsp;영광
                                        </div>
                                        <div className='registration-body-left-top-division-check-line-contents'>
                                            <input type='checkbox' checked={select == '빛' ? true : false} onChange={(e) => checkSelectHandler('빛')} />
                                            &nbsp;빛
                                        </div>
                                    </div>

                                    <div className='registration-body-left-top-division-check-line'>
                                        <div className='registration-body-left-top-division-check-line-title'>
                                            대상
                                        </div>
                                        <div className='registration-body-left-top-division-check-line-contents'>
                                            <input type='checkbox' checked={target == 'T' ? true : false} onChange={(e) => checkTargetHandler('T')} />
                                            &nbsp;일반 단원
                                        </div>
                                        <div className='registration-body-left-top-division-check-line-contents'>
                                            <input type='checkbox' checked={target == 'F' ? true : false} onChange={(e) => checkTargetHandler('F')} />
                                            &nbsp;레지오 단원
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='registration-body-left-down'>
                            <div className='registration-body-left-down-main'>
                                기도문 본문
                                <div className='registration-body-left-down-main-star'>
                                    *
                                </div>
                            </div>
                            <textarea className='registration-body-left-down-input' value={contents} onChange={contentsHandler}>
                            </textarea>
                        </div>
                    </div>
                    <div className='registration-body-right'>
                        기도문 화면 미리보기
                        <div className='registration-body-right-title'>
                            {title == '' ? '기도문 제목' : title}
                        </div>
                        <div className='registration-body-right-contents'>
                            {contents == '' ? '기도문 내용(애니메이션처리부분)' : contents}
                        </div>
                    </div>
                </div>
                <div className='registration-footer'>
                    <div className='registration-footer-file'>
                        <div>
                            녹음파일
                        </div>
                        <div className='registration-footer-file-post'>
                            <input className='registration-footer-file-post-input' value={record_file} onChange={record_fileHandler} />
                            <div className='registration-footer-file-post-button'>
                                첨부
                            </div>
                        </div>
                    </div>
                    <div className='registration-footer-file'>
                        <div>
                            배경 이미지
                        </div>
                        <div className='registration-footer-file-post'>
                            <input className='registration-footer-file-post-input' value={image} onChange={imageHandler} />
                            <div className='registration-footer-file-post-button'>
                                첨부
                            </div>
                        </div>
                    </div>
                    <div className='registration-footer-button'>
                        <div className='registration-footer-button-finish'
                            onClick={() => { setPrayerType('전체 기도문') }}>
                            취소
                        </div>
                        <div className='registration-footer-button-finish'
                            onClick={() => {
                                if (
                                    division == '' ||
                                    (division != '전체' && select == '') ||
                                    target == '' ||
                                    title == '' ||
                                    contents == ''
                                ) {
                                    alert('기도문 정보를 빠짐 없이 기입해주세요.');
                                }
                                else {
                                    if (isRevise) {
                                        prayerApi.postUpdate(reviseList.idx, title, contents, division, select, target, record_file, image).then(rs => {
                                            if (rs.success) {
                                                setPrayerType('전체 기도문');
                                            } else {
                                                alert('등록에 실패하였습니다. 다시 시도해주세요.');
                                            }
                                        })
                                    } else {
                                        prayerApi.postRegistration(title, contents, division, select, target, record_file, image).then(rs => {
                                            if (rs.success) {
                                                setPrayerType('전체 기도문');
                                            } else {
                                                alert('등록에 실패하였습니다. 다시 시도해주세요.');
                                            }
                                        })
                                    }
                                }
                            }}>
                            완료
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Registration;