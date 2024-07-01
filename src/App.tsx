import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GuideHome from './GuideHome';
import useStoreRoute from './components/guide/useStoreRoute';
import useTableRoute from './components/guide/useTableRoute';
import useFormRoute from './components/guide/useFormRoute';
import useRouterRoute from './components/guide/useRouterRoute';
import useTemplateRoute from './components/guide/useTemplateRoute';
import { StoreProvider } from './context/StoreContext';
// import appStore from './stores/appStore';

function App() {
  const storeRoute = useStoreRoute();
  const tableRoute = useTableRoute();
  const formRoute = useFormRoute();
  const routerRoute = useRouterRoute();
  const templateRoute = useTemplateRoute();

  return (
    <StoreProvider>
      <div>
        <Routes>
          <Route path="/" element={<GuideHome />} />
          {storeRoute}
          {tableRoute}
          {formRoute}
          {routerRoute}
          {templateRoute}
        </Routes>
        <ToastContainer autoClose={3000} hideProgressBar={true} />
      </div>
    </StoreProvider>
  );
}

export default App;
