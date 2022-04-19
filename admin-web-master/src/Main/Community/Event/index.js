import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../@store/userInfo';
import EventList from './EventList/EventList';
import ViewEvent from './ViewEvent/ViewEvent';
import UpdateEvent from './UpdateEvent/UpdateEvent';
import AddEvent from './AddEvent/AddEvent';
import './index.scss';

const ProtectedRoute = ({ redirectPath = '/community/event', children }) => {
    const [userInfo] = useRecoilState(userInfoState);
    return (userInfo.permission === "교구" || userInfo.permission === "본당")
        ? <Navigate to={redirectPath} replace /> : children;
}

const Event = () => {
    const Elements = useRoutes([
        { path: '/', element: <EventList />, index: true },
        { path: '/view/:idx', element: <ViewEvent /> },
        { path: '/update/:idx', element: <ProtectedRoute><UpdateEvent /></ProtectedRoute> },
        { path: '/add', element: <ProtectedRoute><AddEvent /></ProtectedRoute> },
    ]);

    return (
        <div className='event'>
            <div className='event-header'>
                <div className='event-header-title'>게시판 관리</div>
                <div className='event-header-search'></div>
            </div>
            <div className='event-body'>
                {Elements}
            </div>
        </div>)
}

export default Event