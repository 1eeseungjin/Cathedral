import request from "./_request";;

const getEventList = () => {
    return request.get({
        path: `community/event/list`,
    });
}

const getEvent = (idx) => {
    return request.get({
        path: `community/event/view/` + idx
    });
}

const postEvent = () => {
    return request.post({
        path: `community/event/add`,
        body: {

        }
    });
}

const eventApi = {
    getEventList,
    getEvent
}

export default eventApi;