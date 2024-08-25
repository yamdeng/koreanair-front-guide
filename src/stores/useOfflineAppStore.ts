import CommonUtil from '@/utils/CommonUtil';
import { createStore } from 'zustand';

const useOfflineAppStore = createStore<any>((set) => ({
  profile: null,

  init: () => {
    const profile = CommonUtil.getByLocalStorage('profile') || null;
    set({ profile: profile });
  },
}));

export default useOfflineAppStore;
