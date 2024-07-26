import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePortal from '@/components/HomePortal';
import useAviationRoute from './routes/useAviationRoute';
import useOccupationRoute from './routes/useOccupationRoute';
import { StoreProvider } from './context/StoreContext';
import LoadingBarContainer from './components/layout/LoadingBarContainer';
import localforage from 'localforage';
import { useEffect, useState } from 'react';

localforage.config({
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE
  ],
  name: 'offline-storage'
});

const isFirstOnline = navigator.onLine;

function App() {
  const [isNetworkOnline, setIsNetworkOnline] = useState(isFirstOnline);

  const aviationRoute = useAviationRoute(isNetworkOnline);
  const occupationRoute = useOccupationRoute();

  useEffect(() => {
    window.addEventListener("online", (event) => {
      setIsNetworkOnline(true);
    });
    window.addEventListener("offline", (event) => {
      setIsNetworkOnline(false);
    });
  }, []);

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
