import { createStore } from 'zustand';

// currentLocale : 'ko', 'en'
const useUIStore = createStore<any>((set) => ({
  displayLoadingBar: false,
  currentPath: '',
  changeCurrentPath: (path) => {
    set({ currentPath: path });
  },

  setDisplayLoadingBar: (displayLoadingBar) => {
    set(() => ({ displayLoadingBar: displayLoadingBar }));
  },
}));

export default useUIStore;
