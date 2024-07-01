import { useRef, createContext, useContext } from 'react';
import { useStore } from 'zustand';
import appStore from '@/stores/appStore';

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = appStore as any;
  }
  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export const useAppStore = (selector) => {
  const store = useContext(StoreContext);
  if (store === null) {
    throw new Error('no provider');
  }
  return useStore(store, selector);
};
