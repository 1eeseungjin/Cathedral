import request from './_request';

const getSmallPrayRoom = () => {
  return request.get({
    path: 'smallprayroom/',
  });
};

const smallprayroomApi = {
  getSmallPrayRoom,
};
export default smallprayroomApi;
