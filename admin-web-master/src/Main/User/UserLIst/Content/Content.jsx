import { useState, useEffect, useCallback } from 'react';
import Sort from '../../../../@plugins/sort';
import { useRecoilState } from 'recoil';
import Item from '../Item/Item';
import { checkListAtom, idListAtom } from '../../../../@store/userManage';
import './Content.scss';
import Reported from '../Item/Reported';
import Ban from '../Item/Ban';
import Dormancy from '../Item/Dormancy';
import Arrow from '../../../../@static/icon/Arrow.png';

const Content = ({ type, users }) => {
  const [sort, setSort] = useState({
    date: false,
    name: false,
    baptismal: false,
    id: false,
    temple: false,
    count: false,
    bandate: false,
    dormancy: false, //휴면
    banReason: false,
    idx: false,
    region: false,
    phone: false,
  });

  const [userList, setUserList] = useState([]);

  const onClickSort = (sort, value) => {
    setUserList(Sort(userList.slice(), sort, value));
  };

  const [IdList, setIdList] = useRecoilState(idListAtom);
  const [CheckList, setCheckList] = useRecoilState(checkListAtom);

  useEffect(() => {
    let idxs = [];

    users.map((user, i) => {
      idxs[i] = user.idx;
    });

    setIdList(idxs);
  }, [users]);

  const onChangeAll = (e) => {
    setCheckList(e.target.checked ? IdList : []);
  };

  useEffect(() => {
    setUserList(users);
  }, [users]);

  return (
    <>
      {type === '전체 신자' && (
        <div className="user-list-content">
          <div className="user-list-content-header">
            <div className="user-list-content-header-check">
              <input
                onChange={onChangeAll}
                type={'checkbox'}
                checked={CheckList.length === IdList.length}
              />
            </div>
            <div
              className="user-list-content-header-no"
              onClick={() => {
                setSort({
                  ...sort,
                  idx: !sort.idx,
                });

                onClickSort(sort.idx, 'idx');
              }}
            >
              번호
              <img src={Arrow} />
            </div>
            <div
              onClick={() => {
                setSort({
                  ...sort,
                  date: !sort.date,
                });

                onClickSort(sort.date, 'created_at');
              }}
              className="user-list-content-header-date"
            >
              가입일
              <img src={Arrow} />
            </div>
            <div
              className="user-list-content-header-name"
              onClick={() => {
                setSort({
                  ...sort,
                  name: !sort.name,
                });

                onClickSort(sort.name, 'name');
              }}
            >
              이름 <img src={Arrow} />
            </div>
            <div
              onClick={() => {
                setSort({
                  ...sort,
                  baptismal: !sort.baptismal,
                });

                onClickSort(sort.baptismal, 'baptismal');
              }}
              className="user-list-content-header-baptismal"
            >
              세레명 <img src={Arrow} />
            </div>
            <div
              onClick={() => {
                setSort({
                  ...sort,
                  id: !sort.id,
                });

                onClickSort(sort.id, 'id');
              }}
              className="user-list-content-header-id"
            >
              아이디 <img src={Arrow} />
            </div>
            <div
              onClick={() => {
                setSort({
                  ...sort,
                  phone: !sort.phone,
                });

                onClickSort(sort.phone, 'phone');
              }}
              className="user-list-content-header-phone"
            >
              전화번호
              <img src={Arrow} />
            </div>
            <div
              onClick={() => {
                setSort({
                  ...sort,
                  region: !sort.region,
                });

                onClickSort(sort.region, 'region_position');
              }}
              className="user-list-content-header-region"
            >
              교구
              <img src={Arrow} />
            </div>
            <div
              onClick={() => {
                setSort({
                  ...sort,
                  temple: !sort.temple,
                });

                onClickSort(sort.temple, 'temple');
              }}
              className="user-list-content-header-temple"
            >
              본당
              <img src={Arrow} />
            </div>
          </div>

          <div className="user-list-content-list">
            {userList &&
              userList.map((user) => {
                return <Item key={user.idx} user={user} />;
              })}
          </div>
        </div>
      )}

      {type === '신고된 신자' && (
        <>
          <div className="user-report">
            <div className="user-report-header">
              <div className="user-list-content-header-check">
                <input
                  onChange={onChangeAll}
                  type={'checkbox'}
                  checked={CheckList.length === IdList.length}
                />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    idx: !sort.idx,
                  });

                  onClickSort(sort.idx, 'idx');
                }}
                className="user-list-content-header-no"
              >
                번호
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    bandate: !sort.bandate,
                  });

                  onClickSort(sort.bandate, 'created_at');
                }}
                className="user-report-header-date"
              >
                신고일
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    name: !sort.name,
                  });

                  onClickSort(sort.name, 'name');
                }}
                className="user-report-header-name"
              >
                이름
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    id: !sort.id,
                  });

                  onClickSort(sort.id, 'id');
                }}
                className="user-report-header-id"
              >
                아이디 <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    region: !sort.region,
                  });

                  onClickSort(sort.region, 'region_position');
                }}
                className="user-report-header-region"
              >
                교구
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    temple: !sort.temple,
                  });

                  onClickSort(sort.temple, 'temple');
                }}
                className="user-report-header-temple"
              >
                본당 <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    count: !sort.count,
                  });

                  onClickSort(sort.count, 'count');
                }}
                className="user-report-header-count"
              >
                신고 횟수 <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    banReason: !sort.banReason,
                  });

                  onClickSort(sort.banReason, 'reason');
                }}
                className="user-report-header-reason"
              >
                신고 사유
                <img src={Arrow} />
              </div>
            </div>

            <div className="user-list-content-list">
              {userList &&
                userList.map((user) => {
                  return <Reported user={user} />;
                })}
            </div>
          </div>
        </>
      )}

      {type === '장기 미접속' && (
        <>
          <div className="user-report">
            <div className="user-report-header">
              <div className="user-list-content-header-check">
                <input
                  onChange={onChangeAll}
                  type={'checkbox'}
                  checked={CheckList.length === IdList.length}
                />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    idx: !sort.idx,
                  });

                  onClickSort(sort.idx, 'idx');
                }}
                className="user-list-content-header-no"
              >
                번호
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    date: !sort.date,
                  });

                  onClickSort(sort.date, 'created_at');
                }}
                className="user-report-header-date"
              >
                가입일
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    name: !sort.name,
                  });

                  onClickSort(sort.name, 'name');
                }}
                className="user-report-header-name"
              >
                이름
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    id: !sort.id,
                  });

                  onClickSort(sort.id, 'id');
                }}
                className="user-report-header-id"
              >
                아이디
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    region: !sort.region,
                  });

                  onClickSort(sort.region, 'region_position');
                }}
                className="user-report-header-region"
              >
                교구
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    temple: !sort.temple,
                  });

                  onClickSort(sort.temple, 'temple');
                }}
                className="user-report-header-temple"
              >
                본당
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    date: !sort.date,
                  });

                  onClickSort(sort.date, 'login_at');
                }}
                className="user-dormancy-header-date"
              >
                최근 접속일
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    dormancy: !sort.dormancy,
                  });

                  onClickSort(sort.dormancy, 'period');
                }}
                className="user-dormancy-header-date"
              >
                미접속 일수
                <img src={Arrow} />
              </div>
            </div>

            <div className="user-list-content-list">
              {userList &&
                userList.map((user) => {
                  return <Dormancy key={user.idx} user={user} />;
                })}
            </div>
          </div>
        </>
      )}

      {type === '차단' && (
        <>
          <div className="user-ban">
            <div className="user-ban-header">
              <div className="user-list-content-header-check">
                <input
                  onChange={onChangeAll}
                  type={'checkbox'}
                  checked={CheckList.length === IdList.length}
                />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    idx: !sort.idx,
                  });

                  onClickSort(sort.idx, 'idx');
                }}
                className="user-list-content-header-no"
              >
                번호
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    bandate: !sort.bandate,
                  });

                  onClickSort(sort.bandate, 'created_at');
                }}
                className="user-report-header-date"
              >
                등록일
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    name: !sort.name,
                  });

                  onClickSort(sort.name, 'name');
                }}
                className="user-report-header-name"
              >
                이름
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    id: !sort.id,
                  });

                  onClickSort(sort.id, 'id');
                }}
                className="user-report-header-id"
              >
                아이디
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    region: !sort.region,
                  });

                  onClickSort(sort.region, 'region_position');
                }}
                className="user-report-header-region"
              >
                교구
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    temple: !sort.temple,
                  });

                  onClickSort(sort.temple, 'temple');
                }}
                className="user-report-header-temple"
              >
                본당
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    bandate: !sort.bandate,
                  });

                  onClickSort(sort.bandate, 'created_at');
                }}
                className="user-ban-header-bandate"
              >
                차단일
                <img src={Arrow} />
              </div>
              <div
                onClick={() => {
                  setSort({
                    ...sort,
                    banReason: !sort.banReason,
                  });

                  onClickSort(sort.banReason, 'reason');
                }}
                className="user-ban-header-reason"
              >
                차단 사유
                <img src={Arrow} />
              </div>
            </div>

            <div className="user-list-content-list">
              {userList &&
                userList.map((user) => {
                  return <Ban key={user.idx} user={user} />;
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Content;
