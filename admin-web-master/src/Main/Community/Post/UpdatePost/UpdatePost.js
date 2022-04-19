import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { userInfoState } from '../../../../@store/userInfo';
import { useRecoilState } from 'recoil';
import ModifyContents from '../../Components/ModifyContents/ModifyContents';
import Attachments from '../../Components/Attachments/Attachments';
import Preview from '../../Components/Preview/Preview';
import Comments from '../../Components/Comments/Comments';
import './UpdatePost.scss';
import Modal from '../../Components/Modal/Modal';

const UpdatePost = () => {
    const [userInfo] = useRecoilState(userInfoState);
    const [data, setData] = useState({
        type: '커뮤니티 게시판',
        modifiable: true,
        contents: {},
        files: []
    })
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const { idx } = useParams();
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const submit = async () => {
        setModalData({
            title: '게시글 수정',
            contents: '수정하시겠습니까?',
            isConfirm: true,
            confirmMethod: async () => {
                await axios.put(config.api + "community/post/update/" + idx, data.contents)
                    .then(res => navigate('/community/post/view/' + idx, { replace: true }))
                    .catch(err => alert(err));
            }
        });
        setIsModalOn(true);
    }

    // 저장된 데이터
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(config.api + 'community/post/view/' + idx)
                .catch(err => alert(err));
            if (!((userInfo.permission === "교구" && res.data.position === userInfo.residence) ||
                (userInfo.permission === "본당" && res.data.position === userInfo.temple)))
                navigate('/community/post');
            setData(data => ({ ...data, contents: res.data }));
        }
        getData();
    }, [idx, userInfo, navigate]);

    return (<>
        <div className='post-update'>
            <div className='post-update-header'>
                <div className='post-update-header-title'>게시판 관리</div>
                <div className='post-update-header-search'></div>
            </div>
            <div className='post-update-body'>
                <div className='post-update-body-header'>
                    <div className='post-update-body-header-backspace' onClick={() => navigate('/community/post')}></div>
                    <div className='post-update-body-header-title'>게시글 수정</div>
                    <button className='post-update-body-header-btn' onClick={() => submit()}>수정 확인</button>
                </div>
                <div className='post-update-body-body'>
                    {(userInfo.permission === "교구" || userInfo.permission === "본당") &&
                        <>
                            <ModifyContents data={data} setData={setData} />
                            <Attachments data={data} setData={setData} />
                        </>}
                    <Preview data={data} />
                    <Comments postIdx={data.contents.idx} />
                </div>
                {isModalOn &&
                    <Modal offModal={offModal} modalData={modalData} />
                }
            </div>
        </div>
    </>)
}

export default UpdatePost