// 커뮤니티 페이지
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Notice from './Notice/index';
import Event from './Event/index';
import Posts from './Post/index';
import './index.scss';

function Community() {
  const Elements = useRoutes([
    { path: '/', element: <Navigate replace to="post" />, index: true },
    { path: '/notice/*', element: <Notice /> },
    { path: '/event/*', element: <Event /> },
    { path: '/post/*', element: <Posts /> },
  ]);

  return (
    <div className='community'>
      {Elements}
    </div>
  )
}

export default Community