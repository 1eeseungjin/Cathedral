import './Item.scss';
import MoreIcon from '../../../../@static/icon/more';
import dayjs from 'dayjs';
import { checkListAtom, idListAtom } from '../../../../@store/userManage';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import Menu from './Menu';

const Item = ({ user }) => {
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
      <div className="item">
        <div className="item-check">
          <input
            type={'checkbox'}
            checked={CheckList.includes(user.idx)}
            onChange={(e) => {
              onChangeEach(e, user.idx);
            }}
          />
        </div>
        <div className="item-no">{user.idx}</div>
        <div className="item-date">
          {dayjs(user.created_at).add(9, 'hour').format('YYYY.MM.DD')}
        </div>
        <div className="item-name">{user.name}</div>
        <div className="item-baptismal">{user.baptismal}</div>
        <div className="item-id">{user.id}</div>
        <div className="item-phone">
          {user.phone
            .replace(/[^0-9]/, '')
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
        </div>
        <div className="item-region">{user.region_position}</div>
        <div className="item-temple">{user.temple}</div>
        <div
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

export default Item;
