import { Route } from 'react-router-dom';
import OccupationRouteInfo from './OccupationRouteInfo';
import OccupationLayout from '@/components/layout/OccupationLayout';

const useOccupationRoute = () => {
  const routes = (
    <>
      {OccupationRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/aviation" element={<OccupationLayout />}>
      {routes}
    </Route>
  );
};

export default useOccupationRoute;
