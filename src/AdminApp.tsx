import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from 'zustand';
import AlertModalContainer from './components/layout/AlertModalContainer';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import NotFound from './components/layout/NotFound';
import LoginTemp from './components/LoginTemp';
import { StoreProvider } from './context/StoreContext';
import useAdminRoute from './routes/useAdminRoute';
import useAppStore from './stores/useAppStore';
import CommonUtil from './utils/CommonUtil';

function AdminApp() {
  const adminRoute = useAdminRoute();
  const { profile, getProfile, getLeftMenu, isAuthError } = useStore(useAppStore, (state) => state) as any;

  let mainComponent = null;
  if (isAuthError) {
    mainComponent = <LoginTemp />;
  } else if (profile) {
    mainComponent = (
      <Routes>
        {adminRoute}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  useEffect(() => {
    // javascript core error handle
    window.onerror = CommonUtil.handleGlobalError;

    // promise error catch
    const handleUnhandledrejection = CommonUtil.handleGlobalUnhandledRejection;

    window.addEventListener('unhandledrejection', handleUnhandledrejection);

    getProfile();
    getLeftMenu();

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
      </div>
    </StoreProvider>
  );
}

export default AdminApp;
