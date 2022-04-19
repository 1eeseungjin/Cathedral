import './SmallPrayRoom.scss';
import SearchIcon from '../../@static/icon/search';
import Arrow from '../../@static/icon/Arrow.png';
import List from './List';
import { useEffect, useState } from 'react';
import smallprayroomApi from '../../@api/smallprayroomApi';

const SmallPrayRoom = () => {
  const { getSmallPrayRoom } = smallprayroomApi;

  const [rooms, setRooms] = useState([]);

  useEffect(async () => {
    const data = await getSmallPrayRoom();
    setRooms(data.smallprayroom);
  }, []);

  return (
    <>
      <div className="small-pray">
        <div className="small-pray-header">
          <div className="small-pray-header-title">소공동체 기도방</div>
          <div className="small-pray-header-search">
            <input />
            <SearchIcon />
          </div>
        </div>

        <div className="small-pray-content">
          <div className="small-pray-content-header">
            <div className="small-pray-content-header-title">기도방 목록</div>
          </div>

          <div className="small-pray-content-data">
            <div className="small-pray-content-data-header">
              <div className="small-pray-content-data-header-startDate">
                시작일시
                <img src={Arrow} />
              </div>

              <div className="small-pray-content-data-header-title">
                기도방명
                <img src={Arrow} />
              </div>

              <div className="small-pray-content-data-header-name">
                주최자명
                <img src={Arrow} />
              </div>

              <div className="small-pray-content-data-header-region">
                주최자 소속교구
                <img src={Arrow} />
              </div>

              <div className="small-pray-content-data-header-temple">
                주최자 소속본당
                <img src={Arrow} />
              </div>

              <div className="small-pray-content-data-header-mysteria">
                신비 구분
                <img src={Arrow} />
              </div>

              <div className="small-pray-content-data-header-user">
                접속자 수
                <img src={Arrow} />
              </div>
            </div>

            <div className="small-pray-content-data-list">
              {rooms.map((room) => {
                return <List key={room.idx} rooms={room} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallPrayRoom;
