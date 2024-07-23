import { createStore } from 'zustand';
import { getProfile } from '@/data/grid/example-data-promise';

const appStore = createStore<any>((set) => ({
  profile: null,
  displayExpandMenu: true,
  displayLoadingBar: false,
  toggleLeftMenu: () => set((state) => ({ displayExpandMenu: !state.displayExpandMenu })),
  getProfile: async () => {
    const data = await getProfile();
    set(() => ({ profile: data }));
  },
  setDisplayLoadingBar: (displayLoadingBar) => {
    set(() => ({ displayLoadingBar: displayLoadingBar }));
  },
}));

export default appStore;
