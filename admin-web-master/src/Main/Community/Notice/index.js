import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import NoticeList from './NoticeList/NoticeList';
import ViewNotice from './ViewNotice/ViewNotice';
import UpdateNotice from './UpdateNotice/UpdateNotice';
import AddNotice from './AddNotice/AddNotice';
import './index.scss';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../@store/userInfo';

const ProtectedRoute = ({ redirectPath = '/community/notice', children }) => {
    const [userInfo] = useRecoilState(userInfoState);
    return (userInfo.permission === "교구" || userInfo.permission === "본당")
        ? <Navigate to={redirectPath} replace /> : children;
}

const Notice = () => {
    const Elements = useRoutes([
        { path: '/', element: <NoticeList />, index: true },
        { path: '/view/:idx', element: <ViewNotice /> },
        { path: '/update/:idx', element: <ProtectedRoute><UpdateNotice /></ProtectedRoute> },
        { path: '/add', element: <ProtectedRoute><AddNotice /></ProtectedRoute> },
    ]);

    return (
        <div className='notice'>
            <div className='notice-header'>
                <div className='notice-header-title'>게시판 관리</div>
                <div className='notice-header-search'></div>
            </div>
            <div className='notice-body'>
                {Elements}
            </div>
        </div>
    )
}

export default Notice