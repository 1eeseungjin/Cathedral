import request from './_request';

const getUserList = () => {
  return request.get({
    path: 'manage/',
  });
};

const getUserListByDate = (startDate, endDate) => {
  if (startDate !== undefined && endDate === undefined) {
    return request.get({
      path: `manage?startDate=${startDate}`,
    });
  } else if (startDate === undefined && endDate !== undefined) {
    return request.get({
      path: `manage?endDate=${endDate}`,
    });
  } else {
    return request.get({
      path: `manage?startDate=${startDate}&endDate=${endDate}`,
    });
  }
};

const getReportedUser = () => {
  return request.get({
    path: 'manage/reports',
  });
};

const getReportedUserListByDate = (startDate, endDate) => {
  if (startDate !== undefined && endDate === undefined) {
    return request.get({
      path: `manage/reports?startDate=${startDate}`,
    });
  } else if (startDate === undefined && endDate !== undefined) {
    return request.get({
      path: `manage/reports?endDate=${endDate}`,
    });
  } else {
    return request.get({
      path: `manage/reports?startDate=${startDate}&endDate=${endDate}`,
    });
  }
};

const banUserbyId = (id) => {
  return request.post({
    path: `manage/ban?id=${id}`,
  });
};

const getUserInfo = (userId) => {
  return request.get({
    path: `manage/user?userId=${userId}`,
  });
};

const getReportInfo = (idx) => {
  return request.get({
    path: `manage/report/${idx}`,
  });
};

const getBanList = () => {
  return request.get({
    path: `manage/ban`,
  });
};

const getBanListByDate = (startDate, endDate) => {
  if (startDate !== undefined && endDate === undefined) {
    return request.get({
      path: `manage/ban?startDate=${startDate}`,
    });
  } else if (startDate === undefined && endDate !== undefined) {
    return request.get({
      path: `manage/ban?endDate=${endDate}`,
    });
  } else {
    return request.get({
      path: `manage/ban?startDate=${startDate}&endDate=${endDate}`,
    });
  }
};

const terminationBan = (userIdx) => {
  return request.delete({
    path: `manage/ban/${userIdx}`,
  });
};

const getDormancyList = () => {
  return request.get({
    path: `manage/dormancy`,
  });
};

const getDormancyListByDate = (startDate, endDate) => {
  if (startDate !== undefined && endDate === undefined) {
    return request.get({
      path: `manage/dormancy?startDate=${startDate}`,
    });
  } else if (startDate === undefined && endDate !== undefined) {
    return request.get({
      path: `manage/dormancy?endDate=${endDate}`,
    });
  } else {
    return request.get({
      path: `manage/dormancy?startDate=${startDate}&endDate=${endDate}`,
    });
  }
};

const getIsBan = (userIdx) => {
  return request.get({
    path: `manage/get/ban/${userIdx}`,
  });
};

const getReportCount = (userId) => {
  return request.get({
    path: `manage/get/report/${userId}`,
  });
};

const userApi = {
  getUserList,
  getUserListByDate,
  banUserbyId,
  getReportedUserListByDate,
  getReportedUser,
  getUserInfo,
  getReportInfo,
  getBanList,
  getBanListByDate,
  terminationBan,
  getDormancyList,
  getIsBan,
  getReportCount,
  getDormancyListByDate,
};

export default userApi;
