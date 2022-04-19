import { useState, useEffect } from 'react';
import './index.scss';
import Chat from '../List/Chat';
import { useRecoilState } from 'recoil';
import { smallTypeStore } from '../../../@store/prayStore';
import DefaultUserIcon from '../../../@static/image/defaultProfile.png';
import MicOff from '../../../@static/icon/micOff';

const chats = [
  {
    idx: 1,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 2,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 3,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 4,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 5,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 6,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 7,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 8,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 9,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 10,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
  {
    idx: 11,
    name: '이름1',
    baptismal: '세례명1',
    chat: 'asdf',
  },
];

const Waiting = ({ room }) => {
  const [select, setSelect] = useState(0);
  const [type, setType] = useRecoilState(smallTypeStore);

  return (
    <>
      <div className="small-waiting">
        <div className="small-waiting-header">
          <div className="small-waiting-header-title">
            대기실 - {room.title}
          </div>
        </div>

        <div className="small-waiting-content">
          <div className="small-waiting-content-video"></div>
          <div className="small-waiting-content-list">
            <div className="live-content-right-menu">
              <div
                className={`live-content-right-menu-title ${
                  select === 0 && 'active'
                }`}
                onClick={() => {
                  setSelect(0);
                }}
              >
                실시간 채팅
              </div>
              <div
                className={`live-content-right-menu-title ${
                  select === 1 && 'active'
                }`}
                onClick={() => {
                  setSelect(1);
                }}
              >
                참가자
              </div>
            </div>
            <div style={{ height: '350px', width: '100%' }}>
              {select === 0 ? (
                <>
                  <div className="live-content-right-list">
                    {chats.map((chat) => {
                      return <Chat data={chat} />;
                    })}
                  </div>
                  <div className="live-content-right-inputs">
                    <input
                      className="live-content-right-inputs-input"
                      placeholder="멘트를 선택하세요."
                    />
                    <div className="live-content-right-inputs-btn">전송</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="live-content-right-users">
                    {chats.map((chat) => {
                      return (
                        <div className="live-content-right-users-list">
                          <img src={DefaultUserIcon} />
                          <div className="live-content-right-users-list-name">
                            {chat.name} ({chat.baptismal})
                          </div>
                          <MicOff />
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <div
              onClick={() => {
                setType('기도방목록');
              }}
              className="small-waiting-content-list-btn"
            >
              뒤로가기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Waiting;
