import React, { useState, useEffect } from 'react';
import smallprayroomApi from '../../../@api/smallprayroomApi';
import Room from './Room';
import more from '../../../@static/icon/more.png';
import dayjs from 'dayjs';
import './index.scss';
import MoreIcon from '../../../@static/icon/more';

const List = ({ rooms }) => {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';

  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="small-item">
        <div className="small-item-startDate">
          {dayjs(rooms.start_time).format('YYYY.MM.DD HH:mm')}
        </div>
        <div className="small-item-title">{rooms.title}</div>
        <div className="small-item-name">{rooms.name}</div>
        <div className="small-item-region">{rooms.region_position}</div>
        <div className="small-item-temple">{rooms.temple}</div>
        <div className="small-item-mysteria">{rooms.mysteria}</div>
        <div className="small-item-user">
          {rooms.personnel
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
        </div>

        <div className="small-item-btns">
          {rooms.all_day === 'T' ? (
            <div className="small-item-btns-allday">24H</div>
          ) : (
            <div style={{ width: '43px' }}></div>
          )}
          {dayjs(rooms.start_time).format(dateFormat) <
            dayjs().format(dateFormat) &&
          dayjs().format(dateFormat) <
            dayjs(rooms.end_time).format(dateFormat) ? (
            <div className="small-item-btns-live">LIVE</div>
          ) : (
            <div style={{ width: '43px' }} />
          )}
        </div>

        <div
          onClick={() => {
            setModal(!modal);
          }}
          className="pray-room-item-more-icon"
        >
          <MoreIcon />
        </div>

        {modal === true && (
          <div className="small-item-modal-wrap">
            <div className="small-item-modal">
              <div className="modal-first">모니터링</div>
              <div className="modal-third">방 폐쇄</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
