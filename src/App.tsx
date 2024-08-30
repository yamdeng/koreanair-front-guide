import useAppStore from '@/stores/useAppStore';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useStore } from 'zustand';
import LoginTemp from './components/LoginTemp';
import AlertModalContainer from './components/layout/AlertModalContainer';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import UserMainLayout from './components/layout/UserMainLayout';
import { StoreProvider } from './context/StoreContext';
import RouteChecker from './components/layout/RouteChecker';

function App() {
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

  return (
    <StoreProvider>
      <div>
        {mainComponent}
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <LoadingBarContainer />
        <AlertModalContainer />
        <RouteChecker />
      </div>
    </StoreProvider>
  );
}

export default App;
