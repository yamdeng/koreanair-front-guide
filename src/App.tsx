import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePortal from '@/components/HomePortal';
import useAviationRoute from './routes/useAviationRoute';
import useOccupationRoute from './routes/useOccupationRoute';
import { StoreProvider } from './context/StoreContext';
import LoadingBarContainer from './components/layout/LoadingBarContainer';

function App() {
  const aviationRoute = useAviationRoute();
  const occupationRoute = useOccupationRoute();

  return (
    <StoreProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomePortal />} />
          {aviationRoute}
          {occupationRoute}
        </Routes>
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <LoadingBarContainer />
      </div>
    </StoreProvider>
  );
}

export default App;
