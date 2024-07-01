import { createStore } from 'zustand';
import { getProfile } from '@data/grid/example-data-promise';

const appStore = createStore((set) => ({
  profile: null,
  displayExpandMenu: true,
  toggleLeftMenu: () => set((state) => ({ displayExpandMenu: !state.displayExpandMenu })),
  getProfile: () => {
    return getProfile();
  },
}));

export default appStore;
