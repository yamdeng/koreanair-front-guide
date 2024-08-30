import useAppStore from '@/stores/useAppStore';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import OfflineApp from './OfflineApp';
import CommonUtil from './utils/CommonUtil';

const PwaChecker = ({ children }) => {
  const isOffline = useStore(useAppStore, (state) => state.isOffline);
  const setIsOffline = useStore(useAppStore, (state) => state.setIsOffline);

  useEffect(() => {
    // javascript core error handle
    window.onerror = CommonUtil.handleGlobalError;
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (isOffline) {
    return <OfflineApp />;
  }

  return children;
};

export default PwaChecker;
