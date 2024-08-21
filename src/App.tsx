import useAppStore from '@/stores/useAppStore';
import localforage from 'localforage';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useStore } from 'zustand';
import AlertModalContainer from './components/layout/AlertModalContainer';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import { StoreProvider } from './context/StoreContext';
import LoginTemp from './components/LoginTemp';
import UserMainLayout from './components/layout/UserMainLayout';

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: 'offline-storage',
});

const isFirstOnline = navigator.onLine;

function App() {
  const [isNetworkOnline, setIsNetworkOnline] = useState(isFirstOnline);
  const { profile, initApp, isAuthError } = useStore(useAppStore, (state) => state) as any;
  let mainComponent = null;
  if (isAuthError) {
    mainComponent = <LoginTemp />;
  } else if (profile) {
    mainComponent = <UserMainLayout />;
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
        {mainComponent}
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <LoadingBarContainer />
        <AlertModalContainer />
      </div>
    </StoreProvider>
  );
}

export default App;
