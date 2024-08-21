import ApiService from '@/services/ApiService';
import i18n, { initializeI18n } from '@/services/i18n';
import ToastService from '@/services/ToastService';
import { createLeftMenuSlice } from '@/stores/slice/menuSlice';
import CommonUtil from '@/utils/CommonUtil';
import LoadingBar from '@/utils/LoadingBar';
import dayjs from 'dayjs';
import _ from 'lodash';
import { createStore } from 'zustand';

// currentLocale : 'ko', 'en'
const useAppStore = createStore<any>((set, get) => ({
  ...createLeftMenuSlice(set, get),

  accessToken: CommonUtil.getByLocalStorage('accessToken') || '',
  refreshToken: CommonUtil.getByLocalStorage('refreshToken') || '',
  profile: null,
  displayLoadingBar: false,
  isInitComplete: false,
  messageAllList: [],
  codeAllList: [],
  codeAllMap: {},
  currentLocale: 'en',
  apiCacheMap: {},

  setAccessToken: (accessToken) => {
    set({ accessToken: accessToken });
    CommonUtil.saveInfoToLocalStorage('accessToken', accessToken);
  },

  setLoginToken: (accessToken, refreshToken) => {
    CommonUtil.saveInfoToLocalStorage('accessToken', accessToken);
    CommonUtil.saveInfoToLocalStorage('refreshToken', refreshToken);
    set({ accessToken: accessToken, refreshToken: refreshToken });
  },

  getCacheData: (cacheKey) => {
    const { apiCacheMap } = get();
    const cacheData = apiCacheMap[cacheKey];
    if (cacheData) {
      return cacheData;
    } else {
      return null;
    }
  },

  setCacheData: (cacheKey, data) => {
    const { apiCacheMap } = get();
    apiCacheMap[cacheKey] = data;
    set({ formValue: apiCacheMap });
  },

  initApp: async () => {
    LoadingBar.show();
    const { getProfile } = get();

    // TODO : 서버 시간 받기
    const clientNowString = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const serverNowString = '2024-08-17 11:36:01';
    const clientDate = dayjs(clientNowString);
    const serverDate = dayjs(serverNowString);
    const diffInSeconds = serverDate.diff(clientDate, 'second');
    CommonUtil.saveInfoToLocalStorage('serverTimeDiffSecondValue', diffInSeconds);

    try {
      // 프로필 호출
      const profile = getProfile();
      const codeApiResult = await ApiService.get('com/code-groups/codes/all', null, { disableLoadingBar: true });
      const messageApiResult = await ApiService.get('com/locales/translation', null, { disableLoadingBar: true });
      const messageAllList = messageApiResult.data ? JSON.parse(messageApiResult.data) : [];
      const codeAllList = codeApiResult.data || [];
      const codeAllMap = _.groupBy(codeAllList, 'codeGrpId');
      // locale 메시지 초기화
      initializeI18n(messageAllList);
      set({
        isInitComplete: true,
        messageAllList: messageAllList || [],
        codeAllList: codeAllList,
        codeAllMap: codeAllMap,
        profile: profile,
      });
    } catch (e) {
      //
    } finally {
      LoadingBar.hide();
    }
  },

  changeLocale: (locale) => {
    // if (locale) {
    //   set({ currentLocale: locale });
    // }
    const { currentLocale } = get();
    if (locale && currentLocale === 'ko') {
      i18n.changeLanguage('en');
      set({ currentLocale: 'en' });
    } else {
      i18n.changeLanguage('ko');
      set({ currentLocale: 'ko' });
    }
    ToastService.success(i18n.t('locale이 변경되었습니다.'));
  },

  getProfile: async () => {
    const apiResult = await ApiService.get(import.meta.env.VITE_API_URL_PROFILE, null, { disableLoadingBar: true });
    const data = apiResult.data;
    return data;
  },

  setDisplayLoadingBar: (displayLoadingBar) => {
    set(() => ({ displayLoadingBar: displayLoadingBar }));
  },

  handleUnauthorizedError: (error) => {
    set({ profile: null });
    console.error(error);
  },
  logout: () => {
    set({ profile: null });
    CommonUtil.saveInfoToLocalStorage('accessToken', '');
    CommonUtil.saveInfoToLocalStorage('refreshToken', '');
  },
}));

export default useAppStore;
