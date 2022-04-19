import React, { useEffect } from 'react'
import { useRoutes } from 'react-router-dom';
import AchvmList from './AchvmList/AchvmList';
import AddAchvm from './AddAchvm/AddAchvm';
import UpdateAchvm from './UpdateAchvm/UpdateAchvm';
import ViewAchvm from './ViewAchvm/ViewAchvm';

function Achievement({ setPage }) {
    const Elements = useRoutes([
        { path: '/', element: <AchvmList />, index: true },
        { path: '/add', element: <AddAchvm /> },
        { path: '/view/:idx', element: <ViewAchvm /> },
        { path: '/update/:idx', element: <UpdateAchvm /> }
    ]);

    useEffect(() => {
        setPage('achievement');
    }, [])

    return (
        <>
            {Elements}
        </>
    )
}

export default Achievement