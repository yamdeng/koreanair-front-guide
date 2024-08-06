import axios from 'axios';
import LoadingBar from '@/utils/LoadingBar';
import ModalService from '@/services/ModalService';

/*

  ajax 구현체 중복 처리 구현

*/

const Api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  disableLoadingBar: false,
} as any);

Api.defaults.timeout = 1000 * 30;
Api.defaults.headers.post['Content-Type'] = 'application/json';

// 요청 인터셉터
Api.interceptors.request.use(
  function (config: any) {
    if (!config.disableLoadingBar) {
      LoadingBar.show();
    }
    return config;
  },
  function (error) {
    LoadingBar.hide();
    return Promise.reject(error);
  }
);

// 응답 인터셉터
Api.interceptors.response.use(
  function (response: any) {
    LoadingBar.hide();
    const responseData = response.data;
    if (responseData.successOrNot !== 'Y') {
      ModalService.alert({ body: responseData.HeaderMsg });
      return Promise.reject({ errorType: 'api', errorData: responseData });
    }
    if (response.config.applyOriginalResponse) {
      response;
    }
    return response.data;
  },
  function (error) {
    LoadingBar.hide();
    return Promise.reject(error);
  }
);

export default Api;
