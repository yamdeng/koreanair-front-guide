import { createStore } from 'zustand';
import { createLeftMenuSlice } from '@/stores/slice/menuSlice';

const useAppStore = createStore<any>((set, get) => ({
  ...createLeftMenuSlice(set, get),

  profile: null,
  displayLoadingBar: false,

  initApp: async (workScope) => {
    const { changeWorkScope } = get();
    changeWorkScope(workScope);
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
