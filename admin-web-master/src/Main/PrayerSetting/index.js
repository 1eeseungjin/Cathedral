// 기도문 설정 페이지

import React, { useState, useEffect } from 'react';
import './index.scss';
import AllPrayers from './AllPrayers';
import TextRevise from './TextRevise';
import Registration from './Registration';

function PrayerSetting() {
  const [prayerType, setPrayerType] = useState("전체 기도문");
  const [isRevise, setIsRevise] = useState(false);
  const [reviseList, setReviseList] = useState({});

  return (
    <div style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 49, paddingTop: 61, backgroundColor: '#F7F8FC' }} className='f f1'>

      <div style={{ marginBottom: 23, }} className='f row'>
        <div style={{
          color: '#062D47',
          fontWeight: 'bold',
          fontSize: 32,
        }}>
          기도문 설정
        </div>
      </div>

      <div className='f f1' style={{
        borderRadius: '10px',
        border: '1px solid #DFE0EB',
        backgroundColor: '#fff',
        paddingRight: 36,
      }} >
        {
          prayerType != "등록" ?
            <div>
              <div style={{
                marginLeft: 40,
                marginTop: 29,
              }} className='f row aCenter'>
                <div style={{ color: prayerType == "전체 기도문" ? '#252733' : '#BBBBBB' }}
                  onClick={() => { setPrayerType("전체 기도문") }}
                  className='prayertype1'>
                  전체 기도문
                </div>
                <div style={{ color: prayerType == "텍스트 수정" ? '#252733' : '#BBBBBB' }}
                  onClick={() => { setPrayerType("텍스트 수정") }}
                  className='prayertype1'>
                  텍스트 수정
                </div>
                <div onClick={() => { setIsRevise(false); setReviseList({}); setPrayerType("등록"); }} className='prayertype2'>
                  등록
                </div>
              </div>
              {
                prayerType == "전체 기도문" &&
                <AllPrayers setIsRevise={setIsRevise} setReviseList={setReviseList} setPrayerType={setPrayerType} />
              }
              {
                prayerType == "텍스트 수정" &&
                <TextRevise />
              }
            </div>
            :
            <Registration setPrayerType={setPrayerType} isRevise={isRevise} reviseList={reviseList} />
        }
      </div>
    </div>
  )
}

export default PrayerSetting