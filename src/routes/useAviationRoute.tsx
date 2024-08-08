import { Route } from 'react-router-dom';
import AviationRouteInfo from './AviationRouteInfo';
import AviationLayout from '@/components/layout/AviationLayout';
import AviationPortal from '@/components/aviation/AviationPortal';
import '@/resources/css/report.css';

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
      <Route path="" index element={<AviationPortal />} />
      {routes}
    </Route>
  );
};

export default useAviationRoute;
