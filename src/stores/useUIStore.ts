import { createStore } from 'zustand';

// currentLocale : 'ko', 'en'
const useUIStore = createStore<any>((set, get) => ({
  displayLoadingBar: false,
  currentPath: '',
  beforePath: '',
  lastErrorMessage: '',
  lastSourceUrl: '',

  changeErrorInfo: (message, sourceUrl) => {
    set({ lastErrorMessage: message, lastSourceUrl: sourceUrl });
  },

  reloadApp: () => {
    location.href = '/';
  },

  changeCurrentPath: (path) => {
    const { currenPath } = get();
    set({ currentPath: path, beforePath: currenPath });
  },

  setDisplayLoadingBar: (displayLoadingBar) => {
    set(() => ({ displayLoadingBar: displayLoadingBar }));
  },
}));

export default useUIStore;
