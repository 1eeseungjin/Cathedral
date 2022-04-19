import request from "./_request";

function getAdminList(){
    return request.get({
        path: '/adminManage'
    })
}

function getAdmin(idx){
    return request.get({
        path: `/adminManage/detail?idx=${idx}`,
    })
}

const adminApi = {
    getAdminList,
    getAdmin
}

export default adminApi