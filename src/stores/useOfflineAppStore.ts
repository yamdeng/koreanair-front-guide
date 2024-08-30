import CommonUtil from '@/utils/CommonUtil';
import { createStore } from 'zustand';

const useOfflineAppStore = createStore<any>((set) => ({
  profile: null,
  language: { key: 'codeNameKor', text: '한국어' },

  init: () => {
    const profile = CommonUtil.getByLocalStorage('profile') || null;
    set({ profile: profile });
  },

  setLanguage: (params) => {
    const { willSet } = params;
    if (willSet) {
      set({ language: willSet });
    }
  },
}));

export default useOfflineAppStore;
