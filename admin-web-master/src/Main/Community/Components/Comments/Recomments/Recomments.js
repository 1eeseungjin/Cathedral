import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../../../config';
import './Recomments.scss'

function Recomments({ commentIdx }) {
    const [recomments, setRecomments] = useState([]);

    useEffect(() => {
        const getRecomments = async () => {
            const res = await axios.get(config.api + 'community/recomment/view/' + commentIdx);
            setRecomments(res.data);
        }
        getRecomments();
    }, [commentIdx]);

    return (
        <div className='recomments' key={commentIdx}>
            {!!recomments && recomments.map((item, idx) =>
                <div className='recomments-recomment' key={idx}>
                    <div className='recomments-recomment-profile'></div>
                    <div className='recomments-recomment-detail'>
                        <div className='recomments-recomment-detail-name'>{item.name + '(' + item.baptismal + ')'}</div>
                        <div className='recomments-recomment-detail-contents'>{item.contents}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Recomments