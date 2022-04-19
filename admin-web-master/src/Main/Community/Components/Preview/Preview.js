import dayjs from 'dayjs';
import React from 'react'
import { functions } from '../../Functions/functions';
import './Preview.scss';

function Preview({ data }) {
    const created_at = functions.ISOtoLocal(data.contents.created_at)
    const isImage = obj => obj['type'].split('/')[0] === 'image';

    const checkFileSize = size => {

        return size > 1000 ** 3
            ? Math.floor((size / 1000 ** 3) * 10) / 10 + 'GB'
            : size > 1000 ** 2
                ? Math.floor((size / 1000 ** 2) * 10) / 10 + 'MB'
                : size > 1000
                    ? Math.floor(size / 1000) + 'KB' : size + 'B';
    }

    return (
        <div className='preview'>
            <div className='preview-label'>{data.type} 화면 미리보기</div>
            <div className='preview-value'>
                <div className='preview-value-bar'>
                    <div className='preview-value-bar-phone'>
                        <div className='preview-value-bar-phone-time'>9:41</div>
                        <div className='preview-value-bar-phone-icons'>
                            <div className='preview-value-bar-phone-icons-cellular'></div>
                            <div className='preview-value-bar-phone-icons-wifi'></div>
                            <div className='preview-value-bar-phone-icons-battery'></div>
                        </div>
                    </div>
                    <div className='preview-value-bar-app'>
                        <div className='preview-value-bar-app-backspace'></div>
                        <div className='preview-value-bar-app-title'>{data.postType}</div>
                        <div className='preview-value-bar-app-more'></div>
                    </div>
                </div>
                <div className='preview-value-contents'>
                    <div className='preview-value-contents-head'>
                        <div className='preview-value-contents-head-contents'>
                            <div className='preview-value-contents-head-contents-title'>{data.contents.title || '제목'}</div>
                            <div className='preview-value-contents-head-contents-small'>
                                <div className='preview-value-contents-head-contents-small-createdAt'>
                                    {dayjs(created_at).format('YYYY.MM.DD HH:mm')}
                                </div>
                                <div className='preview-value-contents-head-contents-small-memberName'>작성자:{data.contents.member_name}</div>
                            </div>
                        </div>
                        <div className='preview-value-contents-head-profile'></div>
                    </div>
                    <div className='preview-value-contents-detail'>
                        <div className='preview-value-contents-detail-images'>
                            {!!data.files && data.files.filter(item => isImage(item))
                                .map((item, idx) =>
                                    <div className='preview-value-contents-detail-images-image' key={idx}>
                                        <img className='preview-value-contents-detail-images-image-content' alt={item.name} src={item.src} />
                                    </div>)
                            }
                        </div>
                        <div className='preview-value-contents-detail-contents'>{data.contents.contents || '내용'}</div>
                        <div className='preview-value-contents-detail-files'>
                            {!!data.files && data.files.filter((item, idx) => !isImage(item))
                                .map((item, idx) =>
                                    <div className='preview-value-contents-detail-files-file' key={idx}>
                                        <div className='preview-value-contents-detail-files-file-info'>
                                            <div className='preview-value-contents-detail-files-file-info-name'>{item.name}</div>
                                            <div className='preview-value-contents-detail-files-file-info-size'>{checkFileSize(item.size)}</div>
                                        </div>
                                        <div className='preview-value-contents-detail-files-file-download'></div>
                                    </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className='preview-value-homeIndicator'></div>
            </div>
        </div >
    )
}

export default Preview;