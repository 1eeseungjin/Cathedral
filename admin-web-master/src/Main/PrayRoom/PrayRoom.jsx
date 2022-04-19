import SearchIcon from '../../@static/icon/search';
import './PrayRoom.scss';
import arrow from '../../@static/icon/Arrow.png';
import prayroomApi from '../../@api/prayroomApi';
import { useEffect, useState } from 'react';
import Item from './List/Item';
import Sort from '../../@plugins/sort';
import { useRecoilState } from 'recoil';
import { ModalStore } from '../../@store/prayStore';
import Modal from './Modal/Modal';

const PrayRoom = () => {
  const [prayRooms, setPrayRooms] = useState([]);
  const { getPrayRooms } = prayroomApi;

  const [sort, setSort] = useState({
    startDate: false,
    title: false,
    name: false,
    region: false,
    temple: false,
    mysteria: false,
    userCount: false,
  });

  const [isModalOpen, setIsModalOpen] = useRecoilState(ModalStore);

  useEffect(async () => {
    const { prayRoom } = await getPrayRooms();
    setPrayRooms(prayRoom);
  }, []);

  useEffect(() => {
    setPrayRooms(Sort(prayRooms, sort.startDate, 'start_time'));
  }, [sort.startDate]);

  useEffect(() => {
    setPrayRooms(Sort(prayRooms.slice(), sort.title, 'title'));
  }, [sort.title]);

  useEffect(() => {
    setPrayRooms(Sort(prayRooms.slice(), sort.name, 'name'));
  }, [sort.name]);

  useEffect(() => {
    setPrayRooms(Sort(prayRooms.slice(), sort.region, 'residence'));
  }, [sort.region]);

  useEffect(() => {
    setPrayRooms(Sort(prayRooms.slice(), sort.temple, 'temple'));
  }, [sort.temple]);

  useEffect(() => {
    setPrayRooms(Sort(prayRooms.slice(), sort.mysteria, 'mysteria'));
  }, [sort.mysteria]);

  useEffect(() => {
    setPrayRooms(Sort(prayRooms.slice(), sort.userCount, 'personnel'));
  }, [sort.userCount]);

  return (
    <>
      {isModalOpen && <Modal />}
      <div className="pray-room">
        <div className="pray-room-header">
          <div className="pray-room-header-title">열린 기도방</div>
          <div className="pray-room-header-search">
            <input />
            <SearchIcon />
          </div>
        </div>

        <div className="pray-room-content-wrap">
          <div className="pray-room-content">
            <div className="pray-room-content-header">
              <div className="pray-room-content-header-title">기도방 목록</div>
              <div
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="pray-room-content-header-btn"
              >
                기도방 생성
              </div>
            </div>

            <div className="pray-room-content-list">
              <div className="pray-room-content-list-header">
                <div className="pray-room-content-list-header-startDate">
                  <div
                    style={{ width: '66px' }}
                    className="pray-room-content-list-header-menu"
                    onClick={() => {
                      setSort({
                        ...sort,
                        startDate: !sort.startDate,
                      });
                    }}
                  >
                    시작일시
                  </div>
                  <img src={arrow} />
                </div>
                <div className="pray-room-content-list-header-title">
                  <div
                    onClick={() => {
                      setSort({
                        ...sort,
                        title: !sort.title,
                      });
                    }}
                    className="pray-room-content-list-header-menu"
                  >
                    기도방명
                  </div>
                  <img src={arrow} />
                </div>
                <div className="pray-room-content-list-header-name">
                  <div
                    onClick={() => {
                      setSort({
                        ...sort,
                        name: !sort.name,
                      });
                    }}
                    className="pray-room-content-list-header-menu"
                  >
                    주최자명
                  </div>
                  <img src={arrow} />
                </div>
                <div className="pray-room-content-list-header-region">
                  <div
                    onClick={() => {
                      setSort({
                        ...sort,
                        region: !sort.region,
                      });
                    }}
                    className="pray-room-content-list-header-menu"
                  >
                    주최자 소속 교구
                  </div>
                  <img src={arrow} />
                </div>
                <div className="pray-room-content-list-header-temple">
                  <div
                    onClick={() => {
                      setSort({
                        ...sort,
                        temple: !sort.temple,
                      });
                    }}
                    className="pray-room-content-list-header-menu"
                  >
                    주최자 소속 본당
                  </div>
                  <img src={arrow} />
                </div>
                <div className="pray-room-content-list-header-mysteria">
                  <div
                    onClick={() => {
                      setSort({
                        ...sort,
                        mysteria: !sort.mysteria,
                      });
                    }}
                    className="pray-room-content-list-header-menu"
                  >
                    신비 구분
                  </div>
                  <img src={arrow} />
                </div>
                <div className="pray-room-content-list-header-user">
                  <div
                    onClick={() => {
                      setSort({
                        ...sort,
                        userCount: !sort.userCount,
                      });
                    }}
                    className="pray-room-content-list-header-menu"
                  >
                    접속자 수
                  </div>
                  <img src={arrow} />
                </div>
              </div>

              <div className="pray-room-content-list-data">
                {prayRooms &&
                  prayRooms.map((room) => {
                    return <Item key={room.idx} room={room} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrayRoom;
