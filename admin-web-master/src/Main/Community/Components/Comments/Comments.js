import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Recomments from './Recomments/Recomments';
import config from '../../../../config';
import './Comments.scss';

function Comments({ postIdx }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getComments = async () => {
            if (!!!postIdx) return;
            const res = await axios.get(config.api + 'community/comment/view/' + postIdx)
                .catch(err => alert(err));
            setComments(res.data);
        }
        getComments();
    }, [postIdx])

    return (
        <div className='comments'>
            <div className='comments-label'>댓글</div>
            <div className='comments-value'>
                {!!postIdx && !!comments && comments.map((item, idx) =>
                    <div className='comments-value-comment' key={idx}>
                        <div className='comments-value-comment-info'>
                            <div className='comments-value-comment-info-profile'></div>
                            <div className='comments-value-comment-info-detail'>
                                <div className='comments-value-comment-info-detail-name'>{item.name + '(' + item.baptismal + ')'}</div>
                                <div className='comments-value-comment-info-detail-contents'>{item.contents}</div>
                            </div>
                        </div>
                        <Recomments key={item.idx} commentIdx={item.idx} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comments