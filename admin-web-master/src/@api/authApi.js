import request from "./_request";

const postAdminLogin = (id, pw) => {
    return request.post({
        path: '/auth/login/admin',
        body: {
            id: id,
            pw: pw
        }
    })
}

const authApi = {
    postAdminLogin
}

export default authApi