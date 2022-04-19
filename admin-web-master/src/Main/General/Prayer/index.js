import React, { useEffect } from 'react'
import { useLocation, useParams, useRoutes } from 'react-router-dom';
import PrayerList from './PrayerList/PrayerList';
import UpdatePrayer from './UpdatePrayer/UpdatePrayer';
import './index.scss';

function Prayer({ setPage }) {
    const Elements = useRoutes([
        { path: '/', element: <PrayerList />, index: true },
        { path: '/update/:idx', element: <UpdatePrayer /> },
    ]);

    useEffect(() => {
        setPage('prayer');
    }, []);

    return (
        <>
            {Elements}
        </>)
}

export default Prayer