import AviationPortal from '@/components/aviation/AviationPortal';
import AviationLayout from '@/components/layout/AviationLayout';
import { Route } from 'react-router-dom';
import AssuranceRouteInfo from './AssuranceRouteInfo';
import AviationRouteInfo from './AviationRouteInfo';
import GuideRouteInfo from './GuideRouteInfo';
import AuditRouteInfo from './AuditRouteInfo';
import AviationNotFound from '@/components/layout/AviationNotFound';

const useAviationRoute = () => {
  const routes = (
    <>
      {AviationRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );
  const guideRoutes = (
    <>
      {GuideRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );
  const assuranceRoutes = (
    <>
      {AssuranceRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  const auditRoutes = (
    <>
      {AuditRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/aviation" element={<AviationLayout />}>
      <Route path="" index element={<AviationPortal />} />
      {routes}
      {guideRoutes}
      {assuranceRoutes}
      {auditRoutes}
      <Route path="*" element={<AviationNotFound />} />
    </Route>
  );
};

export default useAviationRoute;
