// 통계 페이지

import React, { useEffect, useState } from 'react';
import search from '../../@static/icon/search.png';
import './stats.scss';
import Item from './item';
import statsApi from '../../@api/statsApi';

function Stats() {
  const [isTemple, setIsTemple] = useState(true); // isTemple == true 이면 본당, false 이면 교구
  const [text, setText] = useState("");
  const [standard, setStandard] = useState("전체");
  const onChange = (e) => { setText(e.target.value); };
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    statsApi.postStats(isTemple).then(rs => {
      console.log(rs);
      setStatistics(rs.stats);
    })
  }, [isTemple])

  return (
    <div style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 49, paddingTop: 61, backgroundColor: '#F7F8FC' }} className='f f1'>

      <div style={{ marginBottom: 23, }} className='f row'>
        <div style={{
          color: '#062D47',
          fontWeight: 'bold',
          fontSize: 32,
        }}>
          통계
        </div>
        <div className='f f1' />
        <div style={{
         
        }} className='f row'>
          <div style={{
             border: '0.5px solid #000',
             borderRadius: '10px 0px 0px 10px',
             boxSizing:'border-box',
            color: isTemple ? '#000' : '#fff',
            backgroundColor: isTemple ? '#fff' : '#123650',
            fontSize: 14,
            padding: 20
          }} className='f pointer ajCenter'
            onClick={() => { setIsTemple(!isTemple) }}>
            교구별
          </div>
          <div style={{
            border: '0.5px solid #000',
            borderRadius: '0px 10px 10px 0px',
            boxSizing:'border-box',
            color: isTemple ? '#fff' : '#000',
            backgroundColor: isTemple ? '#123650' : '#fff',
            fontSize: 14,
            padding:'0px 30px'
          }} className='f pointer ajCenter'
            onClick={() => { setIsTemple(!isTemple) }}>
            본당별
          </div>
        </div>

        <div className='f row'>
          <input style={{
            border: '1px solid #DFE0EB',
            borderRadius: '100px',
            height: '60px',
            width: '430px',
            marginLeft: 57,
            padding: 20,
          }} onChange={onChange} />
          <img src={search} style={{
            position: 'absolute',
            marginTop: 20,
            right: 60,
            width: 18,
            height: 18
          }} className='pointer'
            onClick={() => { alert(text) }} />
        </div>

      </div>


      <div className='f f1' style={{
        borderRadius: '10px',
        border: '1px solid #DFE0EB',
        backgroundColor: '#fff',
      }} >
        <div style={{
          marginTop: 34,
          fontSize: 16,
          color: '#000'
        }} className='f aCenter'>
          {/* 위에서부터 앱 접속률, 기도 수행률, 이벤트 참여 횟수, 신앙 온도 */}
        </div>
        <div style={{
          marginLeft: 40,
          marginRight: 54,
          marginBottom: 23,
        }}>
          <div style={{
            color: '#252733',
            fontWeight: 'bold',
            fontSize: 28,
            marginBottom: 16,
          }}>
            신앙 통계
          </div>

          <div style={{
            // padding: '16px 10px',
            // border: '1px solid #C4C4C4',
            fontSize: 12,

          }} className='f row'>
            
            <div style={{
              marginRight: 6,
              backgroundColor: standard == "전체" ? '#C4C4C4' : '#fff'
            }} className='standard'
              onClick={() => { setStandard("전체") }}>
              전체
            </div>
            <div style={{
              marginRight: 6,
              backgroundColor: standard == "앱 접속률" ? '#C4C4C4' : '#fff'
            }} className='standard'
              onClick={() => { setStandard("앱 접속률") }}>
              앱 접속률
            </div>
            <div style={{
              marginRight: 6,
              backgroundColor: standard == "기도수행률" ? '#C4C4C4' : '#fff'
            }} className='standard'
              onClick={() => { setStandard("기도수행률") }}>
              기도수행률
            </div>
            <div style={{
              marginRight: 6,
              backgroundColor: standard == "이벤트 참여 횟수" ? '#C4C4C4' : '#fff'
            }} className='standard'
              onClick={() => { setStandard("이벤트 참여 횟수") }}>
              이벤트 참여 횟수
            </div>
            <div style={{
              backgroundColor: standard == "신앙 온도" ? '#C4C4C4' : '#fff'
            }} className='standard'
              onClick={() => { setStandard("신앙 온도") }}>
              신앙 온도
            </div>
          </div>

          <div style={{
            marginTop: 22,
            marginLeft: 16,
            overflowY: 'auto',
            height: '50vh',
          }} className='f'>

            {statistics.map(stat => {
              if (stat.position.includes(text)) {
                return <Item stat={stat} standard={standard} />
              }
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats