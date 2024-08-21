import { useEffect } from 'react';
import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import { StoreProvider } from './context/StoreContext';
import useAdminRoute from './routes/useAdminRoute';
import useAppStore from './stores/useAppStore';
import { useStore } from 'zustand';
import AlertModalContainer from './components/layout/AlertModalContainer';
import LoginTemp from './components/LoginTemp';

function AdminApp() {
  const adminRoute = useAdminRoute();
  const { profile, getProfile, getLeftMenu, isAuthError } = useStore(useAppStore, (state) => state) as any;

  let mainComponent = null;
  if (isAuthError) {
    mainComponent = <LoginTemp />;
  } else if (profile) {
    mainComponent = <Routes>{adminRoute}</Routes>;
  }

  useEffect(() => {
    getProfile();
    getLeftMenu();
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
