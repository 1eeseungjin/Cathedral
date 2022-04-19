import React from 'react'

function ModifyContents_Achvm({ data, setData }) {
    const onChange = e => {
        setData(data => ({ ...data, contents: { ...data.contents, [e.target.id]: e.target.value } }));
    }

    return (
        <div className='modifyContents'>
            <div className='modifyContents-title'>
                <div className='modifyContents-title-label'>{data.type === 'FAQ 관리' ? 'FAQ 질문' : data.type + ' 제목'}</div>
                <input className='modifyContents-title-value'
                    type='text'
                    id={data.type === 'FAQ 관리' ? 'question' : 'title'}
                    onChange={onChange}
                    value={(data.type === 'FAQ 관리' ? data.contents.question : data.contents.title) || ''}
                    disabled={data.type === '기도문' || (data.type === 'FAQ 관리' && data.modifiable) ? true : false}
                    readOnly={data.type === 'FAQ 관리' || !data.modifiable} />
            </div>
            <div className='modifyContents-contents'>
                <div className='modifyContents-contents-label'>{data.type === 'FAQ 관리' ? '답변' : data.type + ' 본문'}</div>
                <textarea
                    className='modifyContents-contents-value'
                    id={data.type === 'FAQ 관리' ? 'answer' : 'contents'}
                    value={(data.type === 'FAQ 관리' ? data.contents.answer : data.contents.contents) || ''}
                    onChange={onChange}
                    readOnly={!data.modifiable}></textarea>
            </div>
            {data.type === "이벤트" &&
                <div className='modifyContents-term'>
                    <div className='modifyContents-term-label'>이벤트 기간</div>
                    <div className='modifyContents-term-value'>
                        <input
                            className='modifyContents-term-value-start'
                            type='date'
                            id='term_start'
                            max={data.contents.term_end || ''}
                            value={data.contents.term_start || ''}
                            onChange={onChange}
                            readOnly={!data.modifiable} />
                        <span className='modifyContents-term-value-span'> ~ </span>
                        <input className='modifyContents-term-value-end'
                            type='date'
                            id='term_end'
                            min={data.contents.term_start || ''}
                            value={data.contents.term_end || ''}
                            onChange={onChange}
                            readOnly={!data.modifiable} />
                    </div>
                </div>
            }
        </div>);
}

export default ModifyContents_Achvm