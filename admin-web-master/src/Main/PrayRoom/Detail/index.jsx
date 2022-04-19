import './index.scss';
import SearchIcon from '../../../@static/icon/search';
import Arrow from '../icons/Arrow';
import { useQueryParams } from '../../../@plugins/useQueryParam';
import { useEffect, useState } from 'react';
import prayroomApi from '../../../@api/prayroomApi';
import dayjs from 'dayjs';
import Waiting from './Waiting';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const { idx } = useQueryParams();
  const { getPrayRoomByIdx } = prayroomApi;
  const [prayRoom, setPrayRoom] = useState();

  useEffect(async () => {
    if (idx !== undefined) {
      const result = await getPrayRoomByIdx(idx);
      setPrayRoom(result.result);
      console.log(result);
    }
  }, [idx]);

  return (
    <>
      {prayRoom && (
        <div className="pray-detail">
          <div className="pray-room-header">
            <div className="pray-room-header-title">열린 기도방</div>
            <div className="pray-room-header-search">
              <input />
              <SearchIcon />
            </div>
          </div>

          <div className="pray-detail-content-wrap">
            <div className="pray-detail-content">
              <div className="pray-detail-content-header">
                <div className="pray-detail-content-header-title">
                  <div
                    onClick={() => {
                      navigate('/prayroom');
                    }}
                  >
                    <Arrow />
                  </div>
                  <div>{prayRoom.title}</div>
                </div>
                <div className="pray-detail-content-header-content">
                  {prayRoom.name} | {prayRoom.residence} | {prayRoom.temple} |{' '}
                  {dayjs(prayRoom.start_time).format('YYYY.MM.DD HH:mm')}
                </div>
              </div>

              <div className="pray-detail-content-middle">
                {new Date(prayRoom.start_time) > new Date() ? (
                  <Waiting room={prayRoom} />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
