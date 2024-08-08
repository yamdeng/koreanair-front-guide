import { useEffect } from 'react';
import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import { StoreProvider } from './context/StoreContext';
import useAdminRoute from './routes/useAdminRoute';
import useAppStore from './stores/useAppStore';
import { useStore } from 'zustand';
import AlertModalContainer from './components/layout/AlertModalContainer';

function AdminApp() {
  const adminRoute = useAdminRoute();
  const { getLeftMenu } = useStore(useAppStore, (state) => state) as any;

  useEffect(() => {
    getLeftMenu();
  }, []);

  return (
    <StoreProvider>
      <div>
        <Routes>{adminRoute}</Routes>
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <LoadingBarContainer />
        <AlertModalContainer />
      </div>
    </StoreProvider>
  );
}

export default AdminApp;
