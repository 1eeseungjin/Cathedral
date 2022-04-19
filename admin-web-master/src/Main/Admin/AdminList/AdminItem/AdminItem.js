//관리자 목록 아이템

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import adminManage from "../../../../@store/adminManage";
import "./AdminItem.scss";
import Modal from "./Modal/Modal";

function AdminItem({ admin }) {
  const [checkedIdState, setCheckedIdState] = useRecoilState(
    adminManage.AdminCheckedIdState
  );

  return (
    <>
      <div className="admin-item">
        <div className="admin-item-info">
          <div className="admin-item-info-data">
            {/* <div className="admin-item-info-data-checkbox">
            </div> */}
            <div className="admin-item-info-data-created-at">
              {admin.created_at}
            </div>
            <div className="admin-item-info-data-name">{admin.name}</div>
            <div className="admin-item-info-data-baptismal">
              {admin.baptismal}
            </div>
            <div className="admin-item-info-data-residence">{admin.residence}</div>
            <div className="admin-item-info-data-temple">{admin.temple}</div>
            <div className="admin-item-info-data-permission">
              {admin.permission}
            </div>
            <div className="admin-item-info-data-cancel-cause" ><div style={{ paddingLeft: 350, fontSize: 30 }}>:</div></div>
          </div>

        </div>

        <div className="admin-item-divide-line" />
      </div>
    </>
  );
}

export default AdminItem;
