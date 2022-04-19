import config from '../config';
import md5 from 'md5';

async function request({
  host,
  path,
  method,
  body,
  headers = {},
  isUpload = false,
  debug = false,
}) {
  path = path.replace(/^\//, '');
  // header 기본값 설정
  if (!headers) headers = {};
  headers['authorization'] = localStorage.getItem('token');
  if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
  if (!!body) {
    if (isUpload) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      body = JSON.stringify(body);
    }
  }
  if (!localStorage.getItem('browser_key')) {
    localStorage.setItem(
      'browser_key',
      md5(window.navigator.userAgent + '/' + Math.random())
    );
  }
  headers['browser_key'] = localStorage.getItem('browser_key');
  if (debug) {
    console.log((host ? host : config.api) + path, {
      method,
      body,
      headers,
    });
  }
  return await fetch((host ? host : config.api) + path, {
    method,
    body,
    headers,
  })
    .catch(async (e) => {
      if (e instanceof Error) {
        // alert('연결 시간이 초과되었습니다.\n\n다시 시도해주세요.\n\n' + e);
        return 'error';
      }
    })
    .then((rs) => {
      if (rs != 'error') {
        return rs.json();
      } else {
        return { success: false };
      }
    })
    .then(async (rs) => {
      if (rs.success === false && rs.message) {
        alert(rs.message);
        return rs;
      } else {
        return rs;
      }
    });
}

// get 은 단순 읽어오기이므로, 오류 시 세 번까지 다시 시도한다
async function getFunction({
  path,
  host,
  body,
  headers = {},
  debug = false,
  ignoreReRequest = false,
}) {
  return new Promise(async (resolve, reject) => {
    let error = null;
    for (let i = 0; i < (ignoreReRequest ? 1 : 3); i++) {
      try {
        // 호출이 잘 됐으면 바로 완료처리
        let req = await request({
          method: 'GET',
          path,
          host,
          headers,
          debug,
        });
        return resolve(req);
      } catch (e) {
        error = e;
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    }
    // 실패하면 3 번까지 시도한 후 reject으로 넘겨주기
    reject(error);
  });
}

function postFunction({ path, host, body, headers = {}, debug, isUpload }) {
  return request({
    method: 'POST',
    host,
    path,
    body,
    headers,
    isUpload,
    debug,
  });
}

function deleteFunction({ path, host, body, headers = {} }) {
  return request({
    method: 'DELETE',
    host,
    path,
    body,
    headers,
  });
}

function putFunction({ path, host, body, headers = {}, isUpload }) {
  return request({
    method: 'PUT',
    host,
    path,
    body,
    headers,
    isUpload,
  });
}

export default {
  get: getFunction,
  post: postFunction,
  delete: deleteFunction,
  put: putFunction,
};
