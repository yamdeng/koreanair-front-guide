import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import { StoreProvider } from './context/StoreContext';
import useAdminRoute from './routes/useAdminRoute';

function AdminApp() {
  const adminRoute = useAdminRoute();

  return (
    <StoreProvider>
      <div>
        <Routes>
          {/* <Route path="/" element={<MessageList />} /> */}
          {adminRoute}
        </Routes>
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <LoadingBarContainer />
      </div>
    </StoreProvider>
  );
}

export default AdminApp;
