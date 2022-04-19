import { atom } from "recoil";

export const userInfoState = atom({
    key: 'userInfo',
    default: {
        baptismal: '',
        baptismal_birth: '',
        created_at: '',
        email: '',
        id: 'admin',
        idx: 0,
        name: '어드민',
        permission: '마스터',
        phone: '',
        residence: '서초교구',
        temple: '서초2성당',
    }
})