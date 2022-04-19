import MicOff from '../../../../@static/icon/micOff';
import VideoIcon from '../../../../@static/icon/VideoIcon';
import './index.scss';
import RemoveIcon from '../../../../@static/icon/RemoveIcon.png';
import PersonIcon from '../../../../@static/icon/Person.png';
import dayjs from 'dayjs';

const Waiting = ({ room }) => {
  const now = new Date();
  const startDate = new Date(room.start_time);

  const gap = startDate.getTime() - now.getTime();
  const day = Math.floor(gap / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="pray-waiting-wrap">
        <div className="pray-waiting">
          <div className="pray-waiting-video">
            <MicOff />
            &nbsp;
            <VideoIcon />
          </div>
          <div className="pray-waiting-userList">
            <div className="pray-waiting-userList-header">
              <div className="pray-waiting-userList-header-title">참가자</div>
              <div className="pray-waiting-userList-header-count">
                <img src={PersonIcon} />
                10
              </div>
            </div>
            <div className="pray-waiting-userList-list">
              {userList.map((user) => {
                return (
                  <div
                    key={user.idx}
                    className="pray-waiting-userList-list-item-wrap"
                  >
                    <div className="pray-waiting-userList-list-item">
                      <div className="pray-waiting-userList-list-item-user">
                        <div className="pray-waiting-userList-list-item-user-name">
                          {user.name}
                        </div>
                        <div className="pray-waiting-userList-list-item-user-baptismal">
                          {user.baptismal}
                        </div>
                      </div>
                      <img src={RemoveIcon} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pray-waiting-chat">
            <div className="pray-waiting-chat-header">실시간 반응</div>

            <div className="pray-waiting-chat-content"></div>
          </div>
        </div>

        <div className="pray-waiting-bottom">
          <div className="pray-waiting-bottom-file">
            <div className="pray-waiting-bottom-file-header">
              <div className="pray-waiting-bottom-file-header-title">
                기도방 파일관리
              </div>
              <div className="pray-waiting-bottom-file-header-btns">
                <div className="pray-waiting-bottom-file-header-btns-btn">
                  실행
                </div>
                <div className="pray-waiting-bottom-file-header-btns-btn">
                  삭제
                </div>
                <div class="pray-waiting-bottom-file-header-btns-file">
                  <label for="file">파일 업로드</label>
                  <input type="file" id="file" />
                </div>
              </div>
            </div>

            <div className="pray-waiting-bottom-file-content"></div>
          </div>

          <div className="pray-waiting-bottom-right">
            <div className="pray-waiting-bottom-right-content">
              <div className="pray-waiting-bottom-right-content-text">
                열린기도 시작까지&nbsp;
                <span className="pray-waiting-bottom-right-content-text-time">
                  {day >= 1 && day + '일'}&nbsp;
                  {Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60))}분&nbsp;
                  {Math.floor((gap % (1000 * 60)) / 1000)}초&nbsp;
                </span>
                남았습니다.
              </div>
              <div className="pray-waiting-bottom-right-content-btn">
                <div className="pray-waiting-bottom-right-content-btn-close">
                  방 폐쇄
                </div>
                <div className="pray-waiting-bottom-right-content-btn-start">
                  바로 시작하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Waiting;

const userList = [
  {
    idx: 1,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 2,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 3,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 4,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 5,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 6,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 7,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 8,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 9,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 10,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 11,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 12,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
  {
    idx: 13,
    name: '홍길동',
    baptismal: '성 바실리오',
  },
];
