import templeImage from '../../../@static/image/templeImage.png';
import './item.scss'

const Item = ({ stat, standard }) => {
    return (
        <div style={{
            marginBottom: 20,
        }} className='f row'>

            <div style={{
                width: 81,
                height: 103,
                position: 'relative',
            }} className='f ajCenter'>
                {/* <img src={templeImage} 
                style={{ width: 81, height: 103, }}></img> */}
                <div style={{
                    position: 'absolute',
                    fontSize: 17,
                }} >
                    {stat.position}
                </div>
            </div>

            <div style={{ justifyContent: 'space-around', marginRight: 90 }} className='f f1 '>
                {
                    (standard == "전체" || standard == "앱 접속률") &&
                    <div className='f row'>
                        <div className='f f1 row graph'>
                            <div style={{ flex: stat.accessRate, backgroundColor: '#509DFE',borderRadius:'0px 15px 15px 0px' }} />
                            <div style={{ flex: 100 - stat.accessRate, backgroundColor: '#E0EEF8' }} />
                        </div>
                        <div style={{ minWidth: 60, }} className='f aEnd'>
                            {stat.accessRate.toFixed(1)}%
                        </div>
                    </div>
                }
                {
                    (standard == "전체" || standard == "기도수행률") &&
                    <div className='f row'>
                        <div className='f f1 row graph'>
                            <div style={{ flex: stat.executeRate, backgroundColor: '#0062A4',borderRadius:'0px 15px 15px 0px' }} />
                            <div style={{ flex: 100 - stat.executeRate, backgroundColor: '#E0EEF8' }} />
                        </div>
                        <div style={{ minWidth: 60, }} className='f aEnd'>
                            {stat.executeRate.toFixed(1)}%
                        </div>
                    </div>
                }
                {
                    (standard == "전체" || standard == "이벤트 참여 횟수") &&
                    <div className='f row'>
                        <div className='f f1 row graph'>
                            <div style={{ flex: stat.participateRate, backgroundColor: '#0062A4',borderRadius:'0px 15px 15px 0px' }} />
                            <div style={{ flex: 10 - stat.participateRate, backgroundColor: '#E0EEF8' }} />
                        </div>
                        <div style={{ minWidth: 60, }} className='f aEnd'>
                            {stat.participateRate.toFixed(1)}회
                        </div>
                    </div>
                }
                {
                    (standard == "전체" || standard == "신앙 온도") &&
                    <div className='f row'>
                        <div className='f f1 row graph'>
                            <div style={{ flex: stat.temparature, backgroundColor: '#0D476D',borderRadius:'0px 15px 15px 0px' }} />
                            <div style={{ flex: 100 - stat.temparature, backgroundColor: '#E0EEF8' }} />
                        </div>
                        <div style={{ minWidth: 60, }} className='f aEnd'>
                            {stat.temparature.toFixed(1)}도
                        </div>
                    </div>
                }
            </div>
        </div >
    );
};

export default Item;
