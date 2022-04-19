import request from './_request';

const postStats = (isTemple) => {
    return request.post({
        path: `stats/stats`,
        body : {
            isTemple : isTemple
        }
    });
};



const statsApi = {
    postStats,
};
export default statsApi;