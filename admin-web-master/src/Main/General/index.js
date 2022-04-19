// 일반정보 페이지
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import Prayer from './Prayer';
import './index.scss';
import AutoText from './AutoText/AutoText';
import Achievement from './Achievement/index';
import FAQ from './FAQ/index';

function General() {
  const [page, setPage] = useState('');
  const Elements = useRoutes([
    { path: '/', element: <Navigate replace to="prayer" />, index: true },
    { path: '/prayer/*', element: <Prayer setPage={setPage} />, index: true },
    { path: '/autotext', element: <AutoText setPage={setPage} /> },
    { path: '/achievement/*', element: <Achievement setPage={setPage} /> },
    { path: '/faq/*', element: <FAQ setPage={setPage} /> }

  ]);
  const navigate = useNavigate();

  const onPageChange = e => {
    navigate('/general/' + e.target.id);
  };

  return (
    <div className='general'>
      <div className='general-header'>
        <div className='general-header-title'>일반정보관리</div>
        <div className='general-header-radios'>
          <input type='radio' className='general-header-radios-radio' name='page' id='prayer' checked={page === 'prayer'} onChange={onPageChange} />
          <label className='general-header-radios-label' id='prayer' htmlFor='prayer'>기도문</label>
          <input type='radio' className='general-header-radios-radio' name='page' id='autotext' checked={page === 'autotext'} onChange={onPageChange} />
          <label className='general-header-radios-label' id='autotext' htmlFor='autotext'>자동완성 텍스트</label>
          <input type='radio' className='general-header-radios-radio' name='page' id='achievement' checked={page === 'achievement'} onChange={onPageChange} />
          <label className='general-header-radios-label' id='achievement' htmlFor='achievement'>업적</label>
          <input type='radio' className='general-header-radios-radio' name='page' id='faq' checked={page === 'faq'} onChange={onPageChange} />
          <label className='general-header-radios-label' id='faq' htmlFor='faq'>FAQ 관리</label>
        </div>
        <div className='general-header-search'></div>
      </div>
      <div className='general-body'>
        {Elements}
      </div>
    </div >
  )
}

export default General