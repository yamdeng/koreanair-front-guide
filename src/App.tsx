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
import CommonUtil from './utils/CommonUtil';

function App() {
  const { profile, initApp, isAuthError } = useStore(useAppStore, (state) => state) as any;
  let mainComponent = null;
  if (isAuthError) {
    mainComponent = <LoginTemp />;
  } else if (profile) {
    mainComponent = <UserMainLayout />;
  }

  useEffect(() => {
    // javascript core error handle
    window.onerror = CommonUtil.handleGlobalError;

    // promise error catch
    const handleUnhandledrejection = CommonUtil.handleGlobalUnhandledRejection;
    window.addEventListener('unhandledrejection', handleUnhandledrejection);

    initApp();
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledrejection);
    };
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
