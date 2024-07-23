import { ToastContainer } from 'react-toastify';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import { StoreProvider } from './context/StoreContext';

function AdminApp() {
  return (
    <StoreProvider>
      <div>
        AdminApp
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <LoadingBarContainer />
      </div>
    </StoreProvider>
  );
}

export default AdminApp;
