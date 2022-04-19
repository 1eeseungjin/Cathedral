import './Modal.scss';
import Arrow from '../icons/Arrow';
import { useRecoilState } from 'recoil';
import { ModalStore } from '../../../@store/prayStore';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import prayroomApi from '../../../@api/prayroomApi';

const Modal = () => {
  const [type, setType] = useState('F');
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [fileName, setFileName] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [mysteria, setMysteria] = useState('환희의 신비');

  const [modal, setModal] = useRecoilState(ModalStore);

  const { makePrayRoom } = prayroomApi;

  const handleSelect = (e) => {
    setType(e.target.value);
  };

  const onClickMakePrayRoom = async () => {
    if (type === 'F') {
      const res = await makePrayRoom(
        type,
        startDate,
        startTime,
        title,
        content,
        mysteria
      );

      if (res.success === true) {
        setModal(false);
      }
    } else {
      const res = await makePrayRoom(type, title, content, fileName);

      if (res.success === true) {
        setModal(false);
      }
    }
  };

  useEffect(() => {
    setStartDate('');
    setStartTime('');
    setTitle('');
    setContent('');
    setFileName('');
    setType('F');
  }, []);

  return (
    <>
      <div className="pray-modal-wrap">
        <div className="pray-modal">
          <div className="pray-modal-header">
            <div
              onClick={() => {
                setModal(false);
              }}
            >
              <Arrow />
            </div>
            <div className="pray-modal-header-title">열린기도방 생성</div>
          </div>

          <div className="pray-modal-content">
            <div className="pray-modal-content-type">
              <div className="pray-modal-content-type-text">기도방 구분</div>
              <select
                onChange={handleSelect}
                value={type}
                className="pray-modal-content-type-select"
              >
                <option value={'F'}>일반 기도방</option>
                <option value={'T'}>24시간 기도방</option>
              </select>
              {type === 'F' ? (
                <div className="pray-modal-content-startDate">
                  <div className="pray-modal-content-startDate-text">
                    시작일
                  </div>
                  <div className="pray-modal-content-startDate-data">
                    <div className="pray-modal-content-startDate-data-value">
                      {startDate && dayjs(startDate).format('YYYY/MM/DD')}
                    </div>
                    <div className="date-btn">선택</div>
                    <input
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                      className="date-input"
                      type={'date'}
                    />
                  </div>
                  <div className="pray-modal-content-startTime">
                    <div className="pray-modal-content-startTime-text">
                      시작 시간
                    </div>
                    <div className="pray-modal-content-startTime-data">
                      <div className="pray-modal-content-startTime-data-value">
                        {startTime && startTime}
                      </div>
                      <div className="time-btn">선택</div>
                      <input
                        onChange={(e) => {
                          setStartTime(e.target.value);
                        }}
                        className="time-input"
                        type={'time'}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pray-modal-content-upload">
                  <div className="pray-modal-content-upload-text">
                    파일 업로드
                  </div>

                  <div className="pray-modal-content-upload-data">
                    <div className="pray-modal-content-upload-data-value">
                      {fileName ? fileName : '파일을 업로드 해주세요.'}
                    </div>
                    <div className="pray-modal-content-upload-data-btn">
                      선택
                    </div>
                    <input
                      onChange={(e) => {
                        setFileName(e.target.files[0].name);
                      }}
                      className="file-input"
                      type={'file'}
                    />
                  </div>
                </div>
              )}
              <div className="pray-modal-content-title">
                <div className="pray-modal-content-title-text">방 제목</div>
                <input
                  placeholder="방 제목을 입력해주세요."
                  className="pray-modal-content-title-input"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              {type === 'F' && (
                <div className="pray-modal-content-mysteria-wrap">
                  <div className="pray-modal-content-title-text">신비 구분</div>
                  <select
                    onChange={(e) => {
                      setMysteria(e.target.value);
                    }}
                    className="pray-modal-content-mysteria"
                    value={mysteria}
                  >
                    <option value="환희의 신비">환희의 신비</option>
                    <option value="빛의 신비">빛의 신비</option>
                    <option value="고통의 신비">고통의 신비</option>
                  </select>
                </div>
              )}

              <div className="pray-modal-content-description">
                <div className="pray-modal-content-description-text">
                  기도방 설명
                </div>
                <textarea
                  placeholder="기도방 설명글을 입력해주세요."
                  className="pray-modal-content-description-input"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></textarea>
              </div>

              <button
                onClick={onClickMakePrayRoom}
                className="pray-modal-content-btn"
              >
                기도방 만들기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
