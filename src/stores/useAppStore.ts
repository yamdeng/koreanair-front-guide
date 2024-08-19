import { createStore } from 'zustand';
import { createLeftMenuSlice } from '@/stores/slice/menuSlice';
import ApiService from '@/services/ApiService';
import ToastService from '@/services/ToastService';
import LoadingBar from '@/utils/LoadingBar';
import _ from 'lodash';
import CommonUtil from '@/utils/CommonUtil';
import dayjs from 'dayjs';
import i18n, { initializeI18n } from '@/services/i18n';

// currentLocale : 'ko', 'en'
const useAppStore = createStore<any>((set, get) => ({
  ...createLeftMenuSlice(set, get),

  loginToken: CommonUtil.getByLocalStorage('loginToken') || '',
  profile: null,
  displayLoadingBar: false,
  isInitComplete: false,
  messageAllList: [],
  codeAllList: [],
  codeAllMap: {},
  currentLocale: 'en',
  apiCacheMap: {},

  setLoginToke: (value) => {
    set({ loginToken: value });
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

    // TODO : 서버 시간 받기
    const clientNowString = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const serverNowString = '2024-08-17 11:36:01';
    const clientDate = dayjs(clientNowString);
    const serverDate = dayjs(serverNowString);
    const diffInSeconds = serverDate.diff(clientDate, 'second');
    CommonUtil.saveInfoToLocalStorage('serverTimeDiffSecondValue', diffInSeconds);

    try {
      const codeApiResult = await ApiService.get('com/code-groups/codes/all', null, { disableLoadingBar: true });
      const messageApiResult = await ApiService.get('com/locales/translation', null, { disableLoadingBar: true });
      const messageAllList = messageApiResult.data ? JSON.parse(messageApiResult.data) : [];
      const codeAllList = codeApiResult.data || [];
      const codeAllMap = _.groupBy(codeAllList, 'codeGrpId');

      // locale 메시지 초기화
      initializeI18n(messageAllList);

      // TODO : profile api 나왔을 경우 반영
      const profile = null;
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
    // const data = await getProfile();
    // set(() => ({ profile: data }));
  },

  setDisplayLoadingBar: (displayLoadingBar) => {
    set(() => ({ displayLoadingBar: displayLoadingBar }));
  },
}));

export default useAppStore;
