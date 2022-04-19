import request from "./_request";

const getUserInfo = () => {
    return request.get({
        path: '/userInfo'
    })
}

const userInfoApi = {
    getUserInfo
}

export default userInfoApi