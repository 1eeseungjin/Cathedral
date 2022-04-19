import React, { useRef } from 'react'
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../@store/userInfo';
import audio from '../../../../@static/icon/audio.png'
import './Attachments.scss';

function Attachments({ data, setData }) {
    const [userInfo] = useRecoilState(userInfoState);
    const uploadFiles = useRef(null);
    const uploadBanner = useRef(null);
    const uploadVoiceFiles = useRef([]);

    const onBannerChange = e =>
        setData(data => ({ ...data, banner: e.target.files[0] }));

    const onVoiceFileChange = e => {
        let voiceFiles = data.voiceFiles;
        voiceFiles.splice(e.target.name, 1, e.target.files[0]);
        setData(data => ({ ...data, voiceFiles: voiceFiles }));
    }

    const onFileChange = async e => {
        let files = Array.from(e.target.files);
        for (let i = 0; i < files.length; i++) {
            if (files[i]['type'].split('/')[0] === 'image')
                await fileReader(files[i]).then(result => files[i]['src'] = result);
        }
        await setData(data => ({ ...data, files: data.files.concat(files) }));
    }

    const fileReader = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
    };

    const removeFile = removeIdx =>
        setData(data => ({ ...data, files: data.files.filter((item, idx) => idx !== removeIdx) }));

    const removeBanner = () =>
        setData(data => ({ ...data, banner: null }));

    const removeVoiceFile = removeIdx => {
        let voiceFiles = data.voiceFiles;
        voiceFiles.splice(removeIdx, 1, null);
        setData(data => ({ ...data, voiceFiles: voiceFiles }));
    }

    const start_and_end = str =>
        str.length > 30 ? str.substr(0, 9) + '...' + str.substr(str.length - 6, str.length) : str;

    return (
        <div className='attachments'>
            {data.type === "기도문" &&
                <div className='voiceFiles'>
                    <div className='voiceFiles-label'>기도문 음성파일 (최대 4개)
                    </div>
                    <div className='voiceFiles-list'>
                        {!!data.voiceFiles && data.voiceFiles.map((item, idx) => (
                            <div className='voiceFiles-list-file' key={idx}>
                                {!!item && <>
                                    <img className='voiceFiles-list-file-logo' alt='voiceFiles' src={audio} />
                                    <div className='voiceFiles-list-file-name'>{start_and_end(data.voiceFiles[idx].name)}</div>
                                    {data.modifiable && <button className='voiceFiles-list-file-btn' onClick={() => removeVoiceFile(idx)}>삭제</button>}
                                </>}
                                {!!!item && <>
                                    <div className='voiceFiles-list-file-add' onClick={() => uploadVoiceFiles.current[idx].click()}>+ 파일 추가</div>
                                </>}
                                <input
                                    type='file'
                                    accept='audio/mp3'
                                    name={idx}
                                    className='voiceFiles-upload'
                                    onChange={onVoiceFileChange}
                                    ref={(element) => uploadVoiceFiles.current[idx] = element}
                                    style={{ display: 'none' }} />
                            </div>))
                        }
                    </div>
                </div>
            }
            {(data.type === "이벤트" || data.type === "기도문") &&
                <div className='banner'>
                    <div className='banner-label'>{data.type === '기도문' ? '기도문 배경이미지 (기본)' : '배너 이미지 (428*218 권장)'}</div>
                    <div className='banner-value'>
                        {!!data.banner && <>
                            <div className='banner-value-name'>{start_and_end(data.banner.name)}</div>
                            {data.modifiable && <>
                                <button className='banner-value-btn' onClick={() => uploadBanner.current.click()}>변경</button>
                                <button className='banner-value-btn' onClick={() => removeBanner()}>삭제</button>
                            </>}
                        </>}
                        {!!!data.banner && <>
                            <div className='banner-value-name'></div>
                            {data.modifiable &&
                                <div className='banner-value-btn' onClick={() => uploadBanner.current.click()}>등록</div>
                            }
                        </>}
                        <input type='file' accept='image/*' onChange={onBannerChange} ref={uploadBanner} style={{ display: 'none' }} />
                    </div>
                </div>
            }
            <div className='files'>
                <div className='files-label'>{data.type === '기도문' ? '기도문 배경 이미지 (사용자 지정)' : '파일첨부'}
                    {data.modifiable && <div className='files-label-btn' onClick={() => uploadFiles.current.click()}>+ 파일 추가</div>}
                    <input type='file' accept={data.type === '기도문' ? 'image/*' : '*'} className='files-upload' onChange={onFileChange} ref={uploadFiles} style={{ display: 'none' }} multiple />
                </div>
                <div className='files-list'>
                    {!!data.files && data.files.map((item, idx) =>
                        <div className='files-list-file' key={idx}>
                            <div className='files-list-file-name'>{start_and_end(item.name)}</div>
                            {data.modifiable && <button className='files-list-file-btn' onClick={() => removeFile(idx)}>삭제</button>}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Attachments