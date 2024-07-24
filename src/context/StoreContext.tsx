import { useRef, createContext, useContext } from 'react';
import { useStore } from 'zustand';
import useAdminAppStore from '@/stores/admin/useAdminAppStore';

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = useAdminAppStore as any;
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
