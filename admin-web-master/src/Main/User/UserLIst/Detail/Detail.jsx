import SearchIcon from '../../../../@static/icon/search';
import './Detail.scss';
import { useQueryParams } from '../../../../@plugins/useQueryParam';
import { useEffect, useState } from 'react';
import userApi from '../../../../@api/userApi';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../../PrayRoom/icons/Arrow';
import dayjs from 'dayjs';

const Detail = () => {
  const { userId } = useQueryParams();
  const { getUserInfo, getIsBan, getReportCount } = userApi;
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [isBan, setIsBan] = useState([]);
  const [reportCount, setReportCount] = useState(0);

  useEffect(async () => {
    const res = await getUserInfo(userId);
    setUser(res.user);
  }, [userId]);

  useEffect(async () => {
    const isBanUser = await getIsBan(user.idx);
    const reportCount = await getReportCount(user.id);
    setReportCount(reportCount.isReportedUser.length);
    if (isBanUser.data) {
      setIsBan(isBanUser.isBanUser);
    }
  }, [user]);

  return (
    <>
      {/* User.scss */}
      <div className="user-manage">
        <div className="user-manage-header">
          <div className="user-manage-header-title">신자 관리 페이지</div>
          <div className="user-manage-header-search">
            <input className="user-manage-header-search-input" />
            <SearchIcon />
          </div>
        </div>

        <div className="detail">
          <div className="detail-header">
            <div className="detail-header-left">
              <div
                onClick={() => {
                  navigate('/user');
                }}
              >
                <Arrow />
              </div>
              <div className="detail-header-title">개별 신자 상세 페이지</div>
            </div>
            <div className="detail-header-right">
              <div className="detail-header-right-push">Push 알림 보내기</div>
              <div className="detail-header-right-ban">차단</div>
            </div>
          </div>

          {user && (
            <>
              <div className="detail-content">
                <div className="detail-content-userinfo">
                  <div className="detail-content-userinfo-name">
                    <div className="detail-content-userinfo-title">이름</div>
                    <div className="detail-content-userinfo-data">
                      {user.name}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">아이디</div>
                    <div className="detail-content-userinfo-data">
                      {user.id}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">
                      전화번호
                    </div>
                    <div className="detail-content-userinfo-data">
                      {user.phone &&
                        user.phone
                          .replace(/[^0-9]/, '')
                          .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">세례명</div>
                    <div className="detail-content-userinfo-data">
                      {user.baptismal}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">축일</div>
                    <div className="detail-content-userinfo-data">
                      {user.baptismal_birth}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">교구</div>
                    <div className="detail-content-userinfo-data">
                      {user.region_position}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">본당</div>
                    <div className="detail-content-userinfo-data">
                      {user.temple}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">
                      생년월일
                    </div>
                    <div className="detail-content-userinfo-data">
                      {dayjs(user.birth).format('YYYY.MM.DD')}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">가입일</div>
                    <div className="detail-content-userinfo-data">
                      {dayjs(user.created_at).format('YYYY.MM.DD')}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">
                      차단여부
                    </div>
                    <div className="detail-content-userinfo-data">
                      {isBan.length !== 0 ? '차단 중' : '차단 중 아님'}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">
                      누적 차단 횟수
                    </div>
                    <div className="detail-content-userinfo-data">
                      {isBan.length}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">
                      누적 신고 횟수
                    </div>
                    <div className="detail-content-userinfo-data">
                      {reportCount}
                    </div>
                  </div>

                  <div className="detail-content-userinfo-id">
                    <div className="detail-content-userinfo-title">
                      최근접속일
                    </div>
                    <div className="detail-content-userinfo-data">
                      {dayjs(user.login_at).format('YYYY.MM.DD')}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
