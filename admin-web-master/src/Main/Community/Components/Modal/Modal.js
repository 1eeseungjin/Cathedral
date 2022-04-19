import React from 'react';
import './Modal.scss';
import close from '../../../../@static/icon/close.png';

export const Modal = ({ offModal, modalData }) =>
    <div className='Modal-dimmer'>
        <div className='Modal'>
            <div className='Modal-header'>
                <button className='Modal-btns-exit' onClick={() => offModal()}><img alt='' src={close} /></button>
            </div>
            <h1 className='Modal-title'>{modalData.title}</h1>
            <p className='Modal-contents'>{modalData.contents}</p>
            <div className='Modal-btns'>
                <button className='Modal-btns-yes' onClick={() => { if (!!modalData.isConfirm) { modalData.confirmMethod(); } offModal(); }}>확인</button>
                {modalData.isConfirm &&
                    <button className='Modal-btns-no' onClick={() => offModal()}>취소</button>
                }
            </div>
        </div>
    </div >

export default Modal