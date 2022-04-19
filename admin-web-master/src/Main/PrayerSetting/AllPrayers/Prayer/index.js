import '../../index.scss';
import more from '../../../../@static/icon/more.png';
import { useState } from 'react';
import prayerApi from '../../../../@api/prayerApi';

const Prayer = ({ prayer, prayers, setPrayers, setIsRevise, setReviseList, setPrayerType }) => {
    const [showMore, setShowMore] = useState(false);
    let writed_At = new Date(prayer.created_at);
    const [detail, setDetail] = useState(false); // 자세히보기
    const [del, setDel] = useState(false); // 삭제하기

    return (
        <div>
            <div style={{
                color: '#000',
                fontSize: 25,
                padding: '55px 0px'
            }} className='f row ajCenter'>
                <div style={{ flex: 2, }} className='f ajCenter'>{prayer.title}</div>
                <div style={{ flex: 2, }} className='f ajCenter'>{prayer.division}{prayer.division != '전체' && '[' + prayer.select + ']'}</div>
                <div style={{ flex: 2, }} className='f ajCenter'>{[writed_At.getFullYear(), writed_At.getMonth() + 1, writed_At.getDate()].map((d) => { return d < 10 ? '0' + d.toString() : d.toString() }).join('.')}</div>
                <div style={{ flex: 1, }} className='f ajCenter'>{prayer.record_file ? 'O' : 'X'}</div>
                <div style={{ flex: 1, }} className='f ajCenter'>{prayer.image ? 'O' : 'X'}</div>
                <div style={{ flex: 0.9, position: 'relative', }} className='f ajCenter pointer' onClick={() => { setShowMore(!showMore) }}>
                    <img style={{ width: 4, height: 16 }} className='f ajCenter' src={more} />
                    {
                        showMore &&
                        <div style={{
                            width: 160,
                            height: 50,
                            position: 'absolute',
                            marginTop: 100,
                            marginRight: 130,
                            borderRadius: 5,
                            backgroundColor: '#fff',
                        }}>
                            <div style={{
                                padding: '12px 24px',
                                borderRadius: '5px 5px 0px 0px',
                                fontSize: 16,
                                color: '#000',
                                backgroundColor: detail ? '#DFE0EB' : '#fff',
                                border: '1px solid #DFE0EB',
                                borderBottom: '0px'
                            }}
                                onMouseEnter={() => { setDetail(!detail) }}
                                onMouseLeave={() => { setDetail(!detail) }}
                                onClick={() => {
                                    setIsRevise(true);
                                    setReviseList(prayer);
                                    setPrayerType('등록');
                                }}
                                className='f ajCenter'>
                                자세히 보기
                            </div>
                            <div style={{
                                padding: '12px 24px',
                                borderRadius: '0px 0px 5px 5px',
                                fontSize: 16,
                                color: '#000',
                                backgroundColor: del ? '#DFE0EB' : '#fff',
                                border: '1px solid #DFE0EB',
                                borderTop: '0px'
                            }}
                                onMouseEnter={() => { setDel(!del) }}
                                onMouseLeave={() => { setDel(!del) }}
                                onClick={() => {
                                    prayerApi.postDeletePrayer(prayer.idx).then(rs => {
                                        if (rs.success) {
                                            setPrayers(prayers.filter(p => p.idx != prayer.idx)); // 
                                        } else {
                                            alert('삭제에 실패했습니다. 다시 시도해주세요.');
                                        }
                                    })
                                }}
                                className='f ajCenter'>
                                삭제하기
                            </div>
                        </div>
                    }
                </div>
            </div >

            <div className='f line-grey' />
        </div >
    );
};

export default Prayer;
