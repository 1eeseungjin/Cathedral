// 관리자 관리 페이지

import React, { useState } from 'react';
import './index.scss';
import SearchIcon from '../../@static/icon/search';
import AdminList from './AdminList/AdminList.js';
import AdminWaitList from './AdminList/AdminWaitList.js';
import AdminCancelledList from './AdminList/AdminCancelledList.js';

function Admin() {

  const [tab, setTab] = useState('관리자 목록')

  return (
    <div className='admin-manage'>
      <div className='admin-manage-header'>
        <div className='admin-manage-header-title' style={{ flex: 1 }}>관리자 계정 관리</div>
        <div style={{ flex: 1, }} className='f row aCenter'>
          <div style={{ flex: 1 }}></div>
          <div className='admin-manage-tab' style={{ marginRight: 20 }}>
            <div
              className={`admin-manage-tab-item first ${tab === '관리자 목록' && 'active'
                }`}
              onClick={() => {
                setTab('관리자 목록')
              }}>관리자 목록</div>

            <div
              className={`admin-manage-tab-item ${tab === '승인대기자' && 'active'
                }`}
              onClick={() => {
                setTab('승인대기자')
              }}>본당관리자 승인</div>

            <div
              className={`admin-manage-tab-item third ${tab === '승인반려내역' && 'active'
                }`}
              onClick={() => {
                setTab('승인반려내역')
              }}>반려내역</div>
          </div>
          <div className='admin-manage-header-search'>
            <input className='admin-manage-header-search-input' />
            <SearchIcon />
          </div>
        </div>

      </div>


      {tab == "관리자 목록" && <AdminList />}
      {tab == "승인대기자" && <AdminWaitList />}
      {tab == "승인반려내역" && <AdminCancelledList />}
    </div>
  )
}

export default Admin