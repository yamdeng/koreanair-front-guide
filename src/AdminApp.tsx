import { useEffect } from 'react';
import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import { StoreProvider } from './context/StoreContext';
import useAdminRoute from './routes/useAdminRoute';
import useAppStore from './stores/useAppStore';
import { useStore } from 'zustand';

function AdminApp() {
  const adminRoute = useAdminRoute();
  const { initApp } = useStore(useAppStore, (state) => state) as any;

  useEffect(() => {
    initApp();
  }, []);

  return (
    <StoreProvider>
      <div>
        <Routes>{adminRoute}</Routes>
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <LoadingBarContainer />
      </div>
    </StoreProvider>
  );
}

export default AdminApp;
