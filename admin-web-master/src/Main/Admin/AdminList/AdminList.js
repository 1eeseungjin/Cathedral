//관리자 목록 리스트

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import adminApi from "../../../@api/adminApi";
import Sort from "../../../@plugins/sort.js";
import Excel from "../../../@plugins/Excel";
import AdminItem from "./AdminItem/AdminItem";
import "./AdminList.scss";
import adminManage from "../../../@store/adminManage";
import Arrow from "../../../@static/icon/Arrow.png";

function List() {
  const [adminList, setAdminList] = useState([]);
  const [mappedList, setMappedList] = useState([]);
  const [idState, setIdState] = useRecoilState(adminManage.AdminIdState);
  const [checkedIdState, setCheckedIdState] = useRecoilState(
    adminManage.AdminCheckedIdState
  );
  const [sort, setSort] = useState({
    created_at: false,
    name: false,
    baptismal: false,
    id: false,
    permission: false,
    temple: false,
  });

  const mappingList = (newValue) => {
    setMappedList(
      newValue.map((item, index) => {
        return <AdminItem admin={item} index={index} />;
      })
    );
  };

  useEffect(() => {
    setAdminList(Sort(adminList, sort.created_at, "created_at"));
    mappingList(adminList);
  }, [sort.created_at]);

  useEffect(() => {
    setAdminList(Sort(adminList, sort.name, "name"));
    mappingList(adminList);
  }, [sort.name]);

  useEffect(() => {
    setAdminList(Sort(adminList, sort.baptismal, "baptismal"));
    mappingList(adminList);
  }, [sort.baptismal]);

  useEffect(() => {
    setAdminList(Sort(adminList, sort.id, "id"));
    mappingList(adminList);
  }, [sort.id]);

  useEffect(() => {
    setAdminList(Sort(adminList, sort.permission, "permission"));
    mappingList(adminList);
  }, [sort.permission]);

  useEffect(() => {
    setAdminList(Sort(adminList, sort.temple, "temple"));
    mappingList(adminList);
  }, [sort.temple]);

  useEffect(() => {
    adminApi
      .getAdminList()
      .then((value) => {
        const newValue = value.adminList.map((value) => {
          const changedValue = value;
          const created_at = new Date(value.created_at);
          changedValue.created_at = `${created_at.getFullYear()}-${created_at
            .getMonth()
            .toString()
            .padStart(2, "0")}-${created_at
              .getDay()
              .toString()
              .padStart(2, "0")}`;
          return changedValue;
        });
        setAdminList(newValue);
        mappingList(newValue);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    setIdState(
      adminList.map((value) => {
        return value.id;
      })
    );
  }, [adminList]);

  return (
    <div className="admin-list" style={{marginTop:40}}>
      <div className="admin-list-header" style={{ fontSize: 28, fontWeight: 700 }}>
        관리자 목록
        <div className="admin-list-header-end">
        </div>

        <button className="admin-list-button">교구관리자 등록</button>
      </div>
      <div style={{ marginTop: 32 }}></div>
      <div className="admin-list-info">
        <div
          className="admin-list-info-item-created-at"
          onClick={() => {
            setSort({
              ...sort,
              created_at: !sort.created_at,
            });
          }}
        >
          등록일 <img src={Arrow} />
        </div>
        <div
          className="admin-list-info-item-name"
          onClick={() => {
            setSort({
              ...sort,
              name: !sort.name,
            });
          }}
        >
          관리자명 <img src={Arrow} />
        </div>
        <div
          className="admin-list-info-item-baptismal"
          onClick={() => {
            setSort({
              ...sort,
              baptismal: !sort.baptismal,
            });
          }}
        >
          세례명 <img src={Arrow} />
        </div>
        <div className="admin-list-info-item-residence"
          onClick={() => {
            setSort({
              ...sort,
              id: !sort.residence,
            });
          }}
        >소속교구<img src={Arrow} /></div>
        <div
          className="admin-list-info-item-temple"
          onClick={() => {
            setSort({
              ...sort,
              id: !sort.temple,
            });
          }}
        >
          {" "}
          소속본당 <img src={Arrow} />
        </div>

        <div
          className="admin-list-info-item-permission">권한 <img src={Arrow} /></div>
        <div
          className="admin-list-info-item-cancel-cause"></div>
      </div>


      <div className="admin-list-info-divide-line" />
      <div className="admin-list-data">{mappedList}</div>
    </div>
  );
}

export default List;
