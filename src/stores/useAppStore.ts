import { createStore } from 'zustand';
import { createLeftMenuSlice } from '@/stores/slice/menuSlice';
import ApiService from '@/services/ApiService';
import LoadingBar from '@/utils/LoadingBar';
import _ from 'lodash';

// currentLocale : 'ko', 'en'
const useAppStore = createStore<any>((set, get) => ({
  ...createLeftMenuSlice(set, get),

  profile: null,
  displayLoadingBar: false,
  isInitComplete: false,
  messageAllList: [],
  codeAllList: [],
  codeAllMap: {},
  currentLocale: 'ko',

  initApp: async () => {
    LoadingBar.show();
    try {
      const codeApiResult = await ApiService.get('com/code-groups/codes/all', null, { disableLoadingBar: true });
      const messageApiResult = await ApiService.get('com/locales/translation', null, { disableLoadingBar: true });
      const messageAllList = messageApiResult.data ? JSON.parse(messageApiResult.data) : [];
      const codeAllList = codeApiResult.data || [];
      const codeAllMap = _.groupBy(codeAllList, 'codeGrpId');
      set({
        isInitComplete: true,
        messageAllList: messageAllList || [],
        codeAllList: codeAllList,
        codeAllMap: codeAllMap,
      });
    } catch (e) {
      //
    } finally {
      LoadingBar.hide();
    }
  },

  changeLocale: (locale) => {
    if (locale) {
      set({ currentLocale: locale });
    }
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
