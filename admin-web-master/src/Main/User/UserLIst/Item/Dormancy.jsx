import './Dormancy.scss';
import MoreIcon from '../../../../@static/icon/more';
import dayjs from 'dayjs';
import { checkListAtom, idListAtom } from '../../../../@store/userManage';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import Menu from './Menu';

const Dormancy = ({ user }) => {
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

  return (
    <>
      <div className="dormancy">
        <div className="dormancy-check">
          <input
            type={'checkbox'}
            checked={CheckList.includes(user.idx)}
            onChange={(e) => {
              onChangeEach(e, user.idx);
            }}
          />
        </div>
        <div className="dormancy-no">{user.idx}</div>
        <div className="dormancy-date">
          {dayjs(user.created_at).add(9, 'hour').format('YYYY.MM.DD')}
        </div>
        <div className="dormancy-name">{user.name}</div>
        <div className="dormancy-id">{user.id}</div>
        <div className="dormancy-region">{user.region_position}</div>
        <div className="dormancy-temple">{user.temple}</div>
        <div className="dormancy-period">
          {dayjs(user.login_at).format('YYYY.MM.DD')}
        </div>
        <div className="dormancy-period">{user.period}일</div>
        <div
          className="dormancy-more"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <MoreIcon />
        </div>
        {menu && <Menu id={user.id} idx={user.idx} />}
      </div>
    </>
  );
};

export default Dormancy;
