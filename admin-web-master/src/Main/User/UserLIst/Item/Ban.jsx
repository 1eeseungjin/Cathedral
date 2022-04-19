import './Ban.scss';
import MoreIcon from '../../../../@static/icon/more';
import dayjs from 'dayjs';
import { checkListAtom, idListAtom } from '../../../../@store/userManage';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import Menu from './Menu';

const Ban = ({ user }) => {
  const [IdList, setIdList] = useRecoilState(idListAtom);
  const [CheckList, setCheckList] = useRecoilState(checkListAtom);
  const [menu, setMenu] = useState(false);

  const onChangeEach = (e, id) => {
    if (e.target.checked) {
      setCheckList([...CheckList, id]);
    } else {
      setCheckList(CheckList.filter((checkedId) => checkedId !== id));
    }
  };

  console.log(user);

  return (
    <div className="ban">
      <div className="ban-check">
        <input
          type={'checkbox'}
          checked={CheckList.includes(user.idx)}
          onChange={(e) => {
            onChangeEach(e, user.idx);
          }}
        />
      </div>
      <div className="ban-no">{user.idx}</div>
      <div className="ban-date">
        {dayjs(user.user_createdAt).format('YYYY.MM.DD')}
      </div>
      <div className="ban-name">{user.name}</div>
      <div className="ban-id">{user.id}</div>
      <div className="ban-region">{user.region_position}</div>
      <div className="ban-temple">{user.temple}</div>
      <div className="ban-user-created">
        {dayjs(user.created_at).format('YYYY.MM.DD')}
      </div>
      <div className="ban-reason">{user.reason}</div>
      <div
        onClick={() => {
          setMenu(!menu);
        }}
      >
        <MoreIcon />
      </div>
      {menu && <Menu key={user.idx} id={user.id} idx={user.idx} />}
    </div>
  );
};

export default Ban;
