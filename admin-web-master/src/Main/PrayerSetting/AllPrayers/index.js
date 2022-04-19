import Prayer from './Prayer';
import React, { useState, useEffect } from 'react';
import prayerApi from '../../../@api/prayerApi';

const AllPrayers = ({ setIsRevise, setReviseList, setPrayerType }) => {
    const [userType, setUserType] = useState(true); // true는 일반 단원, false는 레지오 단원
    const [prayers, setPrayers] = useState([]);

    useEffect(() => {
        prayerApi.postPrayers(userType).then(rs => {
            setPrayers(rs.prayers);
        })
    }, [userType])

    return (
        <>
            <div style={{ marginTop: 18, marginBottom: 10 }} className='f f1 line' />
            <div className='f row'>
                <div style={{ marginLeft: 67, marginRight: 41, color: userType ? '#252733' : '#BBBBBB' }}
                    onClick={() => { setUserType(!userType) }}
                    className='usertype'>
                    일반 단원
                </div>
                <div style={{ color: userType ? '#BBBBBB' : '#252733' }}
                    onClick={() => { setUserType(!userType) }}
                    className='usertype'>
                    레지오 단원
                </div>
            </div>
            <div style={{ marginTop: 13 }} className='f f1 line' />
            <div className='f row' style={{
                justifyContent: 'space-around',
                padding: '20px 0px',
            }}>
                <div style={{ flex: 2, color: '#9FA2B4', fontSize: 24, }} className='f ajCenter'>제목</div>
                <div style={{ flex: 2, color: '#9FA2B4', fontSize: 24 }} className='f ajCenter'>분류</div>
                <div style={{ flex: 2, color: '#9FA2B4', fontSize: 24 }} className='f ajCenter'>최근 작성일</div>
                <div style={{ flex: 1, color: '#9FA2B4', fontSize: 24 }} className='f ajCenter'>녹음파일</div>
                <div style={{ flex: 1, color: '#9FA2B4', fontSize: 24 }} className='f ajCenter'>배경 이미지</div>
                <div style={{ flex: 1, color: '#9FA2B4', fontSize: 24 }} className='f ajCenter'>더보기</div>
            </div>
            <div style={{}} className='f f1 line-grey' />
            <div style={{
                overflowY: 'auto',
                height: '50vh',
            }} className='f'>
                {
                    prayers.map((prayer) => {
                        return <Prayer
                            prayer={prayer}
                            prayers={prayers}
                            setPrayers={setPrayers}
                            setIsRevise={setIsRevise}
                            setReviseList={setReviseList}
                            setPrayerType={setPrayerType}
                        />
                    })
                }
            </div>


        </>
    )
}


export default AllPrayers;
