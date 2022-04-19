import { useRecoilState } from 'recoil';
import {
  banModalAtom,
  checkListAtom,
  pushModalAtom,
} from '../../../../@store/userManage';
import Arrow from '../../../PrayRoom/icons/Arrow';
import './Modal.scss';

const Modal = ({ type }) => {
  const [push, setPush] = useRecoilState(pushModalAtom);
  const [checkList, setCheckList] = useRecoilState(checkListAtom);
  const [ban, setBan] = useRecoilState(banModalAtom);

  const onClickBan = () => {
    checkList.map(() => {});
  };

  return (
    <>
      {type === true ? (
        <div className="push-modal">
          <div className="push-modal-wrap">
            <div className="push-modal-header">
              <div
                onClick={() => {
                  setPush(false);
                }}
              >
                <Arrow />
              </div>
              <div className="push-modal-header-title">PUSH 알림 보내기</div>
            </div>
            <div className="push-modal-title">
              <div className="push-modal-title-text">알림 제목</div>
              <input placeholder="제목을 입력해주세요" />
            </div>
            <div className="push-modal-content">
              <div className="push-modal-content-text">알림 내용</div>
              <textarea placeholder="Push 알림 내용을 입력해주세요"></textarea>
            </div>

            <button className="push-modal-btn">알림 보내기</button>
          </div>
        </div>
      ) : (
        <div className="push-modal">
          <div className="push-modal-wrap">
            <div className="ban-modal-header">
              <div
                onClick={() => {
                  setBan(false);
                }}
              >
                <Arrow />
              </div>
              <div className="ban-modal-header-title">사용자 차단</div>
            </div>

            <div className="ban-modal-content">
              <div className="ban-modal-content-content">
                <div className="ban-modal-content-content-text">차단 사유</div>
                <textarea placeholder="차단 사유를 입력해주세요"></textarea>
              </div>
              <button className="ban-modal-content-btn">차단하기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
