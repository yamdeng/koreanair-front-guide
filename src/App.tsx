import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePortal from '@/components/HomePortal';
import useAppStore from '@/stores/useAppStore';
import useAviationRoute from './routes/useAviationRoute';
import useOccupationRoute from './routes/useOccupationRoute';
import { StoreProvider } from './context/StoreContext';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import AlertModalContainer from './components/layout/AlertModalContainer';
import localforage from 'localforage';

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: 'offline-storage',
});

const isFirstOnline = navigator.onLine;

function App() {
  const [isNetworkOnline, setIsNetworkOnline] = useState(isFirstOnline);

  console.log(isNetworkOnline);

  const aviationRoute = useAviationRoute();
  const occupationRoute = useOccupationRoute();
  const { initApp, isInitComplete } = useStore(useAppStore, (state) => state) as any;
  let routeAllComponent = null;

  if (isInitComplete) {
    routeAllComponent = (
      <Routes>
        <Route path="/" element={<HomePortal />} />
        {aviationRoute}
        {occupationRoute}
      </Routes>
    );
  }

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    window.addEventListener('online', () => {
      setIsNetworkOnline(true);
    });
    window.addEventListener('offline', () => {
      setIsNetworkOnline(false);
    });
  }, []);

  return (
    <StoreProvider>
      <div>
        {routeAllComponent}
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <LoadingBarContainer />
        <AlertModalContainer />
      </div>
    </StoreProvider>
  );
}

export default App;
