// 신자관리 페이지

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import SearchIcon from '../../@static/icon/search';
import { SelectAtom } from '../../@store/userManage';
import './User.scss';
import List from './UserLIst/List';

function UserComponent() {
  const [select, setSelect] = useRecoilState(SelectAtom);

  return (
    <>
      <div className="user-manage">
        <div className="user-manage-header">
          <div className="user-manage-header-title">회원 관리</div>
          <div style={{ display: 'flex' }}>
            <div className="user-manage-header-select">
              <div
                className={`user-manage-header-select-item first ${
                  select === '전체 신자' && 'active'
                }`}
                onClick={() => {
                  setSelect('전체 신자');
                }}
              >
                전체 회원
              </div>
              <div
                className={`user-manage-header-select-item second ${
                  select === '신고된 신자' && 'active'
                }`}
                onClick={() => {
                  setSelect('신고된 신자');
                }}
              >
                신고된 회원
              </div>
              <div
                className={`user-manage-header-select-item third ${
                  select === '장기 미접속' && 'active'
                }`}
                onClick={() => {
                  setSelect('장기 미접속');
                }}
              >
                장기 미접속 회원
              </div>
              <div
                className={`user-manage-header-select-item fourth ${
                  select === '차단' && 'active'
                }`}
                onClick={() => {
                  setSelect('차단');
                }}
              >
                차단된 회원
              </div>
            </div>
            <div className="user-manage-header-search">
              <input className="user-manage-header-search-input" />
              <SearchIcon />
            </div>
          </div>
        </div>
        <List type={select} />
      </div>
    </>
  );
}

export default UserComponent;
