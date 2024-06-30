import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GuideHome from './GuideHome';
import useStoreRoute from './components/guide/useStoreRoute';
import useTableRoute from './components/guide/useTableRoute';
import useFormRoute from './components/guide/useFormRoute';
import useRouterRoute from './components/guide/useRouterRoute';

function App() {
  const storeRoute = useStoreRoute();
  const tableRoute = useTableRoute();
  const formRoute = useFormRoute();
  const routerRoute = useRouterRoute();

  return (
    <div>
      <Routes>
        <Route path="/" element={<GuideHome />} />
        {storeRoute}
        {tableRoute}
        {formRoute}
        {routerRoute}
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar={true} />
    </div>
  );
}

export default App;
