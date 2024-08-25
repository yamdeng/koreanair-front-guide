import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AlertModalContainer from './components/layout/AlertModalContainer';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import { StoreProvider } from './context/StoreContext';
import useOfflineRoute from '@/routes/useOfflineRoute';

function OfflineApp() {
  const offlineRoute = useOfflineRoute();
  const mainComponent = (
    <Routes>
      {/* <Route path="/" element={<HomePortal />} /> */}
      {offlineRoute}
    </Routes>
  );
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

export default OfflineApp;
