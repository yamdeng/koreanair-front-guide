import useAppStore from '@/stores/useAppStore';
import { useEffect } from 'react';
import { useStore } from 'zustand';

const PwaChecker = ({ children }) => {
  const isOffline = useStore(useAppStore, (state) => state.profile);
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
    return <div>현재 오프라인 상태입니다.</div>;
  }

  return children;
};

export default PwaChecker;
