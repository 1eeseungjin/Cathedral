import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userApi from '../../../../../@api/userApi';
import {
  reportedIdx,
  reportedModalAtom,
  SelectAtom,
  usersAtom,
} from '../../../../../@store/userManage';
import './index.scss';

const Menu = ({ id, idx }) => {
  const [type, setType] = useRecoilState(SelectAtom);
  const [users, setUsers] = useRecoilState(usersAtom);

  const { banUserbyId, getUserList, terminationBan, getBanList } = userApi;
  const navigate = useNavigate();

  const [reported, setReported] = useRecoilState(reportedModalAtom);
  const [index, setIndex] = useRecoilState(reportedIdx);

  const onClickBan = async () => {
    if (window.confirm('차단하시겠습니까?')) {
      await banUserbyId(id);
      const list = await getUserList();
      setUsers(list.userList);
    } else return;
  };

  const onClickView = () => {
    navigate(`/user/detail?userId=${id}`);
  };

  const onClickTermination = async () => {
    await terminationBan(idx);
    const list = await getBanList();
    setUsers(list.userList);
  };

  return (
    <>
      <div className="menu-wrap">
        <div className="menu">
          <div
            onClick={() => {
              onClickView();
            }}
            className="menu-items"
          >
            자세히보기
          </div>
          {type === '차단' ? (
            <div
              onClick={() => {
                onClickTermination();
              }}
              className="menu-items"
            >
              차단 해지
            </div>
          ) : (
            <div onClick={banUserbyId} className="menu-items">
              차단
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
