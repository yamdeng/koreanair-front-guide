import { Route } from 'react-router-dom';
import AviationRouteInfo from './AviationRouteInfo';
import AviationLayout from '@/components/layout/AviationLayout';

const useAviationRoute = () => {
  const routes = (
    <>
      {AviationRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/aviation" element={<AviationLayout />}>
      {routes}
    </Route>
  );
};

export default useAviationRoute;
