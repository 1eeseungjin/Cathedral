import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import prayerApi from '../../../../@api/prayerApi';
import sortReducer from '../../../Community/Functions/reducer';
import sortStyle from '../../../Community/Styles/sort.scss';
import FAQItem from './FAQItem/FAQItem';
import './FAQList.scss';

function FAQList() {
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [settingIdx, setSettingIdx] = useState(0);
    const [state, dispatch] = useReducer(sortReducer, { value: '', clicked: 0, posts: [] })
    const {
        getFAQs
    } = prayerApi;
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
            posts: posts,
            style: state.style
        })
    }

    useEffect(() => {
        const mount = async () => {
            const res = await getFAQs();
            setAllPosts(res.faqs);
            setPosts(res.faqs);
        }
        mount();
    }, [])

    return (
        <>
            <div className='faq-list-header'>
                <div className='faq-list-header-title'>FAQ 관리</div>
                <button className='faq-list-header-addBtn'
                    onClick={() => navigate('/general/faq/add')}>등록하기</button>
            </div>
            <div className='faq-list-table'>
                <div className='faq-list-table-head'>
                    <div className='faq-list-table-head-question'>
                        질문
                        <button className='faq-list-table-head-question-sort' value='question'
                            style={setSortStyle('question')} onClick={(e) => sort(e)}></button>
                    </div>
                    <div className='faq-list-table-head-answeredAt'>
                        최종 답변일
                        <button className='faq-list-table-head-answeredAt-sort' value='answered_at'
                            style={setSortStyle('answered_at')} onClick={(e) => sort(e)}></button>
                    </div>
                    <div className='faq-list-table-head-setting'></div>
                </div>
                <div className='faq-list-table-items'>
                    {posts && posts.map(item =>
                        <FAQItem
                            key={item.idx}
                            props={item} />)
                    }
                </div>
            </div>
        </>
    )
}

export default FAQList