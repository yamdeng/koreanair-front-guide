import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MessageList from './components/admin/message/MessageList';
import useAdminRoute from './routes/useAdminRoute';
import { StoreProvider } from './context/StoreContext';
import LoadingBarContainer from './components/layout/LoadingBarContainer';

function AdminApp() {
  const adminRoute = useAdminRoute();

  return (
    <StoreProvider>
      <div>
        <Routes>
          <Route path="/" element={<MessageList />} />
          {adminRoute}
        </Routes>
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <LoadingBarContainer />
      </div>
    </StoreProvider>
  );
}

export default AdminApp;
