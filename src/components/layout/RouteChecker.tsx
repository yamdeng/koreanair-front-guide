import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import history from '@/utils/history';
import useUIStore from '@/stores/useUIStore';
import { useStore } from 'zustand';

function RouteChecker() {
  const location = useLocation();
  const changeCurrentPath = useStore(useUIStore, (state) => state.changeCurrentPath);
  useEffect(() => {
    const unlisten = history.listen((locationInfo: any) => {
      changeCurrentPath(locationInfo.pathname);
    });
    changeCurrentPath(location.pathname);
    return () => {
      unlisten();
    };
  }, []);
  return null;
}

export default RouteChecker;
