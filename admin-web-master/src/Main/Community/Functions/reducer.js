import sort from '../../../@static/icon/table-sort.png';
import sortDown from '../../../@static/icon/table-sort-down.png';
import sortUp from '../../../@static/icon/table-sort-up.png';
import { type } from '@testing-library/user-event/dist/type';

export default function sortReducer(state, action) {
    switch (action.clicked) {
        case 0: {
            return ({
                ...action, posts:
                    action.posts.sort((a, b) =>
                        action.type === '업적'
                            ? (a.idx < b.idx ? -1 : 1)
                            : (a.idx < b.idx ? 1 : -1)),
                style: { ...action.style, backgroundImage: `url(${sort})` }
            })
        }
        case 1: {
            return ({
                ...action, posts:
                    action.posts.sort((a, b) => a[action.value] < b[action.value] ? -1 : 1),
                style: { ...action.style, backgroundImage: `url(${sortUp})` }
            })
        }
        case 2: {
            return ({
                ...action, posts:
                    action.posts.sort((a, b) => a[action.value] < b[action.value] ? 1 : -1),
                style: { ...action.style, backgroundImage: `url(${sortDown})` }
            })
        }
        default:
            return state;
    }
}