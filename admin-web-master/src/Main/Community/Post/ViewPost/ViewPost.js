import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userInfoState } from '../../../../@store/userInfo';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import config from '../../../../config';
import './ViewPost.scss';
import Preview from '../../Components/Preview/Preview';
import Comments from '../../Components/Comments/Comments';
import Attachments from '../../Components/Attachments/Attachments';
import ModifyContents from '../../Components/ModifyContents/ModifyContents';
import Modal from '../../Components/Modal/Modal';

const ViewPost = () => {
    const [userInfo] = useRecoilState(userInfoState);
    const [data, setData] = useState({
        type: '커뮤니티 게시판',
        modifiable: false,
        contents: {},
        files: []
    })
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const { idx } = useParams();
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const deletePopUp = async () => {
        setModalData({
            title: '게시글 삭제',
            contents: '이 글을 삭제하시겠습니까?',
            isConfirm: 'true',
            confirmMethod: async () => {
                await axios.delete(config.api + "community/post/delete/" + idx)
                    .then(res => navigate('/community/post'))
                    .catch(err => alert(err));
            }
        })
        setIsModalOn(true);
    }

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(config.api + 'community/post/view/' + idx)
                .catch(err => alert(err));
            if (((userInfo.permission === "교구" && res.data.position === userInfo.residence)
                || (userInfo.permission === "본당" && res.data.position === userInfo.temple))
                || userInfo.permission === "마스터") {
                setData(data => ({ ...data, contents: res.data }));
            } else navigate('/community/post');
        }
        getData();
    }, [idx, userInfo, navigate]);

    return (<>
        <div className='post-view'>
            <div className='post-view-header'>
                <div className='post-view-header-title'>게시판 관리</div>
                <div className='post-view-header-search'></div>
            </div>
            <div className='post-view-body'>
                <div className='post-view-body-header'>
                    <div className='post-view-body-header-backspace' onClick={() => navigate('/community/post')}></div>
                    <div className='post-view-body-header-title'>{data.contents.title}</div>
                    {(userInfo.permission === "교구" || userInfo.permission === "본당") && <>
                        <button className='post-view-body-header-btn' onClick={() => navigate('/community/post/update/' + idx)}>게시글 수정</button>
                    </>}
                    <button className='post-view-body-header-btn' onClick={() => deletePopUp()}>게시글 삭제</button>
                </div>
                <div className='post-view-body-body'>
                    {(userInfo.permission === "교구" || userInfo.permission === "본당") && <>
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

export default ViewPost