import { createStore } from 'zustand';
import { getProfile } from '@data/grid/example-data-promise';

const appStore = createStore((set) => ({
  profile: null,
  displayExpandMenu: true,
  toggleLeftMenu: () => set((state) => ({ displayExpandMenu: !state.displayExpandMenu })),
  getProfile: async () => {
    const data = await getProfile();
    set(() => ({ profile: data }));
  },
}));

export default appStore;
