import OccupationLayout from '@/components/layout/OccupationLayout';
import OccupationPortal from '@/components/occupation/OccupationPortal';
import { Route } from 'react-router-dom';
import OccupationRouteInfo from './OccupationRouteInfo';

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
    <Route path="/occupation" element={<OccupationLayout />}>
      <Route path="" index element={<OccupationPortal />} />
      {routes}
    </Route>
  );
};

export default useOccupationRoute;
