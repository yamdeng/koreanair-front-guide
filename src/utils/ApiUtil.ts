import axios from 'axios';
import LoadingBar from '@/utils/LoadingBar';
import ModalService from '@/services/ModalService';
import useAppStore from '@/stores/useAppStore';

/*

  ajax 구현체 중복 처리 구현
   -disableLoadingBar
   -applyOriginalResponse
   -byPassError

*/

const enableApiLog = import.meta.env.VITE_ENABLE_API_LOG && import.meta.env.VITE_ENABLE_API_LOG === 'true';

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
    const { accessToken, refreshToken } = useAppStore.getState();
    if (!config.disableLoadingBar) {
      LoadingBar.show();
    }
    const AuthorizationValue = `Bearer ${accessToken}`;
    config.headers['Authorization'] = AuthorizationValue;
    config.headers['Refresh-token'] = refreshToken;
    if (enableApiLog) {
      const { url, params, data } = config;
      console.log(`api requset url : ${url}`);
      if (params) {
        console.log(`api requset params : ${JSON.stringify(params)}`);
      }
      if (config.data) {
        console.log(`api requset data : ${JSON.stringify(data)}`);
      }
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
    const { setAccessToken } = useAppStore.getState();
    const responseData = response.data;
    const responseHeader = response.headers;
    if (!response.config.byPassError && responseData.successOrNot !== 'Y') {
      ModalService.alert({ body: responseData.HeaderMsg });
      return Promise.reject({ errorType: 'api', errorData: responseData });
    }
    if (response.config.applyOriginalResponse) {
      return response;
    }
    if (responseHeader.newtoken) {
      setAccessToken(responseHeader.newtoken);
    }
    if (enableApiLog) {
      const { url } = response.config;
      console.log(`api response url : ${url}`);
      console.log(`api requset data : ${JSON.stringify(response.data)}`);
    }
    return response.data;
  },
  function (error) {
    LoadingBar.hide();
    const { handleUnauthorizedError } = useAppStore.getState();
    const errorResponse = error.response || {};
    const status = errorResponse.status;
    if (error && error.response) {
      if (status === 401) {
        handleUnauthorizedError(error);
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
