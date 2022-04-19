import { configure } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import sortReducer from '../../../Community/Functions/reducer';
import sortStyle from '../../../Community/Styles/sort.scss';
import config from '../../../../config';
import PrayerItem from './PrayerItem/PrayerItem';
import './PrayerList.scss';

function PrayerList() {
    const [allPrayers, setAllPosts] = useState([]);
    const [prayers, setPosts] = useState([]);
    const [state, dispatch] = useReducer(sortReducer, { value: '', clicked: 0, posts: [], style: null })
    const navigate = useNavigate();

    // 정렬 실행 중인 버튼만 style 변경
    const setSortStyle = value => state.value === value ? state.style : sortStyle;

    // 정렬 reducer, click 횟수 컨트롤
    const sort = e => {
        dispatch({
            value: e.target.value,
            clicked: e.target.value !== state.value
                ? 1
                : state.clicked >= 2
                    ? 0
                    : state.clicked + 1,
            posts: prayers,
            style: state.style
        })
    }

    // 정렬 reducer, click 횟수 컨트롤
    useEffect(() => {
        dispatch({
            value: state.value,
            clicked: state.clicked,
            posts: prayers
        })
    }, [prayers, state.clicked, state.value])

    // 처음 마운트 될 때 모든 게시글 가져오기
    useEffect(() => {
        async function getPosts() {
            const res = await axios.get(config.api + `general/prayer/list`)
                .catch(err => alert(err));
            let data = res.data.prayers;
            console.log(data);
            if (!!data) {
                setAllPosts(data);
                setPosts(data);
            } else alert('데이터가 없습니다.');
        }
        getPosts();
    }, []);

    return (<>
        <div className='prayer-list-header'>
            <div className='prayer-list-header-title'>기도문</div>
        </div>
        <div className='prayer-list-table'>
            <div className='prayer-list-table-head'>
                <div className='prayer-list-table-head-title'>
                    기도문 제목
                    <button className='prayer-list-table-head-title-sort' value='title'
                        style={setSortStyle('title')}
                        onClick={(e) => sort(e)}></button>
                </div>
                <div className='prayer-list-table-head-modifiedAt'>
                    최근 수정
                    <button className='prayer-list-table-head-modifiedAt-sort' value='created_at'
                        style={setSortStyle('created_at')}
                        onClick={(e) => sort(e)}></button>
                </div>
                <div className='prayer-list-table-head-setting'></div>
            </div>
            <div className='prayer-list-table-items'>
                {!!prayers &&
                    prayers.map(item => {
                        return (<PrayerItem
                            key={item.idx}
                            props={item}
                        />)
                    })}
            </div>
        </div>
    </>)
}

export default PrayerList