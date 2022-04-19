import request from './_request';

const getPostReports = () => {
  return request.get({
    path: `report/post`,
  });
};

const restorePost = (idx) => {
  return request.delete({
    path: `report/${idx}`,
  });
};

const deletePost = (idx) => {
  return request.delete({
    path: `report/post/${idx}`,
  });
};

const reportApi = {
  getPostReports,
  restorePost,
  deletePost,
};

export default reportApi;
