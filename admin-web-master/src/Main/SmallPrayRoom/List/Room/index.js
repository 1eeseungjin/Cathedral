
import { useState } from 'react';
import smallprayroomApi from '../../../../@api/smallprayroomApi';
import more from '../../../../@static/icon/more.png';

const Room = ({ room, rooms, setRooms, setRoom, setType }) => {
    const [showMore, setShowMore] = useState(false);
    const [detail, setDetail] = useState(false); // 자세히보기
    const [del, setDel] = useState(false); // 삭제하기

    let start_time = new Date(room.start_time);
    let end_time = new Date(room.end_time);
    let start = [start_time.getHours(), start_time.getMinutes()].map((d) => { return d < 10 ? '0' + d.toString() : d.toString() }).join(':');
    let end = [end_time.getHours(), end_time.getMinutes()].map((d) => { return d < 10 ? '0' + d.toString() : d.toString() }).join(':');

    return (
        <div>
            <div style={{
                color: '#000',
                fontSize: 20,
                padding: '50px 0px'
            }} className='f row ajCenter'>
                <div style={{ flex: 1, }} className='f ajCenter'>{start}&nbsp;{parseInt(start.split(':')[0]) < 12 ? 'AM' : 'PM'}
                    <br />~{end}&nbsp;{parseInt(end.split(':')[0]) < 12 ? 'AM' : 'PM'}</div>
                <div style={{ flex: 1, }} className='f ajCenter'>{room.creator}</div>
                <div style={{ flex: 1, }} className='f ajCenter'>{room.title}</div>
                <div style={{ flex: 2, }} className='f ajCenter'>{room.contents}</div>
                <div style={{ flex: 1, }} className='f ajCenter'>{room.personnel}/{room.limit}</div>


                <div style={{ flex: 0.4, position: 'relative', }} className='f ajCenter pointer' onClick={() => { setShowMore(!showMore) }}>
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
                                    setType('대기방');
                                    setRoom(room);
                                }}
                                className='f ajCenter'>
                                확인하기
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
                                    smallprayroomApi.postDelete(room.idx).then(rs => {
                                        if (rs.success) {
                                            setRooms(rooms.filter(r => r.idx != room.idx)); // 
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

            <div style={{
                marginLeft: '31.5px',
                borderBottom: '1px solid #cdcdcd'
            }} className='f' />
        </div >
    );
};

export default Room;
