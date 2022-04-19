import './Reported.scss';
import MoreIcon from '../../../../@static/icon/more';
import dayjs from 'dayjs';
import {
  checkListAtom,
  idListAtom,
  reportedIdx,
  reportedModalAtom,
} from '../../../../@store/userManage';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import Menu from './Menu';

const Reported = ({ user }) => {
  const [CheckList, setCheckList] = useRecoilState(checkListAtom);
  const [menu, setMenu] = useState(false);

  const [modal, setModal] = useRecoilState(reportedModalAtom);
  const [index, setIndex] = useRecoilState(reportedIdx);

  const onChangeEach = (e, id) => {
    if (e.target.checked) {
      setCheckList([...CheckList, id]);
    } else {
      setCheckList(CheckList.filter((checkedId) => checkedId !== id));
    }
  };

  return (
    <>
      <div className="item2">
        <div className="item2-check">
          <input
            type={'checkbox'}
            checked={CheckList.includes(user.idx)}
            onChange={(e) => {
              onChangeEach(e, user.idx);
            }}
          />
        </div>
        <div className="item2-no">{user.idx}</div>
        <div className="item2-date">
          {dayjs(user.created_at).add(9, 'hour').format('YYYY.MM.DD')}
        </div>
        <div className="item2-name">{user.name}</div>
        <div className="item2-id">{user.target}</div>
        <div className="item2-region">{user.region_position}</div>
        <div className="item2-temple">{user.temple}</div>
        <div className="item2-count">{user.count}회</div>
        <div className="item2-reason">{user.reason}</div>
        <div
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <MoreIcon />
        </div>
        {menu && <Menu key={user.idx} id={user.id} idx={user.idx} />}
      </div>
    </>
  );
};

export default Reported;
