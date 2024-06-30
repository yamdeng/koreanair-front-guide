import axios from 'axios';
/*

  ajax 구현체 중복 처리 구현

*/

const Api = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

Api.defaults.timeout = 1000 * 30;
Api.defaults.headers.post['Content-Type'] = 'application/json';

// 요청 인터셉터
Api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
Api.interceptors.response.use(function (response) {
  return response;
});

export default Api;
