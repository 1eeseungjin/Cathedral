import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoreIcon from '../../../@static/icon/more';
import './Item.scss';

const Item = ({ room }) => {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="pray-room-item">
        <div className="pray-room-item-data">
          <div className="pray-room-item-data-startDate">
            {dayjs(room.start_time).format('YYYY.MM.DD HH:mm')}
          </div>
          <div className="pray-room-item-data-title">{room.title}</div>
          <div className="pray-room-item-data-name">{room.name}</div>
          <div className="pray-room-item-data-region">{room.residence}</div>
          <div className="pray-room-item-data-temple">{room.temple}</div>
          <div className="pray-room-item-data-mysteria">{room.mysteria}</div>
          <div className="pray-room-item-data-user">
            {dayjs(room.start_time).format(dateFormat) <
            dayjs().format(dateFormat)
              ? room.personnel &&
                room.personnel
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
              : '시작전'}
          </div>

          <div className="pray-room-item-btns">
            {room.all_day === 'T' ? (
              <div className="pray-room-item-btns-allday">24H</div>
            ) : (
              <div style={{ width: '43px' }} />
            )}
            {dayjs(room.start_time).format(dateFormat) <
            dayjs().format(dateFormat) ? (
              <div className="pray-room-item-btns-live">LIVE</div>
            ) : (
              <div style={{ width: '43px', marginLeft: '10px' }} />
            )}

            <div
              onClick={() => {
                setModal(!modal);
              }}
              className="pray-room-item-more-icon"
            >
              <MoreIcon />
            </div>

            {modal === true && (
              <div className="pray-room-item-modal-wrap">
                <div className="pray-room-item-modal">
                  <div
                    onClick={() => {
                      navigate(`/prayroom/detail?idx=${room.idx}`);
                    }}
                    className="modal-first"
                  >
                    입장하기
                  </div>
                  <div className="modal-second">수정</div>
                  <div className="modal-third">삭제</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
