import { Route } from 'react-router-dom';
import StorePageInfo from '@/config/StorePageInfo';
import GuideSourceLayout from './GuideSourceLayout';

const useAdminRoute = () => {
  const routes = (
    <>
      {StorePageInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/admin" element={<GuideSourceLayout />}>
      {routes}
    </Route>
  );
};

export default useAdminRoute;
