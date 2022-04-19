import React, { useEffect } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import AddFAQ from './AddFAQ/AddFAQ';
import FAQList from './FAQList/FAQList';
import UpdateFAQ from './UpdateFAQ/UpdateFAQ';
import ViewFAQ from './ViewFAQ/ViewFAQ';

function FAQ({ setPage }) {
    const Elements = useRoutes([
        { path: '/', element: <FAQList />, index: true },
        { path: '/add', element: <AddFAQ /> },
        { path: '/view/:idx', element: <ViewFAQ /> },
        { path: '/update/:idx', element: <UpdateFAQ /> }
    ]);

    useEffect(() => {
        setPage('faq');
    }, []);

    return (
        <>
            {Elements}
        </>
    )
}

export default FAQ