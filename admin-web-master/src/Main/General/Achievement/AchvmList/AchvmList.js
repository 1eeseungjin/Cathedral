import dayjs from 'dayjs';
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import prayerApi from '../../../../@api/prayerApi';
import sortReducer from '../../../Community/Functions/reducer';
import sortStyle from '../../../Community/Styles/sort.scss';
import AchvmItem from './AchvmItem/AchvmItem';
import './AchvmList.scss';
import { functions } from '../../../Community/Functions/functions';
import AchvmItemAuto from './AchvmItem/AchvmItemAuto';

function AchvmList() {
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [settingIdx, setSettingIdx] = useState(0);
    const [state, dispatch] = useReducer(sortReducer, { value: '', clicked: 0, posts: [] })
    const {
        getAchievements
    } = prayerApi;
    const navigate = useNavigate();

    // 정렬 실행 중인 버튼만 style 변경
    const setSortStyle = value => state.value === value ? state.style : sortStyle;

    // 정렬 reducer, click 횟수 컨트롤
    const sort = e => {
        dispatch({
            type: '업적',
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

    const deleteFromState = idx => {
        setAllPosts(allPosts => allPosts.filter(item => item.idx !== idx));
        setPosts(posts => posts.filter(item => item.idx !== idx));
    }

    useEffect(() => {
        const mount = async () => {
            const res = await getAchievements();
            setAllPosts(res.achvms);
            setPosts(res.achvms);
        }
        mount();
    }, [])

    return (
        <>
            <div className='achvm-list-header'>
                <div className='achvm-list-header-title'>업적 관리</div>
                <button className='achvm-list-header-addBtn'
                    onClick={() => navigate('/general/achievement/add')}>등록하기</button>
            </div>
            <div className='achvm-list-table'>
                <div className='achvm-list-table-head'>
                    <div className='achvm-list-table-head-name'>
                        업적명
                        <button className='achvm-list-table-head-name-sort' value='name'
                            style={setSortStyle('name')} onClick={(e) => sort(e)}></button>
                    </div>
                    <div className='achvm-list-table-head-type'>
                        유형
                        <button className='achvm-list-table-head-type-sort' value='type'
                            style={setSortStyle('type')} onClick={(e) => sort(e)}></button>
                    </div>
                    <div className='achvm-list-table-head-term'>
                        업적 기간
                        <button className='achvm-list-table-head-term-sort' value='term'
                            style={setSortStyle('term')} onClick={(e) => sort(e)}></button>
                    </div>
                    <div className='achvm-list-table-head-setting'></div>
                </div>
                <div className='achvm-list-table-items'>
                    {posts && posts.map(item => {
                        item.typeName = item.type === 'A' ? '자동' : '사용자 지정';
                        item.term = item.type === 'A'
                            ? '상시'
                            : (dayjs(functions.ISOtoLocal(item.term_start)).format('YYYY.MM.DD.')
                                + '~' + dayjs(functions.ISOtoLocal(item.term_end)).format('YYYY.MM.DD.'));
                        return (item.idx <= 5 ?
                            <AchvmItemAuto
                                key={item.idx}
                                props={item} />
                            : <AchvmItem
                                key={item.idx}
                                props={item}
                                deleteFromState={deleteFromState}
                                settingIdx={settingIdx}
                                setSettingIdx={setSettingIdx} />)
                    })}
                </div>
            </div>
        </>
    )
}

export default AchvmList