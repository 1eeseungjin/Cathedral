import request from './_request';

const getTest = () => {
    return request.get({
        path: 'test/helloworld',
    });
};

const testApi = {
    getTest,
};
export default testApi;