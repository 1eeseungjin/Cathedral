import { useEffect, useState } from 'react';
import userApi from '../../../@api/userApi';
import './List.scss';
import Content from './Content/Content';
import dayjs from 'dayjs';
import { getMonth, getWeek } from '../../../@plugins/week';
import Modal from './Modal/Modal';
import { useRecoilState } from 'recoil';
import {
  banModalAtom,
  checkListAtom,
  pushModalAtom,
  usersAtom,
} from '../../../@store/userManage';
import Calendar from '../icon/Calendar';

const List = ({ type }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const {
    getUserList,
    getUserListByDate,
    getReportedUser,
    getReportedUserListByDate,
    getBanList,
    getBanListByDate,
    getDormancyList,
    getDormancyListByDate,
  } = userApi;
  const [users, setUsers] = useRecoilState(usersAtom);
  const [push, setPush] = useRecoilState(pushModalAtom);
  const [ban, setBan] = useRecoilState(banModalAtom);

  useEffect(async () => {
    if (type === '전체 신자') {
      const list = await getUserListByDate(startDate, endDate);
      setUsers(list.userList);
    } else if (type === '신고된 신자') {
      const list = await getReportedUserListByDate(startDate, endDate);
      setUsers(list.userList);
    } else if (type === '장기 미접속') {
      const list = await getDormancyListByDate(startDate, endDate);
      setUsers(list.userList);
    } else {
      const list = await getBanListByDate(startDate, endDate);
      setUsers(list.userList);
    }
  }, [startDate, endDate]);

  const onClickToday = () => {
    setStartDate(dayjs().format('YYYY-MM-DD'));
    setEndDate(dayjs().format('YYYY-MM-DD'));
  };

  const [checkList, setChcekList] = useRecoilState(checkListAtom);

  useEffect(async () => {
    if (type === '전체 신자') {
      setUsers([]);
      const list = await getUserList();
      setUsers(list.userList);
    } else if (type === '신고된 신자') {
      const list = await getReportedUser();
      setUsers(list.userList);
    } else if (type === '장기 미접속') {
      const list = await getDormancyList();
      setUsers(list.userList);
    } else {
      const list = await getBanList();
      setUsers(list.userList);
    }
  }, [type]);

  const onClickWeek = () => {
    const weekData = getWeek();

    setStartDate(dayjs(weekData[0]).format('YYYY-MM-DD'));
    setEndDate(dayjs(weekData[6]).format('YYYY-MM-DD'));
  };

  const onClickMonth = () => {
    const { firstDay, lastDay } = getMonth();
    setStartDate(dayjs(firstDay).format('YYYY-MM-DD'));
    setEndDate(dayjs(lastDay).format('YYYY-MM-DD'));
  };

  const onClickAll = async () => {
    if (type === '전체 신자') {
      setUsers([]);
      const list = await getUserList();
      setUsers(list.userList);
    } else if (type === '신고된 신자') {
      const list = await getReportedUser();
      setUsers(list.userList);
    } else if (type === '장기 미접속') {
      const list = await getDormancyList();
      setUsers(list.userList);
    } else {
      const list = await getBanList();
      setUsers(list.userList);
    }
  };

  return (
    <>
      {push && <Modal type={true} />}
      {ban && <Modal type={false} />}
      {users && (
        <div className="user-list">
          <div className="user-list-header">
            <div className="user-list-header-title">
              <div className="user-list-header-title-wrap">
                <div className="user-list-header-title-text">
                  {type === '전체 신자' && '전체 회원 목록'}
                  {type === '신고된 신자' && '신고된 회원 목록'}
                  {type === '장기 미접속' && '장기 미접속 회원 목록'}
                  {type === '차단' && '차단된 회원 목록'} (
                  {users.length
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  )
                </div>
              </div>
            </div>
            <div className="user-list-header-right">
              <div className="user-list-header-right-date">
                가입신청일
                <div className="user-list-header-right-date-value">
                  {startDate}
                </div>
                <Calendar />
                <input
                  className="user-list-header-right-date-input-start"
                  type={'date'}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  value={startDate}
                />
                ~
                <div className="user-list-header-right-date-value">
                  {endDate}
                </div>
                <Calendar />
                <input
                  className="user-list-header-right-date-input-end"
                  type={'date'}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                  value={endDate}
                />
                <div
                  onClick={onClickToday}
                  className="user-list-header-right-btns-date-btn"
                >
                  오늘
                </div>
                <div
                  onClick={onClickWeek}
                  className="user-list-header-right-btns-date-btn"
                >
                  이번주
                </div>
                <div
                  onClick={onClickMonth}
                  className="user-list-header-right-btns-date-btn"
                >
                  이번달
                </div>
                <div
                  onClick={onClickAll}
                  className="user-list-header-right-btns-date-btn"
                >
                  전체
                </div>
                <div className="user-list-header-right-btns-push-wrap">
                  <div
                    onClick={() => {
                      setPush(true);
                    }}
                    className="user-list-header-right-btns-push"
                  >
                    PUSH 알림 보내기
                  </div>
                  {type !== '차단' && (
                    <div
                      onClick={() => {
                        setBan(true);
                      }}
                      className="user-list-header-right-btns-ban"
                    >
                      차단
                    </div>
                  )}
                  {type === '차단' && (
                    <div className="user-list-header-right-btns-ban">
                      차단 해제
                    </div>
                  )}
                </div>
              </div>
              <div className="user-list-header-right-btns"></div>
            </div>
          </div>

          <Content type={type} users={users} />
        </div>
      )}
    </>
  );
};

export default List;
