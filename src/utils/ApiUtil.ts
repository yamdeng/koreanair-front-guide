import axios from 'axios';
import LoadingBar from '@/utils/LoadingBar';
import ModalService from '@/services/ModalService';
// import useAppStore from '@/stores/useAppStore';

/*

  ajax 구현체 중복 처리 구현
   -disableLoadingBar
   -applyOriginalResponse
   -byPassError

*/

const Api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  disableLoadingBar: false,
  applyOriginalResponse: false,
  byPassError: false,
} as any);

Api.defaults.timeout = 1000 * 30;
Api.defaults.headers.post['Content-Type'] = 'application/json';

// 요청 인터셉터
Api.interceptors.request.use(
  function (config: any) {
    // TODO : 로그인 토큰 반영
    // const { loginToken } = useAppStore.getState();
    if (!config.disableLoadingBar) {
      LoadingBar.show();
    }
    // const AuthorizationValue = loginToken;
    // config.headers['Authorization'] = AuthorizationValue;
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
    if (!response.config.byPassError && responseData.successOrNot !== 'Y') {
      ModalService.alert({ body: responseData.HeaderMsg });
      return Promise.reject({ errorType: 'api', errorData: responseData });
    }
    if (response.config.applyOriginalResponse) {
      return response;
    }
    return response.data;
  },
  function (error) {
    LoadingBar.hide();
    return Promise.reject(error);
  }
);

export default Api;
