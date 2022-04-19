import { atom, selector, selectorFamily } from "recoil";

const AdminIdState = atom({
    key: 'AdminIdList',
    default: []
})

const AdminCheckedIdState = atom({
    key: 'AdminCheckedIdList',
    default: []
})

export default {
    AdminIdState,
    AdminCheckedIdState
}