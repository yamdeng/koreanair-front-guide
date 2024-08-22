import { ToastContainer } from 'react-toastify';
import AlertModalContainer from './components/layout/AlertModalContainer';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import { StoreProvider } from './context/StoreContext';

function OfflineApp() {
  const mainComponent = null;
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
