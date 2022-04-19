import React, { useEffect, useRef, useState } from 'react';
import prayerApi from '../../../@api/prayerApi';
import './AutoText.scss';

function AutoText({ setPage }) {
    const [text, setText] = useState('');
    const [texts, setTexts] = useState([]);
    const [isAddOn, setIsAddOn] = useState(false);
    const addTextRef = useRef(null);
    const {
        getPrayerText,
        postPrayerText,
        deletePrayerText
    } = prayerApi;

    const get = async () => {
        const res = await getPrayerText();
        console.log(res.texts);
        setTexts(res.texts);
    }

    const onTextChange = e => {
        setText(e.target.value);
    }

    const addBox = () => {
        setIsAddOn(true);
        setTimeout(() => {
            addTextRef.current.focus();
            addTextRef.current.setRangeText('내용을 입력하세요.', 0, 10, 'select');
        }, 0)
    }

    const addText = async () => {
        if (!!!text) alert('올바르지 않은 내용입니다.');
        else {
            const res = await postPrayerText(text);
            if (res.success) {
                get();
                setIsAddOn(false);
            } else alert('저장에 실패하였습니다.')
        }
    }

    const deleteText = async (idx) => {
        const res = await deletePrayerText(idx);
        if (res.success) {
            get();
            setIsAddOn(false);
        } else alert('삭제에 실패하였습니다.')
    }

    useEffect(() => {
        setPage('autotext');
        get();
    }, []);

    return (<>
        <div className='autotext-header'>
            <div className='autotext-header-title'>자동완성 텍스트</div>
        </div>
        <div className='autotext-body'>
            {!!texts && texts.map((item, idx) => {
                return <div className='autotext-body-text' key={idx}>
                    <div className='autotext-body-text-value'>{item.text}</div>
                    <div className='autotext-body-text-delete' onClick={() => deleteText(item.idx)}></div>
                </div>
            })}
            {isAddOn &&
                <div className='autotext-body-text'>
                    <input type='text'
                        ref={(ref) => addTextRef.current = ref}
                        className='autotext-body-text-value' onChange={onTextChange} onKeyUp={e => { if (e.code === 'Enter') addText() }} />
                    <div className='autotext-body-text-delete' onClick={() => setIsAddOn(false)}></div>
                </div>
            }
            <div className='autotext-body-text'>
                <div className='autotext-body-text-value-add' onClick={addBox}>+ 추가</div>
            </div>
        </div>
    </>)
}

export default AutoText