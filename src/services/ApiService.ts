import ApiUtil from '@/utils/ApiUtil';

/*

  ajax 서버 api 요청 공통 인터페이스

*/

const VITE_API_PREFIX = import.meta.env.VITE_API_PREFIX;
const VITE_API_URL = import.meta.env.VITE_API_URL;

const prefixUrl = VITE_API_URL + VITE_API_PREFIX + '/';

class ApiService {
  // http get method 요청
  get(apiPath, params?: any, config?: any) {
    config = config || {};
    config.params = params;
    return ApiUtil.get(prefixUrl + apiPath, config);
  }

  // http post method 요청
  post(apiPath, body?: any, config?: any) {
    body = body || {};
    return ApiUtil.post(prefixUrl + apiPath, body, config);
  }

  // http put method 요청
  put(apiPath, body?: any, config?: any) {
    body = body || {};
    return ApiUtil.put(prefixUrl + apiPath, body, config);
  }

  // http delete method 요청
  delete(apiPath, config?: any) {
    return ApiUtil.delete(prefixUrl + apiPath, config);
  }

  // file upload
  fileUpload(formData: any, params: any, onUploadProgress) {
    return ApiUtil.post(prefixUrl + `${import.meta.env.VITE_API_URL_FIEL_GROUPS}/file/upload`, formData, {
      params: params,
      headers: { 'Content-Type': 'multipart/form-data' },
      disableLoadingBar: true,
      onUploadProgress: onUploadProgress,
    } as any);
  }
}

export default new ApiService();
