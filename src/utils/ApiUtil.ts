import axios from 'axios';
import appStore from '@/stores/appStore';

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
  function (config: any) {
    const { setDisplayLoadingBar } = appStore.getState();
    if (!config.disableLoadingBar) {
      setDisplayLoadingBar(true);
    }
    return config;
  },
  function (error) {
    const { setDisplayLoadingBar } = appStore.getState();
    setDisplayLoadingBar(false);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
Api.interceptors.response.use(
  function (response) {
    const { setDisplayLoadingBar } = appStore.getState();
    setDisplayLoadingBar(false);
    return response;
  },
  function (error) {
    console.log(error);
    const { setDisplayLoadingBar } = appStore.getState();
    setDisplayLoadingBar(false);
  }
);

export default Api;
