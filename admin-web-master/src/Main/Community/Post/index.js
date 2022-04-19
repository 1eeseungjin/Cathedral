import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import PostList from './PostList/PostList';
import ViewPost from './ViewPost/ViewPost';
import './index.scss';
import UpdatePost from './UpdatePost/UpdatePost';
import AddPost from './AddPost/AddPost';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../@store/userInfo';

const ProtectedRoute = ({ redirectPath = '/community/post', children }) => {
    const [userInfo] = useRecoilState(userInfoState);
    return (userInfo.permission === "교구" || userInfo.permission === "본당")
        ? children
        : <Navigate to={redirectPath} replace />;
}

const Posts = () => {
    const Elements = useRoutes([
        { path: '/', element: <PostList />, index: true },
        { path: '/view/:idx', element: <ViewPost /> },
        { path: '/update/:idx', element: <ProtectedRoute><UpdatePost /></ProtectedRoute> },
        { path: '/add', element: <ProtectedRoute><AddPost /></ProtectedRoute> },
    ]);

    return Elements;
}

export default Posts