import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../@store/userInfo';
import config from '../../../../config';
import axios from 'axios';
import dayjs from 'dayjs';
import sortStyle from '../../Styles/sort.scss';
import EventItem from './EventItem/EventItem';
import sortReducer from '../../Functions/reducer';
import './EventList.scss';
import Modal from '../../Components/Modal/Modal';
import eventApi from '../../../../@api/eventApi';

function EventList() {
    const [userInfo] = useRecoilState(userInfoState);
    const [term, setTerm] = useState({})
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [state, dispatch] = useReducer(sortReducer, { value: '', clicked: 0, posts: [], style: null })
    const [settingIdx, setSettingIdx] = useState(0);
    const [modalData, setModalData] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const {
        getEventList
    } = eventApi;
    const navigate = useNavigate();

    const offModal = () => setIsModalOn(false);

    const add = () => {
        if (userInfo.permission !== '마스터') {
            setModalData({
                title: '등록불가',
                contents: '마스터 관리자만 새 이벤트를 작성할 수 있습니다.',
                isConfirm: false
            });
            setIsModalOn(true);
        } else navigate('/community/event/add');
    }

    // 정렬 실행 중인 버튼만 style 변경
    const setSortStyle = value => state.value === value ? state.style : sortStyle;

    // 등록일 기간 검색 값 설정
    const onTermChange = e => {
        setTerm({ ...term, [e.target.id]: e.target.value });
    }

    // 등록일 기간 검색 단축(오늘, 이번주, 이번달, 전체)버튼 핸들링
    const setDateOption = opt => {
        let date = new Date();
        switch (opt) {
            // today는 이미 new Date()로 오늘을 가리키고 있기 때문에 생략
            case 'thisweek':
                date.setDate(date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1));
                break;
            case 'thismonth':
                date.setDate(1);
                break;
            case 'all':
                date = null;
                break;
            default:
                break;
        }
        // term 값을 변경해 검색 필터링 useEffect 실행
        setTerm({ start: !!date ? dayjs(date).format('YYYY-MM-DD') : '', end: '' });
    }

    // 정렬 reducer, click 횟수 컨트롤
    const sort = e => {
        dispatch({
            value: e.target.value,
            clicked: e.target.value !== state.value
                ? 1
                : state.clicked >= 2
                    ? 0
                    : state.clicked + 1,
            posts: posts,
            style: state.style
        })
    }

    // DB에서 게시글 삭제될 때 state에서도 삭제하게 하는 callBack
    const deleteFromState = data => {
        // server response에서 삭제가 수행된 row(affectedRows)가 하나라도 있으면 state에서도 삭제
        if (data.affectedRows > 0) {
            setAllPosts(allPosts => allPosts.filter(item => item.idx !== data.idx))
            setPosts(posts => posts.filter(item => item.idx !== data.idx));
        }
    };

    // 정렬 reducer, click 횟수 컨트롤
    useEffect(() => {
        dispatch({
            value: state.value,
            clicked: state.clicked,
            posts: posts
        })
    }, [posts, state.clicked, state.value])

    // 검색 필터링
    useEffect(() => {
        // 검색 기간 필터링
        setPosts(allPosts.filter(item => {
            const start = new Date((!!term.start ? term.start : "1970-01-01") + "T00:00:00");
            const end = new Date((!!term.end ? term.end : dayjs().format("YYYY-MM-DD")) + "T23:59:59");
            if (start > end) {
                alert('시작 기간이 끝 기간보다 더 늦습니다. 다시 선택해주세요.');
                return true;
            }
            const date = new Date(item.created_at);
            return start < date && end > date;
        }));
    }, [term, allPosts]);

    // 처음 마운트 될 때 모든 게시글 가져오기
    useEffect(() => {
        async function mount() {
            let res = await getEventList();
            setAllPosts(res.eventList);
            setPosts(res.eventList);
        }
        mount();
    }, [getEventList]);

    return (<>
        <div className='event-list-header'>
            <div className='event-list-header-title'>이벤트 관리</div>
            <div className='event-list-header-search'>
                <span className='event-list-header-search-label-createdAt'>등록일</span>
                <input type='date' className='event-list-header-search-start' id='start' max={term.end || dayjs().format('YYYY-MM-DD')} value={term.start || ''} onChange={onTermChange} />
                <span className='event-list-header-search-label-term'>~</span>
                <input type='date' className='event-list-header-search-end' id='end' min={term.start || ''} max={dayjs().format('YYYY-MM-DD')} value={term.end || ''} onChange={onTermChange} />
                <button className='event-list-header-search-btn' id='today' onClick={() => setDateOption('today')}>오늘</button>
                <button className='event-list-header-search-btn' id='thisweek' onClick={() => setDateOption('thisweek')}>이번주</button>
                <button className='event-list-header-search-btn' id='thismonth' onClick={() => setDateOption('thismonth')}>이번달</button>
                <button className='event-list-header-search-btn' id='all' onClick={() => setDateOption('all')}>전체</button>
            </div>
            <button className='event-list-header-addBtn' onClick={() => add()}>등록</button>
        </div>
        <div className='event-list-table'>
            <div className='event-list-table-head'>
                <div className='event-list-table-head-title'>
                    제목
                    <button className='event-list-table-head-title-sort' value='title'
                        style={setSortStyle('title')}
                        onClick={(e) => sort(e)}></button>
                </div>
                <div className='event-list-table-head-memberName'>
                    작성자
                    <button className='event-list-table-head-memberName-sort' value='member_name'
                        style={setSortStyle('member_name')}
                        onClick={(e) => sort(e)}></button>
                </div>
                <div className='event-list-table-head-term'>
                    기간
                </div>
                <div className='event-list-table-head-status'>
                    상태<button className='event-list-table-head-status-sort' value='status'
                        style={setSortStyle('status')} onClick={(e) => sort(e)}></button>
                </div>
                <div className='event-list-table-head-createdAt'>
                    작성일시<button className='event-list-table-head-createdAt-sort' value='created_at'
                        style={setSortStyle('created_at')} onClick={(e) => sort(e)}></button>
                </div>
                <div className='event-list-table-head-views'>
                    조회수<button className='event-list-table-head-views-sort' value='views'
                        style={setSortStyle('views')} onClick={(e) => sort(e)}></button>
                </div>
                <div className='event-list-table-head-setting'></div>
            </div>
            <div className='event-list-table-items'>
                {posts &&
                    posts.map(item => {
                        item.status =
                            new Date(dayjs(item.term_end).format('YYYY-MM-DD 23:59:59')) > new Date()
                                ? "진행 중" : "종료";
                        return (<EventItem
                            key={item.idx}
                            props={item}
                            deleteFromState={deleteFromState}
                            settingIdx={settingIdx}
                            setSettingIdx={setSettingIdx} />)
                    })}
            </div>
            {isModalOn &&
                <Modal offModal={offModal} modalData={modalData} />
            }
        </div>
    </>)
}

export default EventList