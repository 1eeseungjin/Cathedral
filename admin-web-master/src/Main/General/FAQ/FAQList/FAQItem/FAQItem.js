import dayjs from 'dayjs';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Modal from '../../../../Community/Components/Modal/Modal';
import { functions } from '../../../../Community/Functions/functions';
import './FAQItem.scss';

function FAQItem({ props }) {
    const answered_at = functions.ISOtoLocal(props.answered_at);
    const navigate = useNavigate();

    return (
        <>
            <div className='faq-list-table-items-item' onClick={() => navigate('/general/faq/view/' + props.idx)}>
                <div className='faq-list-table-items-item-question'>{props.question}</div>
                <div className='faq-list-table-items-item-answeredAt'>
                    {dayjs(answered_at).format('YYYY.MM.DD. HH:mm')}</div>
            </div>
        </>
    )
}

export default FAQItem