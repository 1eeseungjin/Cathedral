import React, { useState, useEffect } from 'react';
import prayerApi from '../../../@api/prayerApi';


const TextRevise = () => {
    const [texts, setTexts] = useState([]);
    const [add, setAdd] = useState(false);
    const [inputText, setInputText] = useState('');
    const onChange = (e) => { setInputText(e.target.value); };

    useEffect(() => {
        prayerApi.getPrayerText().then(rs => {
            setTexts(rs.texts);
        })
    }, [add])

    return (
        <>
            <div style={{
                marginTop: 33,
                marginLeft: 40,
                marginBottom: 12,
                color: '#000',
                fontSize: 30,
                fontWeight: 'bold',
            }}>
                텍스트 관리
            </div>
            {
                texts.map((text) => {
                    return (
                        <div className='f row'>
                            <div style={{
                                marginLeft: 40,
                                marginTop: 19,
                                display: 'block',
                                padding: '13px 24px',
                                borderRadius: 50,
                                border: '1px solid #cacaca',
                                fontSize: 20,
                            }}>
                                {text}
                            </div>
                            <div className='f f1' />
                        </div>

                    )
                })
            }
            {
                add ?
                    <>
                        <div className='f row'>
                            <input style={{
                                border: '1px solid #cacaca',
                                height: '56px',
                                width: '250px',
                                marginLeft: 40,
                                marginTop: 19,
                                borderRadius: 50,
                                padding: '13px 24px',
                                color: '#000',
                                fontSize: 20,
                            }} onChange={onChange} />

                            <div style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                backgroundColor: '#062d47',
                                borderRadius: 10,
                                marginTop: 19,
                                marginBottom: 10,
                                marginLeft: 17,
                                padding: '9px 35px',
                                fontSize: 20,
                            }} onClick={() => {
                                prayerApi.postPrayerText(inputText).then(rs => {
                                    rs.success ? setAdd(!add) : alert('등록에 실패했습니다. 다시 시도해주세요.')
                                })
                            }}
                                className='f  pointer ajCenter'>
                                확인
                            </div>
                            <div style={{
                                fontWeight: 'bold',
                                color: '#000',
                                backgroundColor: '#fff',
                                border: '1px solid #000',
                                borderRadius: 10,
                                marginTop: 19,
                                marginBottom: 10,
                                marginLeft: 17,
                                padding: '9px 35px',
                                fontSize: 20,
                            }} onClick={() => { setAdd(!add) }}
                                className='f  pointer ajCenter'>
                                취소
                            </div>


                            <div className='f f1' />
                        </div>
                    </>

                    :
                    <div className='f row'>
                        <div style={{
                            marginLeft: 40,
                            marginTop: 19,
                            display: 'block',
                            padding: '13px 24px',
                            borderRadius: 50,
                            border: '1px solid #cacaca',
                            color: '#CDCDCD',
                            fontSize: 20,
                        }}
                            onClick={() => { setAdd(!add) }}
                            className='pointer'>
                            + 추가
                        </div>
                        <div className='f f1' />
                    </div>
            }

        </>

    )

}

export default TextRevise;