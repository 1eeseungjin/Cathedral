import dayjs from 'dayjs'
import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { functions } from '../../../../Community/Functions/functions';
import './PrayerItem.scss';

function PrayerItem({ props }) {
    const created_at = functions.ISOtoLocal(props.created_at);
    const navigate = useNavigate();

    return (
        <div className='prayer-list-table-items-item' onClick={() => navigate('/general/prayer/update/' + props.idx)}>
            <div className='prayer-list-table-items-item-title'>{props.title}</div>
            <div className='prayer-list-table-items-item-modifiedAt'>
                {dayjs(created_at).format('YYYY.MM.DD. HH:mm')}</div>
        </div>
    )
}

export default PrayerItem