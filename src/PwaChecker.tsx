import useAppStore from '@/stores/useAppStore';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import OfflineApp from './OfflineApp';

const PwaChecker = ({ children }) => {
  const isOffline = useStore(useAppStore, (state) => state.isOffline);
  const setIsOffline = useStore(useAppStore, (state) => state.setIsOffline);

  useEffect(() => {
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
