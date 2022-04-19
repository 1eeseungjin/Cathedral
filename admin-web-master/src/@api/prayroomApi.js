import request from './_request';

const postDelete = (idx) => {
  return request.post({
    path: `prayroom/delete`,
    body: {
      idx: idx,
    },
  });
};

const getPrayRooms = () => {
  return request.get({
    path: `/prayroom`,
  });
};

const makePrayRoom = (type, startDate, startTime, title, content, mysteria) => {
  return request.post({
    path: `/prayroom`,
    body: {
      type,
      startDate,
      startTime,
      title,
      content,
      mysteria,
    },
  });
};

const getPrayRoomByIdx = (idx) => {
  return request.get({
    path: `/prayroom/${idx}`,
  });
};

const prayroomApi = {
  postDelete,
  makePrayRoom,
  getPrayRooms,
  getPrayRoomByIdx,
};
export default prayroomApi;
