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
    <div className="admin-list">
      <div className="admin-list-header" style={{fontSize:28, fontWeight:700}}>
        관리자 목록
        <div className="admin-list-header-end">
          {/* <div className='admin-list-header-end-search-result'>검색 결과: 총 {adminList.length}건</div> */}
          {/* <button 
                        className='admin-list-header-end-save-excel'
                        onClick={() => {
                            Excel.saveExcel("관리자_리스트", adminList.map((value) => {
                                return {
                                    idx: value.idx,
                                    created_at: value.created_at,
                                    name: value.name,
                                    baptismal: value.baptismal,
                                    id: value.id,
                                    phone: value.phone,
                                    permission: value.permission,
                                    temple: value.temple
                                }
                            }), ["번호", "등록일", "이름", "세례명", "아이디", "전화번호", "권한", "본당"])
                        }}>엑셀 저장 &gt;</button> */}
        </div>
        {/* <div className="admin-list-header-end">
          <button className="admin-list-button">등급 변경</button>
          <button className="admin-list-button">탈퇴처리</button>
        </div> */}
        {/* <div className="admin-list-header-end"> */}
         
          <button className="admin-list-button">교구관리자 등록</button>
        {/* </div> */}
      </div>
      <div style={{marginTop:32}}></div>
      <div className="admin-list-info">
        {/* <input className='admin-list-info-item-checkbox' 
                    type='checkbox'
                    checked={idState.length === checkedIdState.length}
                    onChange={(v) => {
                        setCheckedIdState(v.target.checked ? idState : [])
                    }}/> */}
        {/* <div className='admin-list-info-item-idx'>번호</div> */}
        <div
          className="admin-list-info-item-created-at"
          onClick={() => {
            setSort({
              ...sort,
              created_at: !sort.created_at,
            });
          }}
        >
          등록일 <img src={Arrow}/>
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
          관리자명 <img src={Arrow}/>
          {/* {sort.name ? "△" : "▽"} */}
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
          세례명 <img src={Arrow}/>
          {/* {sort.baptismal ? "△" : "▽"} */}
        </div>
        <div className="admin-list-info-item-id"> 소속교구<img src={Arrow}/></div>
        <div
          className="admin-list-info-item-id"
          onClick={() => {
            setSort({
              ...sort,
              id: !sort.id,
            });
            //     }}>
            //         아이디{sort.id ? '△' : '▽'}</div>
            // <div className='admin-list-info-item-phone'>전화번호</div>
            // <div className='admin-list-info-item-permission'
            //     onClick={() => {
            //         setSort({
            //             ...sort,
            //             permission: !sort.permission
            //         })
          }}
        >
          {" "}
          소속본당 <img src={Arrow}/>
          {/* {sort.temple ? "△" : "▽"} */}
        </div>
      
        <div
          className="admin-list-info-item-id">권한 <img src={Arrow}/></div>
        
        {/* {sort.permission ? "△" : "▽"} */}
      </div>
      <div
        className="admin-list-info-item-temple"
        onClick={() => {
          setSort({
            ...sort,
            temple: !sort.temple,
          });
        }}
      >
        
      </div>
      <div className="admin-list-info-divide-line" />
      <div className="admin-list-data">{mappedList}</div>
      {/* <div className='admin-list-bottom'>
                <div className='admin-list-bottom-button'>관리자 추가</div>
                <div className='admin-list-bottom-button'>일괄 등록</div>
            </div> */}
    </div>
  );
}

export default List;
